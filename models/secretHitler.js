var socketController = require('../controllers/socketController');
var async = require('async');

var User;
if(debug_mode){
	User = require('../test/models/mockUserModel');
}else{
	User = require('./user');
}

var MIN_PLAYERS = 5;

module.exports = function secretHitler(game_id){

	var secretHitler = this;

	this.game_id = game_id;
	this.socketHandlers = {};

	this.players = [];
	this.players_internal = {};

	this.all_players_ready = function(){

		var result = true;	
		Object.keys(this.players_internal).forEach(function (user_id){
			result = result && secretHitler.players_internal[user_id].isReady;
		});
		return result;
	};

	this.getPlayerList = function(user_id,callback) {
		var result = {};
		User.find({ '_id': { $in: secretHitler.players}}, function(err, users) {

			users.forEach(function(user) {
				//console.log(user._id);
				result[user._id] = user;
			});
			callback(user_id, 'player_list', result);
		});
	};

	this.addPlayer = function(user_id){
      		async.series([
		   function (callback){  //Lookup user by user_id
			User.findById(user_id)
				 .exec(function (err, user){
					if(!secretHitler.players.includes(user.user_id.toString())){
						secretHitler.players.push(user.user_id.toString());
						secretHitler.players_internal[user.user_id]= { 'isReady': user.isReady };
					}
					secretHitler.players_internal[user.user_id].isReady = user.isReady;
					callback(null,user);
				 });
		}, function (callback){ //Send players to user_id
			secretHitler.getPlayerList(
				user_id, socketController.message
			);
			callback(null, true);
		}],
		function(err, results){ //Broadcast join to other players
			socketController.broadcast('player_added',results[0]);
		});
	};

	this.removePlayer = function(player_id){
		var index = secretHitler.players.indexOf(player_id)
		
		if(index > 0){
			secretHitler.players.splice(index, 1);
			setTimeout(secretHitler.broadcast_player_removed,3000,player_id);
		}
	};

	this.broadcast_player_removed = function (user_id){ //Only call if the player is gone after 3 seconds
		if(!secretHitler.players.includes(user_id)){
			socketController.broadcast('player_removed', {'user_id':user_id});
		}
	};

	this.getPlayerRolesMessage = function (player_id){
		var result = {};
		result.role = this.players_internal[player_id].role;
		if(result.role == 'facist'){
		  result.role_facists = [];
		  Object.keys(this.players_internal).forEach(function (player_id){
		    if(secretHitler.players_internal[player_id].role == 'hitler'){
                      result.role_hitler = player_id;
		    };
		    if(secretHitler.players_internal[player_id].role == 'hitler'){
		      result.role_facists.push(player_id);
		    }
		  });
		}
		return result;
	};

	this.startGame = function(){
		var all_players = this.players;

		//Verify correct number of players
		if(Object.keys(this.players).length < MIN_PLAYERS) return false;

		//Verify all players ready
		if(!this.all_players_ready()) return false;

		var roleAssigner = require('./secretHitlerGame/roleAssigner');
		roleAssigner.generate(this.players_internal);

		//Emit user role messages
		this.players.forEach(function (player_id){
			socketController.message(player_id, 'player_role_assigned', secretHitler.getPlayerRolesMessage(player_id));
                });

		return true;
	};

	this.socketHandlers['player_ready'] = function(data){
		User.update({ _id: data.user_id}, { $set: { isReady: data.isReady}},function(){
		   secretHitler.players_internal[data.user_id].isReady = data.isReady;
		   socketController.broadcast('player_update', {_id:data.user_id, isReady: data.isReady}); 
		});
	};

	this.socketHandlers['start_game'] = function(data){
		console.log(secretHitler.startGame());
	};
};
