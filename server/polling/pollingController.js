var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var helpers = require("../helpers/helpers.js");

module.exports = {

  postQuestion: function(req, res){
    var submittedQuestion = req.body.question;
    var submittedAnswers = JSON.parse(req.body.answers);

    User.find({}, '_id questions' ,function (err, list) {
      list.forEach(function(user){
        var userid = user._id;
        var questions = user.questions;
        questions.push({question: submittedQuestion, answers: submittedAnswers });

        User.findByIdAndUpdate(userid,{questions:questions},function(err, changes){
          if(err) console.log(err);
          else res.send(changes);
        });
      })
    });    
  },

  answer: function(req, res){
    User.findById(req.body._id, 'interests questions', function (err, user) {
      var interests = JSON.parse(user.interests);
      var questions = user.questions.slice(1);

      if(req.body.answer !== "skip" && req.body.answer !== "no"){
        if(interests.polled){
          if(interests.polled.indexOf(req.body.answer) === -1) interests.polled.push(req.body.answer);
        }
        else interests.polled = [req.body.answer];
      }
      User.findByIdAndUpdate(req.body._id,{interests:JSON.stringify(interests),questions:questions},function(err, changes){
          if(err) console.log(err);
          else res.status(201).send(questions[0]);
      });
    });    
  }


};
