var ticTacToe = require("../models/ticTacToeGame");

var all_games = {};
var all_clients = {};


exports.socket_connection = function(client) {

    var user_id = client.handshake.headers.cookie.substring(15,37);
    var game_id = client.handshake.headers.referer.split('/')[4];

    var game = all_games.game_id;
    if(game === undefined){
    	game = new ticTacToe(game_id);
    } 
    if(all_clients.user_id === undefined){
        all_clients.user_id = client;
    }

    game.addPlayer(user_id);

    client.emit('move', user_id + ' joined');
    var move_callback = function(move){
	client.emit('move', move);
    };

    client.on('throw', function(move) {
	console.log(move);
	game.move(user_id, move, move_callback);
    });
};
