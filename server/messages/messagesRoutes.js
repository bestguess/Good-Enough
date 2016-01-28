var messagesController = require('./messagesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.post('/*', helpers.isLoggedIn);
  app.post('/get', messagesController.getConvo);
  app.post('/send', messagesController.send);
  app.post('/delete', messagesController.delete);
};
