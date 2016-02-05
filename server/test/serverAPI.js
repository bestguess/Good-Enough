var server = require('../server.js');
var request = require('superagent');
var chai = require('chai');
var expect = chai.expect;
var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;


describe('Homepage', function(){

  it("should respond to GET request", function(done){
    request.get('localhost:4000/')
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        done();
      })
  });
})

describe('A lonely user', function(){
  var testUser = { 
    "firstName": "Test",
    "lastName": "User",
    "email": "user@test.com",
    "password": "test",
    "picture":"http://none.com",
    "birthday": [1986,9,30],
    "gender": "mixed",
    "type": "ISTP",
    "personality": {ie:24,sn:24,ft:24,jp:24},
    "picture": "http://e27.co/img/no_image_profile.jpg",
    "places": [ "Test Facility" ],
    "matches": [],
    "connections": [],
    "interests": { discussion:[ "testing" ],activity:[ "testing" ],polled:[ "testing" ]},
    "question": 0
  };

  var message = { 
    message : "test",
    messageID : 1
  };
  var user = {};

  it("should be able to register", function(done){
      this.timeout(8000);
      request.post('localhost:4000/app/users/signup')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(testUser))
        .end(function(err,res){
          expect(res).to.exist;
          message.token = res.body.token;
          message.to = message.id = message.from = message.match_id = user.id = res.body.id;
          expect(res.status).to.equal(201);
          done();
        })
    });

    it("should be able to sign in", function(done){
      request.post('localhost:4000/app/users/signin')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({"email": "user@test.com" , "password": "test"}))
        .end(function(err,res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.token).to.exist;
          message.token = res.body.token;
          message.to = message.from = res.body.id;
          done();
        })
    });


    it("should be able to start a new conversation", function(done){
      request.post('localhost:4000/app/messages/send')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(message))
        .end(function(err,res){
          expect(res).to.exist;
          expect(res.status).to.equal(201);
          done();
        })
    });

    it("should be able to get a conversation", function(done){
      request.post('localhost:4000/app/messages/get')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(message))
        .end(function(err,res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.messages.length).to.equal(1);
          done();
        })
    });

    it("should be able to delete message", function(done){
      Messages.find({ users: user.id }).remove(function(err, res){
        expect(res).to.exist;
        expect(res.result.ok).to.equal(1);
        done();
      });
    });

    it("should be able to be deleted", function(done){
      User.find({ email:"user@test.com" }).remove(function(err, res){
        expect(res).to.exist;
        expect(res.result.ok).to.equal(1);
        done();
      });
    });

});
