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
    ];
    var joshMessages =  [
        {
            "id": 1,
            "message": "Oh, how weird. I'm pretty sure I saw you at the Family of the Year concert at The Parish",
            "date": "Fri Feb 05 2016 15:48:19 GMT+0000 (UTC)",
            "user": "56a4ed679023cefc895d035c"
        },
        {
            "id": 2,
            "message": "I was there with my wife. We really only went to hear one song. Ha.",
            "date": "Fri Feb 05 2016 16:56:14 GMT+0000 (UTC)",
            "user": "56a26ce4396710e14d67c299"
        },
        {
            "id": 3,
            "message": "If you're down, I have an extra SXSW pass if you'd like to join my friends and I. By looking at your interests, I think you'd fit right in.",
            "date": "Fri Feb 06 2016 10:58:15 GMT+0000 (UTC)",
            "user": "56a4ed679023cefc895d035c"
        },
        {
            "id": 4,
            "message": "I tried to buy a ticket and they were out, so that'd be great!",
            "date": "Fri Feb 06 2016 11:00:01 GMT-0600 (CST)",
            "user": "56a26ce4396710e14d67c299"
        }
    ];
    var markInterests = "{\"discussion\":[\"Politics\",\"Technology\"],\"activity\":[\"Beer\",\"Javascript\"],\"polled\":[\"Watching Movies\",\"Going to Concerts\",\"Playing Board Games\",\"Exploring Cities\",\"Cheese\",\"Winter\",\"Republican\",\"Tea\"]}";

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
        var resetJosh = false;
        for(var i = 0; i < foundMark.matches.length; i++){
          if(resetIvan && resetHank && resetJosh) break;
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
          if(foundMark.matches[i].id === "56a4ed679023cefc895d035c"){
            foundMark.matches[i].display = true;
            foundMark.matches[i].connected = true;
            foundMark.matches[i].requested = false;
            foundMark.matches[i].accepted = false;
            resetJosh = true;
          }
          
        }
        // Update Mark's data
        User.findByIdAndUpdate("56a26ce4396710e14d67c299", {matches: foundMark.matches, question: 0, interests: markInterests}, function(err){
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
                Messages.findOneAndUpdate({users: {$all:["56a26ce4396710e14d67c299", "56a4ed679023cefc895d035c"]}}, {messages:joshMessages}, function(err){
                  if(err) console.log('error finding conversation between Mark and Josh for demo reset');
                  // Reset conversation between Mark and Kayla
                  Messages.findOneAndRemove({users: {$all:["56a26ce4396710e14d67c299", "56a7a1b6801fe4110081ee8f"]}}, function(err){
                    if(err) console.log('error finding conversation between Mark and Kayla for demo reset');
                    // Reset conversation between Mark and Festus
                    Messages.findOneAndRemove({users: {$all:["56a26ce4396710e14d67c299", "56a7f7f7ad6c801100fb81f7"]}}, function(err){
                      if(err) console.log('error finding conversation between Mark and Festus for demo reset');
                      // Reset conversation between Mark and Paolinni
                      Messages.findOneAndRemove({users: {$all:["56a26ce4396710e14d67c299", "56a6433a33014754090a5868"]}}, function(err){
                        if(err) console.log('error finding conversation between Mark and Paolinni for demo reset');
                        // Reset conversation between Mark and Hank
                        Messages.findByIdAndUpdate("56b22b4c6f5ba80853405724",{messages:hankMessages}, function(err){
                          if(err) console.log('error finding conversation between Mark and Hank for demo reset');
                          // Provide Mark's email and password for authentication check
                          if(req.body !== {}) req.body = {};
                          req.body.email = 'mark';
                          req.body.password = '1234';
                          return next();
                        });
                      });
                    });
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