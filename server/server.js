var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');


var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);

var port = process.env.PORT || 4000;

  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '15mb'}));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/../'));

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

  app.use(session({
    secret: 'joshkeepstalkingaboutfood',
    resave: true,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  var usersRouter = express.Router();
  var messagesRouter = express.Router();

  require('./users/usersRoutes.js')(usersRouter, passport);
  require('./messages/messagesRoutes.js')(messagesRouter);
  require('./config/passport')(passport);

  app.use('/app/users', usersRouter);
  app.use('/app/messages', messagesRouter);

  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  });

  app.get('/twitter/return', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
      function(req, res) {
      // Successful authentication, redirect home.
      console.log("twitter-return",req.body);
      res.redirect('/');
  });


  app.post('/test',function(req,res,next){
    console.log(req.body);
    var text = { hello: 'hank' };
    res.status(200).send(text);
  });

app.listen(port, function(error){
  return (error) ? console.error(error) : console.log('Listening on port %s', port);
});