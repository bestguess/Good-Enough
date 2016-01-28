var db = require('../db_config.js');
var User = db.Users;

var mongoose = require('mongoose');
var helpers = require("../helpers/helpers.js");
var bcrypt = require('bcrypt');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

module.exports = {

  recoverPassword: function(req, res, next) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },

        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              res.status(400).send('No account with that email address exists.');
            } else {
              console.log('FOUND USER!');
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 900000; // 15 minutes
              user.save(function(err) {
                done(err, token, user);
              });
            }
          });
        },

        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'SendGrid',
            auth: {
              user: 'paolinni',
              pass: 'goodenough27'
            }
          });

          var mailOptions = {
            to: user.email,
            from: 'support@goodenough.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };

          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) res.status(400).send(err);
        res.status(200).send(JSON.stringify('EMAIL IS GOOD!'));
      });
  }
}
