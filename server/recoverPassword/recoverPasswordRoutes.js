var recoverPasswordController = require('./recoverPasswordController.js');

module.exports = function(app) {
  app.post('/recover-password', recoverPasswordController.recoverPassword);
  app.get('/reset-password/:token', recoverPasswordController.resetPassword);
  app.post('/reset-password/:token', recoverPasswordController.submitNewPassword);
};
