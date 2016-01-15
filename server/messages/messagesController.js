var db = require('../db_config.js');
var mongoose = require('mongoose');
var Messages = db.Messages;

module.exports = {


  startConvo : function(req, res, next){
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var text = {
      user : req.body.from,
      date : date,
      message : req.body.message
    };
    var newConvo = new Messages;
    newConvo.users.push( req.body.to , req.body.from );
    newConvo.messages.push(text);
    newConvo.save(function(err, text){
      if(err) throw err;
      res.status(201).send(text);
    })
  },


  getConvo : function(req, res, next){
    Messages.find({users: req.body.user}, function(err, list){
      if(err) throw err;
      res.status(200).send(list);
   });
  },


  getMessages : function(req, res, next){
    Messages.findOne({_id: req.body.id}, function(err, messages){
      if(err) throw err;
      res.status(200).send(messages);
   });
  },


  reply : function(req, res, next){
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var text = {
      user : req.body.from,
      date : date,
      message : req.body.message
    };
    Messages.update({_id: req.body.id}, {
      $push: { messages : text}
    }, function(err) { 
      if(err) throw err;
      res.status(201).send(text);
    })
  }
};