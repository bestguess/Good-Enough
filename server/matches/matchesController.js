var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;
var helpers = require("../helpers/helpers.js");

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
          key !== 'conversati ons' &&
          key !== 'meet'
          ) matchObject[key] = match[key];
      }
      console.log('user', req.body._id, 'match', match._id);
      Messages.findOne({users: {$all:[req.body._id, match._id]}}, function(err, convo){
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(convo){
              matchObject.conversations = convo;
              console.log('matchObject', matchObject)
              res.status(200).send(matchObject);
              return next();
            }
         });
      res.status(200).send(matchObject);
    }
    });
  }

};