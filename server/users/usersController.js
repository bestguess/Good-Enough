var db = require('./db_config.js');
var mongoose = require('mongoose');
var User = db.Users;

module.exports = {

  createUser: function(req, res, nest){
    var user = req.body;
    // To be populated and submitted as a new user
    var userObject = {};
    // Required fields with which to create user
    var properties = [firstName, lastName, email, password, age, gender, interests, type, personality, picture, places];
    var failings = [];
    var failed = false;

    for(var key in properties){
      if(!user[key]){
        failings.push(key);
        failed = true;
      }else{
        userObject[key] = user[key];
      }
    }
    // If any of the fields are not submitted then send 400 
    // and list of missing fields
    if(failed) res.status(400).send(failings);

    var newUser = User(userObject);
    newUser.save(function(err, user){
      if (err) throw err;
      // If no save error then send the user's new id
      res.status(201).send(user._id);
    })
  },

  getUsernames: function(){
    User.find({}, function(err, people))
  }

};
