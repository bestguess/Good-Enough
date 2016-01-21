var matchesController = require('./matchesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.post('/matches', helpers.isLoggedIn);
  app.post('/matches', matchesController.getMatch);
};