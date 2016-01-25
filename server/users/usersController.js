var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Token = db.Token;
var helpers = require("../helpers/helpers.js");
var match = require('../helpers/matching_algo.js');
var bcrypt = require('bcrypt');

module.exports = {

  getEmails: function(req, res){
    User.find({}, 'email', function(err, emails){
      if(err) res.status(404).send(err);
      else res.status(302).send(emails);
    });
  },

  getUser: function(req, res, next){
    User.findOne({_id: user.id}, function(err, user){
      if(err){
        res.status(404).send(err);
        return next();
      }

      // purge password info from user object before sending
      var properties = new helpers.UserData;
      var userObject = {};
        for(var key in properties){
          if(key !== "password") {
            if(key === "questions") userObject[key] = user[key][0];
            else userObject[key] = user[key];
          }
      }
      res.status(200).send(userObject);
      next();
    })
  },

  signUp: function(req, res, next){
    var user = req.body;
    // If user already exists, interrupt chain
    User.findOne({email: user.email}, function(err, user){
      if(user){
        res.status(403).send("user already exists");
        return next();
      }
    });

    user.birthday = helpers.splitDate(user.birthday);

    // To be populated and submitted as a new user
    var userObject = {};
    // Required fields with which to create user
    // var properties = {firstName:'firstName', lastName:'lastName', email:'email', password:'password', birthday:'birthday', gender:'gender', 
    //     interests:'interests', type:'type', personality:'personality', picture:'picture', places:'places', matches:'matches'};
    var properties = new helpers.UserData;
    var failings = [];
    var failed = false;

    function calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

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
      console.log('signup failed: ', failings)
      res.status(400).send(failings);
      next();
    }else{
      userObject.picture = helpers.convertPhoto(userObject.picture, userObject.email);
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
        var newUser = User(userObject);
        newUser.save(function(err, user){
          if(err){
            console.log(err,'err saving user')
            res.status(500).send(err);
            next();
          }else{
            User.find({}, function(err, users){
              users.forEach(function(user){
                match.user(user, function (data){
                  data.sort(function(a,b){ return b[1]-a[1]; });
                  User.update({_id: user._id},{matches:data},function(err, user){
                    if(err) console.log(err);
                  });
                });
              });
            });
            
            helpers.createToken(req, res, next, user, helpers.genToken, "signup");
          }
        });
      });
    }

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
    Token.findOne({token: user.token, user_id: user.id}, function(err, token){
      if(err){
        res.status(500).send();
      }else if(!token){
        res.status(401).send();
      }else{
        token.remove();
        res.status(200).send();
        return
      }
    })
  },

  // ToDo: changePicture function

};
