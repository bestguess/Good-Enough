module.exports = {
  convert : function(photo,email){
    var decodedImage = new Buffer(req.body.data
    .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    var fileLoc = "./server/uploads/" + email.replace("@",".") + ".jpeg";
  }
};
