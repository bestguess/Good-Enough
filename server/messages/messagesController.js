var db = require('../db_config.js');
var mongoose = require('mongoose');
var Messages = db.Messages;
var Users = db.Users;

module.exports = {

  send : function(req, res, next){
    var date = new Date().toString();

    // set up structure for message
    var text = {
      user : req.body.from,
      date : date,
      message : req.body.message,
      id : req.body.messageID
    };

    // find the conversation to add the new message to
    Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
      if(err){
        res.status(500).send(err);
        return next();
      }
      // if no conversation exist, create one with the new message
      if(convo === null){
        var newConvo = new Messages;
        newConvo.users.push( req.body.to , req.body.from );
        newConvo.messages.push(text);
        newConvo.save(function(err, text){
        if(err) res.status(400).send(err);
        else res.status(201).send(newConvo);
        Users.findOne({_id:req.body.to}, function(err, foundUser){
                if(err) return next();
                if(!foundUser) return next();
                for(var i = 0; i < foundUser.matches.length; i++){
                  if(foundUser.matches[i].id === req.body.from){
                    if(!foundUser.matches[i].messages) foundUser.matches[i].messages = {};
                    foundUser.matches[i].messages[req.body.messageID] = req.body.messageID;
                    Users.findByIdAndUpdate(req.body.to, {matches:foundUser.matches}, function(err){
                      if(err) return next();
                    })
                    return next();
                  }
                };
              });
        });
      } else {
        // else, add the new message to the existing conversation
        Messages.findByIdAndUpdate(convo._id, {
          $push: { messages : text}
        } ,function(err) { 
          if(err) res.status(400).send(err);
          else {
            Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
              if(err){
                res.status(500).send(err);
                return next();
              }
              if(!convo){
                res.status(404).send("Conversation not found")
                return next();
              }
              res.status(200).send(convo);
              Users.findOne({_id:req.body.to}, function(err, foundUser){
                if(err) return next();
                if(!foundUser) return next();
                for(var i = 0; i < foundUser.matches.length; i++){
                  if(foundUser.matches[i].id === req.body.from){
                    if(!foundUser.matches[i].messages) foundUser.matches[i].messages = {};
                    foundUser.matches[i].messages[req.body.messageID] = req.body.messageID;
                    Users.findByIdAndUpdate(req.body.to, {matches:foundUser.matches}, function(err){
                      if(err) return next();
                    })
                    return next();
                  }
                };
              });
           });
          }
        }); 
      }
    });
  },

  delete : function(req, res, next){
    Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
      if(err){
        res.status(500).send(err);
        return next();
      }
      Messages.findByIdAndUpdate(convo._id, {
        $pull: { messages : { id: req.body.message_id } }
      } ,function(err) { 
        if(err) res.status(400).send(err);
        else {
          Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!convo){
              res.status(404).send("Conversation not found")
              return next();
            }
            res.status(200).send(convo);
            // // Decrements the message count. Not implemented for now.
            Users.findOne({_id:req.body.to}, function(err, foundUser){
              if(err) return next();
              if(!foundUser) return next();
              for(var i = 0; i < foundUser.matches.length; i++){
                if(foundUser.matches[i].id === req.body.from){
                  if(foundUser.matches[i].messages.length < 1) return next();
                  delete foundUser.matches[i].messages[req.body.message_id];
                  Users.findByIdAndUpdate(req.body.to, {matches:foundUser.matches}, function(err){
                    if(err) return next();
                    return next();
                  });
                  break;
                }
              }
            })
         });
        }
      }); 
   });
  },

  getConvo : function(req, res, next){
    Messages.findOne({users: {$all:[req.body.match_id, req.body.id]}}, function(err, convo){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!convo){
        // If there are no conversations send back an empty array
        // So front end doesn't have to add handling for this case
        res.status(200).send({messages: []})
        return next();
      }
      res.status(200).send(convo);
      // Reset messages property on user data to empty messages notifications
      Users.findOne({_id:req.body.id}, function(err, foundUser){
        for(var i = 0; i < foundUser.matches.length; i++){
          if(foundUser.matches[i].id === req.body.match_id){
            foundUser.matches[i].messages = {};
            Users.findByIdAndUpdate(req.body.id, {matches: foundUser.matches}, function(err){
              if(err) return next();
              return next();
            })
          }
        }
      })
   });
  }


};