var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;
var helpers = require("../helpers/helpers.js");
var match = require('../helpers/matching_algo.js');

// The cron job code is at the bottom of this file

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

    User.findOne({_id:match}, function(err, foundMatch){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!foundMatch){
        res.status(404).send("Could not connect with match");
        return next();
      }
      else{
        for(var i = 0; i < foundMatch.matches.length; i++){
          if(foundMatch.matches[i].id === user){
            foundMatch.matches[i].requested = true;
            break;
          }
        }
        User.findByIdAndUpdate(match, {matches: foundMatch.matches}, function(err){
          if(err){
            res.status(500).send(err);
            return next();
          }
          else{
            User.findOne({_id:user}, function(err, foundUser){
              if(err){
                res.status(500).send(err);
                return next();
              }
              if(!foundUser){
                res.status(404).send("Could not connect with match");
                return next();
              }
              else{
                for(var i = 0; i < foundUser.matches.length; i++){
                  if(foundUser.matches[i].id === match){
                    foundUser.matches[i].display = false;
                    break;
                  }
                }
                User.findByIdAndUpdate(user, {matches: foundUser.matches}, function(err){
                  if(err){
                    res.status(500).send(err);
                    return next();
                  }
                  else{
                    res.status(200).send(foundUser);
                    return next();
                  }
                })
              }
            })
          }
        })
      }
    });
  },

  acceptConnect: function(req, res, next){
    var user = req.body.id;
    var match = req.body.match_id

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
        for(var i = 0; i < foundUser.matches.length; i++){
          if(foundUser.matches[i].id === match){
            foundUser.matches[i].requested = false;
            foundUser.matches[i].connected = true;
            break;
          }
        }
        User.findByIdAndUpdate(user, {matches: foundUser.matches}, function(err){
          if(err){
            res.status(500).send(err);
            return next();
          }else{
            User.findById(match, function(err, foundMatch){
              if(err){
                res.status(500).send(err);
                return next();
              }
              if(!foundMatch){
                res.status(404).send("Could not find match to accept");
                return next();
              }
              else{
                for(var i = 0; i < foundMatch.matches.length; i++){
                  if(foundMatch.matches[i].id === "" + foundUser._id){
                    foundMatch.matches[i].connected = true;
                    foundMatch.matches[i].display = true;
                    foundMatch.matches[i].accepted = true;
                    break;
                  }
                }
                User.findByIdAndUpdate(match, {matches: foundMatch.matches}, function(err){
                  if(err){
                    res.status(500).send(err);
                    return next();
                  }
                  else{
                    res.status(200).send(foundUser);
                    return next();
                  }
                })
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
        for(var i = 0; i < foundUser.matches.length; i++){
          if(foundUser.matches[i].id === "" + match){
            foundUser.matches[i].display = false;
            foundUser.matches[i].requested = false;
            break;
          }
        }
        User.findByIdAndUpdate(user, {matches: foundUser.matches}, function(err){
          if(err){
            res.status(500).send(err);
            return next();
          }
          else{
            res.status(200).send(foundUser);
            return next();
          }
        })
      }
    })
    
  },

  reMatch: function(req, res, next){

    User.find({}, function(err, users){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!users){
        res.status(403).send('Could not find any users to rematch');
        return next();
      }
      users.forEach(function(user){
        match.user(user, function (data){
          data.sort(function(a,b){ return b.score-a.score; });
          User.update({_id: user._id},{matches:data},function(err, user){
            if(err){
              // res.status(500).send(err);
              // return next();
              console.log("Could not update user " + user._id + " during rematch");
            }
          });
        });
      });
      res.status(200).end(`
╥━━━━━━━━╭━━╮━━┳
╢╭╮╭━━━━━┫┃▋▋━▅┣
╢┃╰┫┈┈┈┈┈┃┃┈┈╰┫┣
╢╰━┫┈┈┈┈┈╰╯╰┳━╯┣
╢┊┊┃┏┳┳━━┓┏┳┫┊┊┣
╨━━┗┛┗┛━━┗┛┗┛━━┻
            `);
      return next();
    });
  }

};

var CronJob = require('cron').CronJob;
var job = new CronJob('00 00 0-23/2 1-31 0-11 0-6', function() {
  console.log('recalculating matches via cron');
  User.find({}, function(err, users){
      users.forEach(function(user){
        match.user(user, function (data){
          data.sort(function(a,b){ return b.score-a.score; });
          User.update({_id: user._id},{matches:data},function(err, user){
            if(err) console.log(err);
          });
        });
      });
      console.log(`
╥━━━━━━━━╭━━╮━━┳
╢╭╮╭━━━━━┫┃▋▋━▅┣
╢┃╰┫┈┈┈┈┈┃┃┈┈╰┫┣
╢╰━┫┈┈┈┈┈╰╯╰┳━╯┣
╢┊┊┃┏┳┳━━┓┏┳┫┊┊┣
╨━━┗┛┗┛━━┗┛┗┛━━┻
            `);
    });
}, function(){console.log('match recalculations completed via cron')}, true, 'America/Chicago');
job.start();

