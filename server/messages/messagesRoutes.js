var messagesController = require('./messagesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app, passport) {
  app.post('/new', messagesController.startConvo);
  app.post('/list', helpers.isLoggedIn, messagesController.getConvo);
  // app.post('/list', messagesController.getConvo);
  app.post('/reply', messagesController.reply);
  app.post('/messages', helpers.isLoggedIn, messagesController.getMessages);
  // app.post('/messages', messagesController.getMessages);
};