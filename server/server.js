var express = require('express');
var app = express();
var cors = require('cors');

var session = require('express-session');
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
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(cookieParser());
  app.use(session({
    secret: 'session secret key',
    resave: true,
    saveUninitialized: true
  }));
  app.use(express.static(__dirname + '/../'));
  app.use(cors());

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  var usersRouter = express.Router();
  var messagesRouter = express.Router();
  var matchesRouter = express.Router();
  var pollingRouter = express.Router();
  var recoverPasswordRouter = express.Router();

  require('./users/usersRoutes.js')(usersRouter);
  require('./messages/messagesRoutes.js')(messagesRouter);
  require('./matches/matchesRoutes.js')(matchesRouter);
  require('./polling/pollingRoutes.js')(pollingRouter);
  require('./recoverPassword/recoverPasswordRoutes.js')(recoverPasswordRouter);

  app.use('/app/users', usersRouter);
  app.use('/app/messages', messagesRouter);
  app.use('/app/matches', matchesRouter);
  app.use('/app/polling', pollingRouter);
  app.use('/app/recoverPassword', recoverPasswordRouter);

  app.get('/client',function(req,res,next){
    res.sendFile(path.join(__dirname + req.url));
  });

  app.get('/picture/:pic',function(req,res,next){
    res.sendFile(path.join(__dirname + '/uploads/' + req.params.pic));
  });

  app.get('/modules/*',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../node_modules/' + req.url.substring(8)));
  });

  app.get('/*',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  });

  app.listen(port, function(error){
    return (error) ? console.error(error) : console.log('Listening on port %s', port);
  });
