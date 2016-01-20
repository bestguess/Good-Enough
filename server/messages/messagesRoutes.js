var messagesController = require('./messagesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.post('/new', messagesController.startConvo);
  app.post('/list', messagesController.getConvo);
  app.post('/reply', messagesController.reply);
  app.post('/messages', messagesController.getMessages);
};