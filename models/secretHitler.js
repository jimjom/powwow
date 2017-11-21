module.exports = function secretHitler(game_id){

	var secretHitler = this;

	this.game_id = game_id;
	this.socketHandlers = [];

	this.players = {};

	this.addPlayer = function(player_id, player_name){
		this.players[player_id] = player_name;
		console.log(this.players);
	};

	this.removePlayer = function(player_id){
		delete this.players[player_id];
	};

	this.socketHandlers['client_Connect'] = function(data){
		secretHitler.addPlayer(data.user_id, data.user_name);
	};
	this.socketHandlers['client_Disconnect'] = function(data){
		secretHitler.removePlayer(data.user_name);
	};	
};
