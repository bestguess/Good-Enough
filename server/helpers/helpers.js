var fs = require('fs');
var db = require('../db_config.js');
var Token = db.Token;

module.exports = {
  convertPhoto : function(photo,email){
    if(photo.slice(0,4) === "http") return photo;
    var decodedImage = new Buffer(photo
    .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    var fileName = email.replace("@","").replace(".","") + ".jpeg";
    var fileLocation = "./server/uploads/" + fileName;

    if (!fs.existsSync('./server/uploads/')) fs.mkdirSync('./server/uploads/');

    fs.writeFile(fileLocation, decodedImage, function(err) {
      if (err) console.error(err);
    });
    return "picture/" + fileName;
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
  },

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
      if(form === "signup") res.status(201).send({id: user._id, token: token.token});
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
    this.question = 'question';
  }
};
