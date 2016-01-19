var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/emails', usersController.getEmails);
  app.post('/signup', usersController.signUp);
  app.post('/signin', usersController.signIn);
  app.get('/logout', usersController.logout);
  app.post('/info', usersController.getUser);
};
