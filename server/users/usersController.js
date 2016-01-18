var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var photo = require('../helpers/helpers.js');
var match = require('../helpers/matching_algo.js');


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
      res.status(400).send(failings);
      next();
    }else{
      userObject.picture = photo.convertPhoto(userObject.picture, userObject.email);
      var newUser = User(userObject);
      newUser.save(function(err, user){
        if(err){
          res.status(500).send(err);
          next();
        }else{
          // If no save error then send the user's new id
          res.status(201).send(user._id);
          next();
        }
      });
    }

  },

  signIn: function(req, res){
    var user = req.body;
    // Requires that a user provides an email and password
    if(!user.email || !user.password){
      res.status(400).send();
    }else{
      User.findOne({email: user.email, password: user.password}, function(err, user){
        if(err){
          res.status(400).send(err);
        }else if(!user){
          res.status(400).send(err);
        }else{
          var userInfo = {};
          userInfo.firstName = user.firstName;
          userInfo.lastName = user.lastName;
          userInfo.picture = user.picture;
          userInfo.meet = user.meet;

          // Send back info needed for home page
          res.status(200).send(userInfo);
        }
      });
    }
  }
  
  // ToDo: changePicture function

};
