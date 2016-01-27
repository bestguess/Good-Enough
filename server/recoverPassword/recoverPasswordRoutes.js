var recoverPasswordController = require('./recoverPasswordController.js');

module.exports = function(app) {
  app.post('/recover-password', recoverPasswordController.recoverPassword);
};
