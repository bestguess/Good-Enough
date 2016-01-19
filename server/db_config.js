var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.connect(***REMOVED***);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log('Connected to MongoDB');
});

var usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: [Number],
  gender: String,
  city: String,
  interests: String,
  type: String,
  personality: String,
  picture: String,
  places: [String],
  matches: [String],
  conversations: [Schema.Types.ObjectId],
  meet: [String]
});

var messagesSchema = new Schema({
  users: [],
  messages: []
});

var authSchema = new Schema({
  user_id: String,
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

var tokenSchema = new Schema({
  user_id: String,
  token: String,
  dateCreated: String
});

// Generates a hash
authSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checks to see if the password is valid
authSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

var Users = mongoose.model('User', usersSchema);
var Messages = mongoose.model('Message', messagesSchema);
var Auth = mongoose.model('Auth', authSchema);
var Token = mongoose.model('Token', tokenSchema);

module.exports.Users = Users;
module.exports.Messages = Messages;
module.exports.Auth = Auth;
module.exports.Token = Token;
module.exports.db = db;