var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('../client/index.html'));
  var usersRouter = express.Router();
  var messagesRouter = express.Router();
  //require('./users/usersRoutes.js');
  //require('./messages/messagesRoutes.js');

  //app.use('/app/users')(userRoutes);
  //app.use('/app/messages')(messagesRoutes);
  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  })
};