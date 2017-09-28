var User = require('../models/user');
var Game = require('../models/game');
var async = require('async');

var title = 'PowWow';

var get_game = function(game_id, callback){
  Game.findById( game_id, function(err, game) {
    if(err){ return next(err); }
    callback(null, game);
  });
};

exports.game_get = function(req, res, next){
  async.series({
    game: function(callback){
      get_game(req.params.id,callback);
    },
  },function(err, results){
      console.log(results.game.name);
      res.render('game', {game: results.game});
  });
};

exports.game_create_get = function(req, res, next){
      console.log('create GAME');
      res.render('game_create', {title: title});
};

exports.game_create_post = function(req, res, next){
  var game = new Game({ name: 'hitler',
                      status: 'PreGame'});
  game.save(function(err){
    if(err) { return next(err); }
    res.redirect('/');
  }); 
};
