var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('app/users/emails', usersController.getEmails);
  app.post('app/users/signUp', usersController.signUp);
  app.get('app/users/signIn', usersController.signIn);
};