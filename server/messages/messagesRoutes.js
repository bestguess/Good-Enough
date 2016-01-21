var messagesController = require('./messagesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.post('/get', messagesController.getConvo);
  app.post('/send', messagesController.send);
};
