var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config')
var compiler = webpack(config)

var express = require('express');
var app = express();

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))

var port = process.env.PORT || 4000;


// Server configuration in db_interface
require('./db_interface.js')(app, express);

app.listen(port, function(error){
	(error) ? console.error(error) : console.log('Listening on port %s', port);
});