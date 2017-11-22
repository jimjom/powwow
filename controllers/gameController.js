var User = require('../models/user');
var Game = require('../models/game');
var async = require('async');

var title = 'PowWow';

exports.game_list_get = function (req, res, next) {
  Game.find({}, function(err, games) {
    var user_id = req.cookies['user_id'];
    res.render('game_list', {games: games, user_id: user_id});
  })
};

exports.game_get = function(req, res, next){
  var game_id = req.params.id;
  var user_id = req.query.user_id;

  async.parallel({
    game: function(callback){
      Game.findById(game_id)
          .populate('user_list', 'userName')
          .exec( function(err, found_game) {
        if(err){ return next(err); }
        callback(null, found_game);
      });
    },
    user: function(callback){
      if(user_id !== undefined){
      User.findById(user_id, function(err, user) {
        if(err){ return next(err); }
        callback(null, user);
        });
      }else{
	callback(null, undefined);
      }
    }
  },
    function(err, results){
      var game = results.game;
      var user = results.user;

      if(user === undefined){
        res.render(game.name+'_board', {game: game});
      }
      else{

        var user_is_in_game = game.user_list.filter(function (user) {
          return (user._id.toString() == user._id.toString());
        }).length > 0; 

        if(!user_is_in_game) {
          results.game.user_list.push(results.user); 
          results.game.save();
        }

	res.render(game.name+'_client', {game:game, user:user});
      }
    }
  );
};

exports.game_create_get = function(req, res, next){
  res.render('game_create', {title: title});
};

exports.game_create_post = function (req, res, next) {
  var game = new Game({
    name: 'powwow_SecretHitler',
    status: 'PreGame'
  });
  game.save(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

exports.game_delete_post = function (req, res, next) {
  console.log(req.params.id);
  Game.findByIdAndRemove(req.params.id, function(err, removeRes) {
    if(err) {
      return next(err);
    }
    res.redirect('/game');
  })
};
