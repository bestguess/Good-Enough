var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;

module.exports = {
  user : function(user, callback){
    var conflicts = {
      ISTJ: {
        ESTJ: 0, ISTJ: 0, INTJ: 0, ISTP: 0, ESTP: 0,
        ENTJ: 6, INTP: 6, ENFJ: 6, INFJ: 6, ISFJ: 6, ISFP: 6, ENTP: 6,
        ESFJ: 15, ESFP: 15, ENFP: 15, INFP: 15
      },
      ISTP: {
        ESTJ: 0, ISTJ: 0, ENTJ: 0, ESTP: 0,
        ESFJ: 6, ISFP: 6, INTJ: 6, ISFJ: 6,
        ISTP: 15, ESFP: 15, ENTP: 15, INTP: 15, ENFJ: 15, INFJ: 15, ENFP: 15, INFP: 15
      },
      ESTP: {
        ISTJ: 0, ESTP: 0, ISTP: 0, ESFP: 0,
        ESTJ: 6, ISFP: 6, ENTJ: 6, ENTP: 6, INTP: 6, ISFJ: 6,
        ESFJ: 15, INTJ: 15, ENFJ: 15, INFJ: 15, ENFP: 15, INFP: 15
      },
      ESTJ: {
        ISTJ: 0, ESFJ: 0, ISFJ: 0, ENTJ: 0, INTJ: 0, ISTP: 0,
        ENTP: 6, INTP: 6, ESTP: 6, ESFP: 6, ISFP: 6,
        ESTJ: 15, ENFJ: 15, INFJ: 15, INFP: 15, ENFP: 15
      },
      ISFJ: {
        ISFJ: 0, ENFJ: 0, ESTJ: 0,
        ESFJ: 6, ESTP: 6, ISFP: 6, INFJ: 6, INFP: 6, ESFP: 6, ISTJ: 6, ISTP: 6,
        ENTJ: 15, INTJ: 15, ENTP: 15, INTP: 15, ENFP: 15
      },
      ISFP: {
        ESFP: 0, ISFP: 0,
        ESTP: 6, ESTJ: 6, ESFJ: 6, ISTP: 6, ENFJ: 6, INFJ: 6, INFP: 6, ISFJ: 6, ISTJ: 6, ENFP: 6,
        ENTJ: 15, INTJ: 15, ENTP: 15, INTP: 15
      },
      ESFP: {
        ESTP: 0, ISFP: 0,
        ESTJ: 6, ESFJ: 6, ISFJ: 6, ESFP: 6, ENTP: 6, ENFJ: 6, INFJ: 6, ENFP: 6, INFP: 6,
        ISTJ: 15, ISTP: 15, ENTJ: 15, INTJ: 15, INTP: 15
      },
      ESFJ: {
        ESTJ: 0, ENFP: 0,
        ISFJ: 6, ESFJ: 6, ENFJ: 6, INFP: 6, ISFP: 6, ISTP: 6, ESFP: 6,
        ESTP: 15, ENTJ: 15, INTJ: 15, ENTP: 15, INTP: 15, INFJ: 15, ISTJ: 15
      },
      INFJ: {
        ENTP: 0, ENFP: 0, INFJ: 0, INFP: 0, ENFJ: 0,
        ISFJ: 6, ESFP: 6, ISFP: 6, ENTJ: 6, INTJ: 6, INTP: 6, ISTJ: 6,
        ESTJ: 15, ESFJ: 15, ESTP: 15, ISTP: 15
      },
      INFP: {
        ENFP: 0, INFP: 0, ENFJ: 0, INFJ: 0,
        ISFJ: 6, ESFJ: 6, ESFP: 6, ISFP: 6, ENTP: 6, INTP: 6,
        ESTJ: 15, ISTJ: 15, ESTP: 15, ISTP: 15, ENTJ: 15, INTJ: 15
      },
      ENFP: {
        INFJ: 0, INFP: 0, ENFJ: 0, ENFP: 0, ESFJ: 0,
        ENTJ: 6, ENTP: 6, INTJ: 6, INTP: 6, ESFP: 6, ISFP: 6,
        ISTJ: 15, ESTJ: 15, ISTP: 15, ESTP: 15, ISFJ: 15
      },
      ENFJ: {
        ISFJ: 0, ENFJ: 0, ENTJ: 0, INFJ: 0, ENFP: 0, INFP: 0,
        ESFJ: 6, ESFP: 6, ISFP: 6, INTP: 6, ISTJ: 6, ENTP: 6,
        ESTJ: 15, ESTP: 15, ISTP: 15, INTJ: 15
      },
      INTJ: {
        ESTJ: 0, INTJ: 0, ISTP: 0, ENTJ: 0,
        INTP: 6, INFJ: 6, INFP: 6, ENFP: 6,
        ESFJ: 15, ISFJ: 15, ESTP: 15, ESFP: 15, ISFP: 15, ENTP: 15, ISTJ: 15, ENFJ: 15
      },
      INTP: {
        ENTP: 0, INTP: 0, INTJ: 0,
        ESTJ: 6, ISTJ: 6, ESTP: 6, ENTJ: 6, ENFJ: 6, INFJ: 6, ENFP: 6, INFP: 6,
        ESFJ: 15, ISFJ: 15, ISTP: 15, ESFP: 15, ISFP: 15
      },
      ENTP: {
        ENTP: 0, INTP: 0, INFJ: 0,
        ESTJ: 6, ISTJ: 6, ESTP: 6, ESFP: 6, ENTJ: 6, ENFP: 6, INFP: 6, ENFJ: 6,
        ESFJ: 15, ISFJ: 15, ISTP: 15, ISFP: 15, INTJ: 15
      },
      ENTJ: {
        ESTJ: 0, ISTP: 0, ENTJ: 0, ENFJ: 0, INTJ: 0,
        ISTJ: 6, ESTP: 6, ENTP: 6, INTP: 6, INFJ: 6, ENFP: 6,
        ESFJ: 15, ISFJ: 15, ESFP: 15, ISFP: 15, INFP: 15
      }
    };

    var birthTime = new Date(user.birthday[0],user.birthday[1],user.birthday[2]);
    var age = calculateAge(birthTime);

    var ageLow = user.birthday[0] - (age - Math.round( age - (age/6) + (age/25)) );
    var ageHigh = user.birthday[0] + (Math.round( age + ( (age/3) * (age/52) ) ) - age) ;

    function calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    User.find({birthday: { $gt: ageLow, $lt: ageHigh }}, function(err, list){
      function findMatch(user) {
        var type = user.type;
        var scores = user.personality;
        var result = {};
        var resultArr = [];

        for(var p=0;p<list.length;p++){
          var person_id = list[p]._id;
          var person_scores = JSON.parse(list[p].personality);
          var person_type = list[p].type;
          
          for(var pair in scores){
            if(result[person_id]){
              if(pair === "ft") result[person_id][1] += Math.abs(scores[pair]-person_scores[pair]/2+5);
              else result[person_id][1] += Math.abs(scores[pair]-person_scores[pair]+9);
            }else{
              result[person_id] = [list[p]._id, Math.abs(scores[pair]-person_scores[pair])];
              result[person_id][1] += conflicts[type][person_type]-10;
            }
          }
          var matchAge = new Date(list[p].birthday[0],list[p].birthday[1],list[p].birthday[2]);
          result[person_id].push( list[p].firstName, list[p].lastName, list[p].picture, calculateAge(matchAge));
        }

        for(var stat in result){
          result[stat][1] = Math.round(Math.min((100-((result[stat][1]/1.8)-10))),100);
          resultArr.push(result[stat]);
        }
        callback(resultArr);
      }
      findMatch(user);
    });
  }
};
