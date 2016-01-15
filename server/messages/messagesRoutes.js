var messagesController = require('./messagesController.js');

module.exports = function(app) {
  app.post('/new', messagesController.startConvo);
  app.get('/list', messagesController.getConvo);
  app.post('/reply', messagesController.reply);
  app.get('/messages', messagesController.getMessages)
};