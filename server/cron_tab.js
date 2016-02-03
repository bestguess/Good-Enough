var db = require('./db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var match = require('./helpers/matching_algo.js');

var CronJob = require('cron').CronJob;

// Rematches all users in order to incorporated any changes to interests or poll answers
var reMatch = new CronJob('00 00 0-23/2 1-31 0-11 0-6', function() {
  console.log('recalculating matches via cron');
  User.find({}, function(err, users){
      users.forEach(function(user){
        match.user(user, function (data){
          data.sort(function(a,b){ return b.score-a.score; });
          User.update({_id: user._id},{matches:data},function(err, user){
            if(err) console.log(err);
          });
        });
      });
      console.log(`
╥━━━━━━━━╭━━╮━━┳
╢╭╮╭━━━━━┫┃▋▋━▅┣
╢┃╰┫┈┈┈┈┈┃┃┈┈╰┫┣
╢╰━┫┈┈┈┈┈╰╯╰┳━╯┣
╢┊┊┃┏┳┳━━┓┏┳┫┊┊┣
╨━━┗┛┗┛━━┗┛┗┛━━┻
            `);
    });
}, function(){console.log('match recalculations completed via cron')}, true, 'America/Chicago');

var demoReset = new CronJob('00 00 0-23 1-31 0-11 0-6', function(){
  console.log('resetting demo user data via cron');
  User.find({})
})

// Run the reMatch cron job
reMatch.start();