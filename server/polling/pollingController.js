var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Question = db.Questions;
var helpers = require("../helpers/helpers.js");

module.exports = {

  postQuestion: function(req, res){
    var count;

    Question.count({}, function(err, num) {
      count = num;
      console.log('Count is ' + num);
    }).then(function(){

      var submittedQuestion = {
        id: count,
        question: req.body.question,
        answers: req.body.answers
      };

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
    Question.find({id: req.body.question}, function (err, question) {
      if(err) console.log(err);
      else if(!question.length) res.send("nope");  
      else res.send(question);
    });    
  },

  answer: function(req, res){
    User.findById(req.body.id, 'interests question', function (err, user) {
      var interests = JSON.parse(user.interests);
      var question = user.question + 1;

      if(req.body.answer !== "skip" && req.body.answer !== "no"){
        if(interests.polled){
          if(interests.polled.indexOf(req.body.answer) === -1) interests.polled.push(req.body.answer);
        }
        else interests.polled = [req.body.answer];
      }


      User.findByIdAndUpdate(req.body.id,{interests:JSON.stringify(interests),question:question},function(err, changes){
        if(err) console.log(err);
        else{
          Question.find({id: question}, function (err, question) {
            if(err) console.log(err);
            else res.status(201).send(question);
          });  
        };
      });  
    });   
  }


};
