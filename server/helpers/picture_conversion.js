var fs = require('fs');

module.exports = {
  convert : function(photo,email){
    var decodedImage = new Buffer(photo
    .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    var fileLocation = "./server/uploads/" + email.replace("@","").replace(".","") + ".jpeg";
  
    fs.writeFile(fileLocation, decodedImage, function(err) {
      if (err) console.error(err);
    });

    return fileLocation;
  }
};
