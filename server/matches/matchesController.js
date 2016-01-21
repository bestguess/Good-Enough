var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
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
      }
      delete match.password;
      res.status(200).send(match);
    });
  }

};