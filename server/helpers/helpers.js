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
    user = req.body;
    Token.findOne({token: user.token, user_id: user.id}, function(err, token){
      if(err){
        res.status(500).send();
      }else if(!token){
        console.log('failed to find token during isLoggedIn');
        res.status(401).send();
      }else{
        // res.status(200).send();
        return next();
      }
    })
  }
};
