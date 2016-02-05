var fs = require('fs');
var db = require('../db_config.js');
var Token = db.Token;
var im = require('imagemagick');
var path = require('path');

module.exports = {
  convertPhoto : function(photo,email,callback){
    // If photo is already on the web, Let's use their hosting instead :)
    if(photo.slice(0,4) === "http") return callback(photo);
    // if uploads folder doesn't exist, create it
    if (!fs.existsSync('./server/uploads/')) fs.mkdirSync('./server/uploads/');

    // decodes the base64 image sent from the client, sets the filename to the user's email address, and the file location
    var decodedImage = new Buffer(photo
    .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    var fileName = email.replace("@","").replace(".","") + "." + photo.match(/\/(.*?)\;/)[1];
    var fileLocation = "./server/uploads/" + fileName;

    // write the decoded image to the uploads folder
    fs.writeFile(fileLocation, decodedImage, function(err) {
      if (err) return console.error(err);
      // Crops and centers the image to play better with our css
      im.crop({
        srcPath: path.join(__dirname + "/../uploads/" + fileName),
        dstPath: path.join(__dirname + "/../uploads/cropped" + fileName),
        width: 400,
        height: 400,
        quality: 1,
        gravity: 'Center'
      }, function(err, stdout, stderr){
        if (err) return console.log(err);
        // Deletes the original file sent over to save space
        fs.unlink(fileLocation, function(err) {
           if (err) return console.error(err);
           else callback("picture/cropped" + fileName);
        });
      });
    });
  },

  // Authentication check
  isLoggedIn : function(req, res, next) {
    user = req.body;
    Token.findOne({token: user.token, user_id: user.id}, function(err, token){
      if(err){
        res.status(500).send();
      }else if(!token){
        res.status(401).send();
      }else{
        return next();
      }
    })
  },

  // Splits the birthday data into an array => [2006,03,12]
  splitDate : function(birthday){
    var bday = new Date(birthday);
    var month = bday.getMonth();
    var year = bday.getFullYear();
    var date = bday.getDate();
    return [year,month,date];
  },

  createToken : function(req,res,next,user,genToken,form){
    var newToken = Token({user_id: user._id, token: genToken(), dateCreated: new Date().getTime()});
    newToken.save(function(err, token){
      if(err){
        console.log('error saving token');
        res.status(500).send(err);
        return next();
      }
      // If no save error then send the user's new id and token
      if(form === "signup"){
        res.status(201).send({id: user._id, token: token.token});
        return next();
      }
      else res.status(200).send({id: user._id, token: token.token});

      next();
    });
  },

  genToken : function(){
    var rand = function() {return Math.random().toString(36).substr(2);};
    return rand() + rand();
  },

  UserData: function(){
    this.firstName = 'firstName';
    this.lastName = 'lastName';
    this.email = 'email';
    this.password = 'password';
    this.birthday = 'birthday';
    this.gender = 'gender';
    this.interests = 'interests';
    this.type = 'type';
    this.personality = 'personality';
    this.picture = 'picture';
    this.places = 'places';
    this.matches = 'matches';
  }
};
