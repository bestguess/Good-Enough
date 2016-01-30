var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://test:test@ds043615.mongolab.com:43615/guessts');

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
  connections: [],
  matches: [Schema.Types.Mixed],
  questions: [Schema.Types.Mixed],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  question: Number
});

var messagesSchema = new Schema({
  users: [],
  messages: []
});

var questionsSchema = new Schema({
  id: Number,
  question: String,
  answers: String,
  skip: Boolean
});

var tokenSchema = new Schema({
  user_id: String,
  token: String,
  dateCreated: String
});

var Users = mongoose.model('User', usersSchema);
var Messages = mongoose.model('Message', messagesSchema);
var Questions = mongoose.model('Questions', questionsSchema);
var Token = mongoose.model('Token', tokenSchema);

module.exports.Users = Users;
module.exports.Messages = Messages;
module.exports.Questions = Questions;
module.exports.Token = Token;
module.exports.db = db;
