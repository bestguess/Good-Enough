var messagesController = require('./messages/messagesController');

module.exports = function(app) {
  app.post('/new', messageController.startConvo);
  app.get('/list', messageController.getConvo);
  app.post('/reply', messageController.reply);
  app.get('/messages', messageController.getMessages)
};