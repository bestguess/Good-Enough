var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function(app, express){
  app.use(morgain('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('../client/index.html'));

  var usersRouter = express.Router();
  var messagesRouter = express.Router();

  require('./users/userRoutes.js');
  require('./messages/messagesRoutes.js');

  app.use('/app/users')(userRoutes);
  app.use('/app/messages')(messagesRoutes);

};