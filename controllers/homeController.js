var User = require('../models/user');
var Game = require('../models/game');
var async = require('async');

var title = 'PowWow';

var get_user = function (user_id, callback) {
  if (user_id) {
    User.findById(user_id, function (err, user) {
      if (err) { return next(err); }
      console.log('success');
      callback(null, user);
    });
  }
};

var get_games = function (callback) {
  Game.find().exec(callback);
}

exports.home_get = function (req, res, next) {
  res.render('home', { title: 'Games home' });
};
