var User = require('../models/user');
var Game = require('../models/game');
var async = require('async');

var title = 'PowWow';

exports.game_list_get = function (req, res, next) {
  Game.find({}, function(err, games) {
    res.render('game_list', {games: games});
  })
};

exports.game_get = function(req, res, next){
  var game_id = req.params.id;
  var user_id = req.cookies['user_id'];

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
      User.findById(user_id, function(err, user) {
        if(err){ return next(err); }
        callback(null, user);
      });
    }
  },
    function(err, results){
      var is_in_user_list = results.game.user_list.filter(function (user) {
        return (user._id.toString() == results.user._id.toString());
      }).length > 0; 
      console.log(is_in_user_list);
      if(!is_in_user_list) {
        results.game.user_list.push(results.user); 
        results.game.save();
        console.log(results.game.user_list);
      }
      
      //results.game.populate('user_list').exec( function (err, game) {
        res.render('game', {game: results.game});
      //});
    }
  );
};

exports.game_create_get = function(req, res, next){
  res.render('game_create', {title: title});
};

exports.game_create_post = function (req, res, next) {
  var game = new Game({
    name: 'hitler',
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
