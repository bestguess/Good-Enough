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
​
    if(!req.body.id){
      var newConvo = new Messages;
      newConvo.users.push( req.body.to , req.body.from );
      newConvo.messages.push(text);
      newConvo.save(function(err, text){
        if(err) res.status(400).send(err);
        else res.status(201).send(text);
      })
    }else{
      Messages.update({_id: req.body.id}, {
        $push: { messages : text}
      }, function(err) { 
        if(err) res.status(400).send(err);
        else res.status(201).send(text);
      })
    }
  },

  getConvo : function(req, res, next){
    Messages.findOne({users: {$all:[req.body.match_id, req.body.user_id]}}, function(err, list){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!list){
        res.status(404).send("Conversation not found")
        return next();
      }
      res.status(200).send(list);
   });
  },


  // getMessages : function(req, res, next){
  //   Messages.findOne({_id: req.body.id}, function(err, messages){
  //     if(err) res.status(404).send(err);
  //     else res.status(200).send(messages);
  //  });
  // },


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
      if(err) res.status(400).send(err);
      else res.status(201).send(text);
    })
  }
};