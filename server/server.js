var express = require('express');
var app = express();

var port = process.env.PORT || 4000;


// Server configuration in db_interface
require('./db_interface.js')(app, express);

app.listen(port, function(){
  console.log('Listening on port %s', port);
});