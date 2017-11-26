
//var default_game_type = 'ticTacToe'; 
var default_game_type = 'secretHitler';

module.exports = function powwow_game(game_id){

	var game_type = default_game_type //TODO: Lookup game type
	var game = require('../models/'+game_type);
	game = new game(game_id);

	this.game_type = game_type;
	this.game_id = game_id;

	this.addPlayer = function(player_id){ game.addPlayer(player_id) };
	this.removePlayer = function(player_id) { game.removePlayer(player_id) };

	this.socketMessages = game.socketMessages;
	this.socketHandlers = game.socketHandlers;

};
