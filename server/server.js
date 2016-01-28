var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);

var port = process.env.PORT || 4000;

  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '25mb'}));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/../'));

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

  server = app.listen(port, function(error){
    return (error) ? console.error(error) : console.log('Listening on port %s', port);
  });
  var io = require('socket.io')(server);

  var usersRouter = express.Router();
  var messagesRouter = express.Router();
  var matchesRouter = express.Router();
  var pollingRouter = express.Router();

  require('./users/usersRoutes.js')(usersRouter);
  require('./messages/messagesRoutes.js')(messagesRouter);
  require('./matches/matchesRoutes.js')(matchesRouter);
  require('./polling/pollingRoutes.js')(pollingRouter);

  app.use('/app/users', usersRouter);
  app.use('/app/messages', messagesRouter);
  app.use('/app/matches', matchesRouter);
  app.use('/app/polling', pollingRouter);

  app.get('/client',function(req,res,next){
    res.sendFile(path.join(__dirname + req.url));
  });

  app.get('/picture/:pic',function(req,res,next){
    res.sendFile(path.join(__dirname + '/uploads/' + req.params.pic));
  });

  app.get('/modules/*',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../node_modules/' + req.url.substring(8)));
  });

  // app.post('/socket',function(req,res,next){
  //   io.sockets.emit("socket", req.body);
  //   res.send({});
  // });

  io.on('connection', function (socket) {
    console.log('New client connected!');
    
    socket.on('fetchComments', function () {
      console.log('New client connected!');
    });

    socket.on('newComment', function (comment, callback) {
      console.log('New comment!');
    });
  });

  app.get('/*',function(req,res,next){
    res.sendFile(path.join(path.resolve(__dirname + '/../client/index.html')));
  });


