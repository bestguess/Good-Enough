var fs = require('fs');
var db = require('../db_config.js');
var Token = db.Token;

module.exports = {
  convertPhoto : function(photo,email){
    var decodedImage = new Buffer(photo
    .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    var fileLocation = "./server/uploads/" + email.replace("@","").replace(".","") + ".jpeg";
    fs.writeFile(fileLocation, decodedImage, function(err) {
      if (err) console.error(err);
    });
    return fileLocation;
  },

  // Authentication check
  isLoggedIn : function(req, res, next) {
    var userToken = localStorage.getItem("token");
    var userId = localStorage.getItem("id");
    Token.findOne({token: userToken, user_id: userId}, function(err, token){
      if(err){
        res.status(500).send();
      }else if(!token){
        res.status(401).send().redirect('/');
      }else{
        return next(req);
      }
    })
  }
};
