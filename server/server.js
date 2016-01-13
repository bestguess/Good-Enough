var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Good Enough');
});

app.listen(4000, function(){
  console.log('Listening on port 4000');
});