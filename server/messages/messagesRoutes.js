var messagesController = require('./messagesController.js');

module.exports = function(app,express) {
  app.post('/new', messagesController.startConvo);
  app.post('/list', messagesController.getConvo);
  app.post('/reply', messagesController.reply);
  app.post('/messages', messagesController.getMessages)
};