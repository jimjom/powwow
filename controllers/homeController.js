var User = require('../models/user');
var Game = require('../models/game');
var async = require('async');

var title = 'PowWow';

var get_user = function(user_id, callback){
  if(user_id){
    User.findById( user_id, function(err, user) {
      if(err) { return next(err); }
      console.log('success');
      callback(null, user);
    });
  }
};

var get_games = function(callback){
  Game.find().exec(callback);
}

exports.home_get = function(req, res, next){
  async.parallel({
      user: function(callback) {
        get_user(req.cookies['user_id'], callback);
      },
      games: function(callback) {
        get_games(callback);
      },
    }, function(err, results) {
      if(err) { return next(err); }
      console.log('user_id: '+results.user.user_id);
      console.log('games:' + results.games);
      res.render('home', {title: title, user: results.user, games:results.games});
    });
};
