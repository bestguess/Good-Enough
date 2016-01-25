var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;
var helpers = require("../helpers/helpers.js");
var match = require('../helpers/matching_algo.js');

module.exports = {

  getMatch: function(req, res, next){
    match = req.body.match_id;
    User.findOne({_id: match}, function(err, match){
      if(err){
        res.status(500).send();
        return next();
      }
      if(!match){
        res.status(404).send();
        return next();
      }else{
      var properties = new helpers.UserData;
      var matchObject = {}
      for(var key in properties){
        if(
          key !== 'password' &&
          key !== 'matches' &&
          key !== 'conversations' &&
          key !== 'meet'
          ) matchObject[key] = match[key];
      }
      console.log('user', req.body.id, 'match', match._id);
      Messages.findOne({users: {$all:[req.body.match_id, req.body.id]}}, function(err, convo){
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!convo){
              console.log("sending matchObject without conversations")
              res.status(200).send(matchObject);
              return next();
            }
            else{
              matchObject.messages = convo.messages;
              console.log('matchObject', matchObject)
              res.status(200).send(matchObject);
              return next();
            }
         });
    }
    });
  },

  reMatch: function(req, res, next){

    User.find({}, function(err, users){
      users.forEach(function(user){
        match.user(user, function (data){
          data.sort(function(a,b){ return b.score-a.score; });
          User.update({_id: user._id},{matches:data},function(err, user){
            if(err) console.log(err);
          });
        });
      });
    });

    User.findOne({_id: req.body.id}, function(err, user){
      res.status(200).send(user);
    });
  }

};