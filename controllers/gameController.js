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

var log_in_user = function(game_id, user_id, log_in_user_callback){
  async.parallel({
    game: function(callback){
      Game.findById(game_id, function(err, game) {
        if(err){ return next(err); }
        console.log('game found' + game._id);
        callback(null, game);
      });
    },
    user: function(callback){
      User.findById(user_id, function(err, user) {
        if(err){ return next(err); }
        console.log('user found' + user.userName);
        callback(null, user);
      });
    },
    function(err, results){
      console.log(results);
      //console.log('user: '+results.user.userName);
      //results.game.user_list.push(results.user);
    }
  });
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
      console.log(results);
      var is_in_user_list = results.game.user_list.filter(function (user) {
        return user.id = results.user._id;
      }).length > 0;  
      console.log(is_in_user_list);
      console.log(results.game.user_list.indexOf(results.user._id));
      if(!is_in_user_list) {
        results.game.user_list.push(results.user); 
        results.game.save();
      }
      
      //results.game.populate('user_list').exec( function (err, game) {
        res.render('game', {game: results.game});
      //});
    }
  );
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
