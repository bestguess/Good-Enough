var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/emails', usersController.getEmails);
  app.post('/signUp', usersController.signUp);
  app.get('/signIn', usersController.signIn);
};