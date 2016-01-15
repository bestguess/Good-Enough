var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

var port = process.env.PORT || 4000;


  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('../client/index.html'));

  var usersRouter = express.Router();
  var messagesRouter = express.Router();
  require('./users/usersRoutes.js')(app);
  require('./messages/messagesRoutes.js')(app);

  // app.use('/app/users')(usersRouter);
  // app.use('/app/messages')(messagesRouter);

  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  })

app.listen(port, function(){
  console.log('Listening on port %s', port);
});