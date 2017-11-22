var socketController = require('../controllers/socketController');

module.exports = function secretHitler(game_id){

	var secretHitler = this;

	this.game_id = game_id;
	this.socketHandlers = [];

	this.players = {};

	this.addPlayer = function(player_id, player_name){
		this.players[player_id] = player_name;

		socketController.broadcast('log', 'player '+player_id+' joined');
	};

	this.removePlayer = function(player_id){
		delete this.players[player_id];

		socketController.broadcast('log', 'player '+player_id+' left');
	};

	this.socketHandlers['client_Connect'] = function(data){
		secretHitler.addPlayer(data.user_id, data.user_name);
	};
	this.socketHandlers['client_Disconnect'] = function(data){
		secretHitler.removePlayer(data.user_id);
	};	
};
