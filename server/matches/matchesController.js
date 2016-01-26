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
      Messages.findOne({users: {$all:[req.body.match_id, req.body.id]}}, function(err, convo){
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!convo){
              res.status(200).send(matchObject);
              return next();
            }
            else{
              matchObject.messages = convo.messages;
              res.status(200).send(matchObject);
              return next();
            }
         });
    }
    });
  },

  sendConnect: function(req, res, next){
    var user = req.body.id;
    var match = req.body.match_id;
    var connection = {};
    connection.id = req.body.id;
    connection.connected = false;

    User.findById(match, function(err, foundMatch){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!foundMatch){
        res.status(404).send("Could not connect with match");
        return next();
      }
      else{
        foundMatch.connections.push(connection);
        var foundem = false;
        for(var i = 0; i < foundMatch.matches.length; i++){
          if(foundMatch.matches[i][0] === "" + user){
            foundem = true;
            foundMatch.matches.splice(i, 1);
            break;
          }
        }
        foundMatch.save(User.findById(user, function(err, foundUser){
          if(err){
            res.status(500).send(err);
            return next();
          }
          if(!foundMatch){
            res.status(404).send("Could not connect with match");
            return next();
          }
          else{
            for(var i = 0; i < foundUser.matches.length; i++){
              if(foundUser.matches[i][0] === "" + match){
                foundUser.matches.splice(i, 1);
                break;
              }
            }
            res.status(200).send();
            foundUser.save(next);
          }
        }));
      }
    });
  },

  acceptConnect: function(req, res, next){
    var user = req.body.id;
    var match = req.body.match_id
    var connection = {};
    connection.id = user;
    connection.connected = true;
    User.findById(user, function(err, foundUser){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!foundUser){
        res.status(404).send("Could not accept connection");
        return next();
      }
      else{
        for(var i = 0; i < foundUser.connections.length; i++){
          if(foundUser.connections[i].id === "" + match){
            foundUser.connections[i].connected = true;
            break;
          }
        }
        User.findByIdAndUpdate(user, {connections: foundUser.connections}, function(err){
          if(err){
            res.status(500).send();
            return next();
          }else{
            User.findByIdAndUpdate(match, {$push: { connections: connection}}, function(err){
              if(err){
                res.status(500).send(err);
                return next();
              }
              else{
                res.status(200).send("Connection accepted");
                return next();
              }
            })
          }
        })
      }
    });
  },



  declineConnect: function(req, res, next){
    var user = req.body.id;
    var match = req.body.match_id
    User.findById(user, function(err, foundUser){
      if(err){
        res.status(500).send();
        return next();
      }
      if(!foundUser){
        res.status(404).send("Could not complete decline");
      }
      else{
        for(var i = 0; i < foundUser.connections.length; i++){
          if(foundUser.connections[i].id === "" + match){
            foundUser.connections.splice(i, 1);
            break;
          }
        }
        User.findByIdAndUpdate(user, {connections: foundUser.connections}, function(err){
          if(err){
            res.status(500).send(err);
            return next();
          }
          else{
            res.status(200).send("Connection successfully declined");
            return next();
          }
        })
      }
    })
    
  },

  reMatch: function(req, res, next){

    User.find({}, function(err, users){
      users.forEach(function(user){
        match.user(user, function (data){
          data.sort(function(a,b){ return b.score-a.score; });
          User.update({_id: user._id},{matches:data},function(err, user){
            if(err) console.log(err);
            else res.end(`
╥━━━━━━━━╭━━╮━━┳
╢╭╮╭━━━━━┫┃▋▋━▅┣
╢┃╰┫┈┈┈┈┈┃┃┈┈╰┫┣
╢╰━┫┈┈┈┈┈╰╯╰┳━╯┣
╢┊┊┃┏┳┳━━┓┏┳┫┊┊┣
╨━━┗┛┗┛━━┗┛┗┛━━┻
            `);
          });
        });
      });
    });
  }

};