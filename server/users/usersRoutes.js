var usersController = require('./usersController.js');
var passport = require('passport');

module.exports = function(app) {
  app.get('/emails', usersController.getEmails);
  app.get('/twitter', passport.authenticate('twitter'));
  app.post('/signup', usersController.signUp);
  app.post('/signin', usersController.signIn);
  app.get('/logout', function(req, res){
    req.logout();
    res.status(200).redirect('/');
  });
};