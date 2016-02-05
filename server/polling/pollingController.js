var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Question = db.Questions;
var helpers = require("../helpers/helpers.js");

module.exports = {

  postQuestion: function(req, res){
    var count;
    // gets the number of questions in the database to increment id
    Question.count({}, function(err, num) {
      count = num;
    }).then(function(){
      // creates structure for question
      var submittedQuestion = {
        id: count,
        question: req.body.question,
        answers: req.body.answers,
        skip: false
      };
      // saves new question to server
      var newQuestion = Question(submittedQuestion);
      newQuestion.save(function(err, ques){
        if(err) res.status(500).send(err);
        else{
          res.status(201).send(ques);
        }
      });
    }); 
  },

  getQuestion: function(req, res){
    (function getInfo(ques){
      // grab the question that the profile page requested
      Question.findOne({id: ques}, function (err, question) {
        if(err) console.log(err);
        else if(!question) res.send({});
        // if question is supposed to be skipped, increase the user's question and send back the next one
        else if(question.skip){
          User.findByIdAndUpdate(req.body.id,{question:ques + 1},function(err, changes){
            if(err) console.log(err);
            else getInfo(ques + 1);
          });  
        } else res.send(question);
      });    
    })(req.body.question)
  },

  answer: function(req, res){
    // grab the user's interests so we can add to it.
    User.findById(req.body.id, 'interests question', function (err, user) {
      var interests = JSON.parse(user.interests);
      var question = user.question + 1;
      // except if it's value is skip or if that value has already been stored in the user's interests
      if(req.body.answer !== "skip" && req.body.answer !== "no"){
        if(interests.polled) if(interests.polled.indexOf(req.body.answer) === -1) interests.polled.push(req.body.answer);
        else interests.polled = [req.body.answer];
      }
      // saves the polling answer to the user's interests
      User.findByIdAndUpdate(req.body.id,{interests:JSON.stringify(interests),question:question},function(err, changes){
        if(err) console.log(err);
        else{
          (function getInfo(ques){
            // grab the question that the profile page requested
            Question.findOne({id: ques}, function (err, nextQuestion) {
              var obj = { 'questions': 'none' }
              if(err) console.log(err);
              else if(!nextQuestion) res.send({});
              // if question is supposed to be skipped, increase the user's question and send back the next one
              else if(nextQuestion.skip){
                User.findByIdAndUpdate(req.body.id,{question:ques + 1},function(err, changes){
                  if(err) console.log(err);
                  else getInfo(ques + 1);
                });  
              }else res.status(201).send(nextQuestion);
            });    
          })(question)
        };
      });  
    });   
  }


};
