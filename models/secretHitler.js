var socketController = require('../controllers/socketController');
var debug = require('../test/debug');

var User;
if(debug_mode){
	User = require('../test/models/mockUserModel');
}else{
	User = require('./user');
}

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
var MIN_PLAYERS = 5;

module.exports = function secretHitler(game_id){

	var secretHitler = this;

	this.game_id = game_id;
	this.socketHandlers = {};

	this.players = {};

	this.addPlayer = function(player_id){
      		User.findById(player_id)
				 .exec(function (err, user){
					secretHitler.players[player_id] = user;
					socketController.broadcast('log', 'player '+user.userName+' joined');
				 });
	};

	this.removePlayer = function(player_id){
		var user = this.players[player_id];

		socketController.broadcast('log', 'player '+user.userName+' left');
		delete this.players[player_id];
	};

	this.startGame = function(){
		socketController.broadcast('log', 'GAME STARTED');
		//Verify correct number of players
		if(Object.keys(this.players).length < MIN_PLAYERS) return false;

		var roleAssigner = require('./secretHitlerGame/roleAssigner');
		roleAssigner.generate(this.players);
		//console.log(roleAssigner.roleString(this.players));

		//Emit user role messages

		return true;
	};

	this.playerConfirmedAction = function(user_id){
		this.players[user_id].acknowledged = true;
	};

	this.socketHandlers['client_Connect'] = function(data){
		secretHitler.addPlayer(data.user_id, data.user_name);
	};
	this.socketHandlers['client_Disconnect'] = function(data){
		secretHitler.removePlayer(data.user_id);
	};	

	this.socketHandlers['start_game'] = function(data){
		secretHitler.startGame();
	};

	this.socketHandlers['acknowledged'] = function(data){
		secretHitler.playerConfirmedAction(data.user_id);
	};
};
