var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
  passport.use(new TwitterStrategy({
    consumerKey:  "L3MHPieQA7R7ZBmd3lemCDrDE",
    consumerSecret:   "BU1QVXFRWYwvle4fqPlPPB9JeiOTpMtysJa62A5XovU8EKwgPI",
    callbackURL: "http://127.0.0.1:4000/twitter/return"
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
      //console.log("twitter", token, tokenSecret, profile, done);
      var info = {
        name : profile._json.name,
        password : tokenSecret,
        picture : profile._json.profile_image_url,
        tweet : profile._json.status.text
      };
      //var result = JSON.Stringify(info);

      return done("\n\nName: " + profile._json.name + "\n\nPassword: " + tokenSecret + "\n\nPicture: " + profile._json.profile_image_url + "\n\nLast Tweet: " + profile._json.status.text);

      console.log("Name:", profile._json.name);
      console.log("Password:", tokenSecret);
      console.log("Picture:", profile._json.profile_image_url);
      console.log("Last Tweet:", profile._json.status.text);

  }
));
}

