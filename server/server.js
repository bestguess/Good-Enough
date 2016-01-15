var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config')
var compiler = webpack(config)

var port = process.env.PORT || 4000;


  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('../client/index.html'));

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))

  var usersRouter = express.Router();
  var messagesRouter = express.Router();
  require('./users/usersRoutes.js')(usersRouter);
  require('./messages/messagesRoutes.js')(messagesRouter);

  // app.use('/app/users')(usersRouter);
  // app.use('/app/messages')(messagesRouter);

  app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname + '/../client/index.html'));
  })

app.listen(port, function(error){
  (error) ? console.error(error) : console.log('Listening on port %s', port);
});