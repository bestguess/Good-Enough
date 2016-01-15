var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/emails', usersController.getEmails);
  app.post('/signup', usersController.signUp);
  app.get('/signin', usersController.signIn);
};