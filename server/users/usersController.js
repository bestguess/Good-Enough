var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Token = db.Token;
var photo = require('../helpers/helpers.js');
var match = require('../helpers/matching_algo.js');
var bcrypt = require('bcrypt');

var rand = function() {
  return Math.random().toString(36).substr(2);
};
var token = function() {
  return rand() + rand();
};

module.exports = {

  

  getEmails: function(req, res){
    User.find({}, 'email', function(err, emails){
      if(err) res.status(404).send(err);
      else res.status(302).send(emails);
    });
  },

  signUp: function(req, res, next){
    var user = req.body;
    
    // To be populated and submitted as a new user
    var userObject = {};
    // Required fields with which to create user
    var properties = {firstName:'firstName', lastName:'lastName', email:'email', password:'password', birthday:'age', gender:'gender', 
        interests:'interests', type:'type', personality:'personality', picture:'picture', places:'places', matches:'matches'};
    var failings = [];
    var failed = false;
    match.user(user, matchMe);

    function matchMe(data){
      user.matches = data;
      // To be populated and submitted as a new user
      var userObject = {};
      // Required fields with which to create user
      var properties = {firstName:'firstName', lastName:'lastName', email:'email', password:'password', age:'age', gender:'gender', 
          interests:'interests', type:'type', personality:'personality', picture:'picture', places:'places', matches:'matches'};
      var failings = [];
      var failed = false;

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
      res.status(400).send(JSON.parse(failings));
      next();
    }else{
      userObject.picture = photo.convertPhoto(userObject.picture, userObject.email);
      
      bcrypt.hash(userObject.password, userObject.password, function(err, hash) {
        userObject.password = hash;
        var newUser = User(userObject);
        newUser.save(function(err, user){
          if(err){
            console.log('err saving user')
            res.status(500).send(err);
            next();
          }else{

            var newToken = Token({user_id: user._id, token: token(), dateCreated: new Date().getTime()});
            newToken.save(function(err, token){
              if(err){
                console.log('error saving token');
                res.status(500).send(err);
                return next();
              }
              // If no save error then send the user's new id
              localStorage.setItem("token", token.token);
              localStorage.setItem("id", user._id);
              res.status(201).send(user._id);
              next();
            });
          }
        });
      }
    }
  },

  signIn: function(req, res){
    var user = req.body;
    // Requires that a user provides an email and password
    if(!user.email || !user.password){
      res.status(400).send();
    }else{
      bcrypt.hash(user.password, user.password, function(err, hash) {
        user.password = hash;
        User.findOne({email: user.email, password: user.password}, function(err, user){
          if(err){
            res.status(400).send(err);
          }else if(!user){
            res.status(400).send("User does not exist");
          }else{
            Token.findOne({user_id: user._id}, function(err, token){
              if(err){
                res.status(500).send(err);
              }else if(!token){
                var newToken = Token({user_id: user._id, token: token(), dateCreated: new Date().getTime()});
                newToken.save(function(err, token){
                  if(err){
                    res.status(500).send(err);
                    return next();
                  }
                  // If no save error then send the user's new id
                  localStorage.setItem("token", token.token);
                  localStorage.setItem("id", user._id);
                  var userInfo = {};
                  userInfo.firstName = user.firstName;
                  userInfo.lastName = user.lastName;
                  userInfo.picture = user.picture;
                  userInfo.meet = user.meet;

                  // Send back info needed for home page
                  res.status(200).send(userInfo);
                  next();
                });
              }else{
                res.status(302).send("user is already logged in");
                next();
              }
            });
          }
        });
      });  
    }
  },
  
  logout: function(){
    Token.findOneAndRemove({token: localStorage.getItem("token")}, function(err){
      if(err){
        res.status(404).send();
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        res.status(200).send();
      }
    });
  }
  // ToDo: changePicture function

};
