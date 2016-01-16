var express = require('express');
var app = express();

var passport = require('passport');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);

var port = process.env.PORT || 4000;

// require('./config/passport')(passport);


  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '15mb'}));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/../'));

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

  app.use(session({secret: 'joshkeepstalkingaboutfood'}));
  app.use(passport.initialize());
  app.use(passport.session());

  var usersRouter = express.Router();
  var messagesRouter = express.Router();

  require('./users/usersRoutes.js')(usersRouter, passport);
  require('./messages/messagesRoutes.js')(messagesRouter, passport);

  app.use('/app/users', usersRouter);
  app.use('/app/messages', messagesRouter);

  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  });

  app.post('/test',function(req,res,next){
    console.log(req.body)
    var text = { hello: 'hank' }
    res.status(200).send(text);
  });

app.listen(port, function(error){
  return (error) ? console.error(error) : console.log('Listening on port %s', port);
});