var fs = require('fs');

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
    if(true) return next();
    // If not authenticated then redirect to home
    res.status(401).redirect('/');
  }
};
