var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;

module.exports = {

  demoReset: function(req, res, next){
    // Conversation with Hank data
    var newMessages = {"3": 3, "4": 4};
    var hankMessages =  [
        {
            "id": 1,
            "message": "Hey Hank, thanks for accepting my connection",
            "date": "Wed Feb 03 2016 10:31:08 GMT-0600 (CST)",
            "user": "56a26ce4396710e14d67c299"
        },
        {
            "id": 2,
            "message": "I saw the you like Brew & Brew. Want to meet up there sometime this week?",
            "date": "Wed Feb 03 2016 10:31:42 GMT-0600 (CST)",
            "user": "56a26ce4396710e14d67c299"
        },
        {
            "id": 3,
            "message": "That sounds good man",
            "date": "Wed Feb 03 2016 10:33:42 GMT-0600 (CST)",
            "user": "56a3ae3384d30acd5a59e5eb"
        },
        {
            "id": 4,
            "message": "Friday?",
            "date": "Wed Feb 03 2016 10:33:58 GMT-0600 (CST)",
            "user": "56a3ae3384d30acd5a59e5eb"
        }
    ]

    // Find Mark
    User.findById("56a26ce4396710e14d67c299", function(err, foundMark){
      if(err || !foundMark){
        console.log('error finding demo user Mark for demo reset');
        return next();
      }
      // Find Ivan in Mark's matches and return him to a requesting connection
      // and reset new messages data from Hank
      else{
        var resetIvan = false;
        var resetHank = false;
        for(var i = 0; i < foundMark.matches.length; i++){
          if(resetIvan && resetHank) break;
          if(foundMark.matches[i].id === "56a25f7c9f4fae594a8620bd"){
            foundMark.matches[i].display = true;
            foundMark.matches[i].connected = false;
            foundMark.matches[i].requested = true;
            foundMark.matches[i].accepted = false;
            resetIvan = true;
          }
          if(foundMark.matches[i].id === "56a3ae3384d30acd5a59e5eb"){
            foundMark.matches[i].messages = newMessages;
            resetHank = true;
          }
        }
        // Update Mark's data
        User.findByIdAndUpdate("56a26ce4396710e14d67c299", {matches: foundMark.matches, question: 0}, function(err){
          if(err) console.log('error resetting demo user Mark');
          // Find Ivan
          User.findById("56a25f7c9f4fae594a8620bd", function(err, foundIvan){
            if(err || !foundIvan){
              console.log('error finding Ivan for demo reset');
              return next();
            }
            // Find Mark in Ivan's matches and return him to a requestee
            else{
              for(var i = 0; i < foundIvan.matches.length; i++){
                if(foundIvan.matches[i].id === "56a26ce4396710e14d67c299"){
                  foundIvan.matches[i].display = false;
                  foundIvan.matches[i].connected = false;
                  foundIvan.matches[i].requested = false;
                  foundIvan.matches[i].accepted = false;
                  break;
                }
              }
            }
            // Update Ivan's data
            User.findByIdAndUpdate("56a25f7c9f4fae594a8620bd", {matches:foundIvan.matches}, function(err){
              if(err) console.log('error resetting demo data for Ivan');
              // Reset conversation between Mark and Ivan
              Messages.findOneAndRemove({users: {$all:["56a26ce4396710e14d67c299", "56a25f7c9f4fae594a8620bd"]}}, function(err){
                if(err) console.log('error finding conversation between Mark and Ivan for demo reset');
                // Reset conversation between Mark and Josh
                Messages.findOneAndRemove({users: {$all:["56a26ce4396710e14d67c299", "56a4ed679023cefc895d035c"]}}, function(err){
                  if(err) console.log('error finding conversation between Mark and Josh for demo reset');
                  // Reset conversation between Mark and Hank
                  Messages.findOneAndUpdate({users: {$all:["56a26ce4396710e14d67c299", "56a4ed679023cefc895d035c"]}},{messages:hankMessages}, function(err){
                    if(err) console.log('error finding conversation between Mark and Hank for demo reset');
                    // Provide Mark's email and password for authentication check
                    if(req.body !== {}) req.body = {};
                    req.body.email = 'mark';
                    req.body.password = '1234';
                    return next();
                  });

                });
              });
            })
          });
        });
      }
    })

  }

};