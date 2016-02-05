var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;

module.exports = {
  user : function(user, callback){

    // -------------------------------------------------------------------------
    // This dictionary is used to see which personalities a user conflicts with.
    // The higher the number, the least likely they'd get along.
    // -------------------------------------------------------------------------
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

    // -------------------------------------------------------------------------------------------------
    // These next few lines calculate the user's age, then sets the age range for your possible friends.
    // -------------------------------------------------------------------------------------------------
    var birthTime = new Date(user.birthday[0],user.birthday[1],user.birthday[2]);
    var age = calculateAge(birthTime);

    var ageLow = user.birthday[0] - (age - Math.round( age - (age/6) + (age/25)) )-2;
    var ageHigh = user.birthday[0] + (Math.round( age + ( (age/4) * (age/65) ) ) - age)+1 ;

    function calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // -------------------------------------------------
    // Now we search for people in the user's age range
    // -------------------------------------------------
    User.find({birthday: { $gt: ageLow, $lt: ageHigh }}, function(err, list){
      function findMatch(user) {
        var user_id = user._id.toString();
        var user_interests = JSON.parse(user.interests);
        var user_matches = user.matches;
        var type = user.type;
        var scores = JSON.parse(user.personality);
        var result = {};
        var resultArr = [];

        // -----------------------------------------------------------
        // Iterates over all of your matches and parses any JSON info.
        // -----------------------------------------------------------
        for(var p=0;p<list.length;p++){
          var matchAge = new Date(list[p].birthday[0],list[p].birthday[1],list[p].birthday[2]);
          var result = {
            id : list[p]._id.toString(),
            firstName : list[p].firstName,
            lastName : list[p].lastName,
            picture : list[p].picture,
            age : calculateAge(matchAge),
            messages : {},
            display: true,
            requested: false,
            accepted: false,
            connected: false,
            common : []
          };

          var person_scores = JSON.parse(list[p].personality);
          var person_type = list[p].type;
          var person_interests = JSON.parse(list[p].interests);

          // ---------------------------------------------------------------------
          // prevents scoring against yourself and hides our demo user from people
          // ---------------------------------------------------------------------
          if(user_id !== result.id && result.id !== "56a26ce4396710e14d67c299"){

          // ----------------------------------------------------------------------------------------------------
          // During rematch, we don't want to lose connections and requests. We protect overwriting to those here
          // ----------------------------------------------------------------------------------------------------
          user_matches.forEach(function(match){
            if(match.id === list[p]._id.toString()){
              result.display = match.display;
              result.requested = match.requested;
              result.connected = match.connected;
              result.accepted = match.accepted;
              result.messages = match.messages;
            }
          });

            // --------------------------------------------------------------
            // creates your original score based off of personality conflicts
            // --------------------------------------------------------------
            for(var pair in scores){
              if(result.score){
                if(pair === "ft") result.score += Math.abs(scores[pair]-person_scores[pair]/2+5);   //---- FT ---- //
                else result.score += Math.abs(scores[pair]-person_scores[pair]+9);   //---- NS & JP ---- //
              }else{
                result.score = Math.abs(scores[pair]-person_scores[pair]);   //---- IE ---- //
                result.score += conflicts[type][person_type]-10;   //---- Conflicts ---- //
              }
            }

            // --------------------------------------------------
            // knocks off points if you're of the opposite gender
            // --------------------------------------------------
            if(user.gender !== list[p].gender) result.score += 8;

            // -----------------------------------------
            // adds points if you have similar interests
            // -----------------------------------------
            for(var key in user_interests){
              if(user_interests[key]){
                user_interests[key].forEach(function(user_interest){
                  if(person_interests[key]){
                    person_interests[key].forEach(function(person_interest){
                      if(user_interest.toUpperCase() === person_interest.toUpperCase()){
                        result.common.push(person_interest);
                        result.score -= result.score * 0.03;
                      }
                    });
                  }
                });
              }
            }
            // ---------------------------------------------------------
            // sends back an array of information to be saved in matches
            // ---------------------------------------------------------
            result.score = Math.round(Math.min((100-((result.score/0.9)-10)),99));
            if(result.score>60) resultArr.push(result);
          }
        }
        callback(resultArr);
      }
      findMatch(user);
    });
  }
};
