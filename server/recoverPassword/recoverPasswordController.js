var db = require('../db_config.js');
var User = db.Users;

var mongoose = require('mongoose');
var helpers = require("../helpers/helpers.js");
var bcrypt = require('bcrypt');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var goodies = require('../goodies.js');

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
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 1800000; // 30 minutes
              user.save(function(err) {
                done(err, token, user);
              });
            }
          });
        },

        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'SendGrid',
            auth: goodies.sendGridAuth
          });

          var mailOptions = {
            to: user.email,
            from: 'support@goodenough.com',
            subject: 'Good-Enough Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/app/recoverPassword/reset-password/' + token + '\n\n' +
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
  },

  resetPassword: function(req, res, next) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.status(400).send(JSON.stringify('Password reset token is invalid or has expired.'));
      } else {
        res.redirect('/reset-password/' + req.params.token)
      }
    });
  },

  submitNewPassword: function(req, res, next) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (err) {
            res.status(500).send(err);
            return next();
          }
          if (!user) {
            res.status(400).send(JSON.stringify('Password reset token is invalid or has expired.'));
            return next();
          }
          user.password = req.body.confirmNewPassword;
          bcrypt.hash(user.password, user.password.length, function(err, hash) {
            if (err) {
              res.status(500).send(err);
              return next()
            }
            if (!hash) {
              res.status(500).send('Error producing hash');
              return next()
            }
            user.password = hash;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
              if (err) console.log('Error saving new password', err);
              done(err, user)
            });
          })
        });
      },
      function(user, done) {
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
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('Success!, your password has been reset')
          done(err);
        });
      }
    ], function(err) {
      if (err) res.status(400).send(err);
      res.status(200).send(JSON.stringify('Password has been reset!'));
    });
  }
}
