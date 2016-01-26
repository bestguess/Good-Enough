var usersController = require('./usersController.js');
var helpers = require('../helpers/helpers.js');
console.log(helpers.isLoggedIn);

module.exports = function(app) {
  app.post('/signup', usersController.signUp);
  app.post('/signin', usersController.signIn);
  app.post('/logout', usersController.logout);

  app.post('/*', helpers.isLoggedIn);
  app.post('/info', usersController.getUser);
  app.post('/update', usersController.updateUser);
};
