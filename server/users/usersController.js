var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Question = db.Questions;
var Token = db.Token;
var helpers = require("../helpers/helpers.js");
var match = require('../helpers/matching_algo.js');
var bcrypt = require('bcrypt');

module.exports = {

  getUser: function(req, res, next){
    var user = req.body;
    // Find the requested user's information
    User.findOne({_id: user.id}, function(err, user){
      if(err){
        res.status(404).send(err);
        return next();
      }

      // Make a dictionary of the needed user information,
      // which excludes password
      var properties = new helpers.UserData;
      var userObject = {};
        for(var key in properties){
          if(key !== "password") {
            if(key === "question") userObject[key] = user[key][0];
            else userObject[key] = user[key];
          }
      }
      (function getInfo(ques){
        Question.findOne({id: ques}, function (err, nextQuestion) {

          // Reset all accepted notifications
          for(var i = 0; i < user.matches.length; i++){
            user.matches[i].accepted = false;
          }
          User.findByIdAndUpdate(req.body.id, {matches: user.matches}, function(err){
            if(err) return next();
          })

          if(err) console.log(err);
          // if the user has answered all polling questions, just send back their basic data
          else if(!nextQuestion) res.send(userObject);
          // if the next question is supposed to be skipped, increase the number on the users data and give back the next question
          else if(nextQuestion.skip){
            User.findByIdAndUpdate(req.body.id,{question:ques + 1},function(err, changes){
              if(err) console.log(err);
              else getInfo(ques + 1);
            });
          // send the user data with the polling question to be asked
          }else{
            userObject.question = nextQuestion;
            res.status(200).send(userObject);
            for(var i = 0; i < user.matches.length; i++){
              user.matches[i].accepted = false;
            }
            User.findByIdAndUpdate(req.body.id, {matches: user.matches}, function(err){
              if(err) return next();
            })
            next();
          }
        });
      })(user.question)

    })
  },

  updateUser: function(req, res){
    var data = req.body;

    // if request body includes a password or interest, hash it or stringify it.
    if(data.password) data.password = bcrypt.hashSync(data.password, data.password.length);
    if(data.interests) data.interests = JSON.stringify(data.interests);

    //finds the user and replaces the changes
    User.findByIdAndUpdate(req.body.id, data,function(err, changes){
      if(err) console.log(err);
      else{
        // if the interests were updated, rematch all of the users to reflect their new scores
        if(data.interests){
          User.find({}, function(err, users){
            users.forEach(function(user){
              match.user(user, function (data){
                data.sort(function(a,b){ return b.score-a.score; });
                User.update({_id: user._id},{matches:data},function(err, user){
                  if(err) console.log(err);
                  else res.end("Updated Matches");
                });
              });
            });
          });
        }
        res.status(201).send("Updated User");
      }
    });
  },

  signUp: function(req, res, next){
    var user = req.body;
    // If user already exists, interrupt chain
    User.findOne({email: user.email}, function(err, founduser){
      if(founduser){
        console.log("User already exists");
        res.status(403).send("user already exists");
        return next();
      }else{


      user.birthday = helpers.splitDate(user.birthday);
      // To be populated and submitted as a new user
      var userObject = {};
      // Required fields with which to create user
      var properties = new helpers.UserData;
      var failings = [];
      var failed = false;

      // Make sure that all required fields have been sent with the request
      for(var key in properties){
        if(!user[key]){
          failings.push(properties[key]);
          failed = true;
        }else{
          if(key === 'interests' || key === 'personality') user[key] = JSON.stringify(user[key]);
          userObject[key] = user[key];
        }
      }

      // If any of the fields are not submitted then send 400
      // and list of missing fields
      if(failed){
        res.status(400).send(failings);
        next();
      }else{        
        // decodes the base64 image
        helpers.convertPhoto(userObject.picture, userObject.email, function(photoLoc){
          userObject.picture = photoLoc;
          // hash password for storage
          bcrypt.hash(userObject.password, userObject.password.length, function(err, hash) {
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!hash){
              res.status(500).send("Error producing hash");
              return next();
            }
            userObject.password = hash;
            userObject.question = 0;
            var origInterests = JSON.parse(userObject.interests);
            origInterests.polled = [];
            userObject.interests = JSON.stringify(origInterests);
            // save user to mongoDB
            var newUser = User(userObject);            
            newUser.save(function(err, user){
              if(err){
                console.log(err,'err saving user')
                res.status(500).send(err);
                next();
              }else{
                //Once saved, rematch all of the users to reflect the new user.
                User.find({}, function(err, users){
                  if(err) console.log(err);
                  users.forEach(function(user){
                    match.user(user, function (data){
                      data.sort(function(a,b){ return b.score-a.score;});
                      User.update({_id: user._id},{matches:data},function(err, user){
                        if(err) console.log(err);
                      });
                    });
                  });
                  helpers.createToken(req, res, next, user, helpers.genToken, "signup");
                });
              }
            });
          });
        });
       }
      }
    });
  },

  signIn: function(req, res, next){
    var user = req.body;
    // Requires that a user provides an email and password
    if(!user.email || !user.password){
      res.status(400).send();
    }else{
      User.findOne({email: user.email}, function(err, foundUser){
        if(err){
          res.status(400).send(err);
        }else if(!foundUser){
          res.status(400).send("User does not exist");
        }else{
          // Compare hash of provided password with the hashed password in the database
          bcrypt.compare(user.password, foundUser.password, function(err, result) {
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!result){
              res.status(404).send("Incorrect Password");
              return next();
            }
            Token.findOne({use_id: foundUser._id}, function(err, token){
              if(err){
                res.status(500).send("Server error finding user token");
                return next();
              }else if(!token){
                // If the user doesn't have a session stored, then generate and store one
                helpers.createToken(req, res, next, foundUser, helpers.genToken);
              }else{
                // If user already has a session stored then return the stored
                // token. Allows users to sign in from multiple devices while
                // still logging out for all devices when user logs out from one.
                res.status(200).send({id: foundUser._id, token: token.token});
                next();
              }
            })
          });
        }
      });
    }
  },

  logout: function(req, res){
    user = req.body;
    // Find session
    Token.find({user_id: user.id}, function(err, token){
      if(err){
        res.status(500).send();
      }else if(!token){
        res.status(401).send();
      }else{
        // Clear all session tokens for this user in order to log out of all devices
        for(var i = 0; i < token.length; i++){
        Token.findOne({user_id: user.id, token: token[i].token}, function(err, foundToken){
          if(err) console.log('could not remove session');
          foundToken.remove();
        });
        }
        res.status(200).send();
        return
      }
    })
  },

};
