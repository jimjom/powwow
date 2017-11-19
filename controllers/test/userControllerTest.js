var User = require('../../models/user');
var Game = require('../../models/game');
var async = require('async');

var title = 'PowWow';

exports.game_test_get = function (req, res, next){
  var game_id = req.params.id;
  var user_id = req.cookies['user_id'];

  res.render('game', {});// {game: results.game});
};

