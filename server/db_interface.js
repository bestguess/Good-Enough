var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('../client/index.html'));

  //var usersRouter = express.Router();
  var messagesRouter = express.Router();

  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  })

  //require('./users/usersRoutes.js')(usersRouter);
  require('./messages/messagesRoutes.js')(messagesRouter);

  app.use('/app/messages')(messagesRouter);
  //app.use('/app/users')(userRoutes);

  app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/../' + req.url));
  });

};