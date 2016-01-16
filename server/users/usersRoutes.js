var usersController = require('./usersController.js');

module.exports = function(app, passport) {
  app.get('/emails', usersController.getEmails);
  app.post('/signup', usersController.signUp);
  app.post('/signin', usersController.signIn);
  app.get('/logout', function(req, res){
    req.logout();
    res.status(200).redirect('/');
  });
};