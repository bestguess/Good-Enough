var pollingController = require('./pollingController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.post('/answer', pollingController.answer);
  app.post('/question', pollingController.postQuestion);
};
