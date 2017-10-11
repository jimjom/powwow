var powwow_game = require("../models/powwow_game");

var all_games = {};
var all_clients = {};

exports.socket_connection = function(client) {

    var user_id = client.handshake.headers.cookie.substring(15,39);
    var game_id = client.handshake.headers.referer.split('/')[4];

    var game = all_games.game_id;
    if(game === undefined){
    	game = new powwow_game(game_id);
	all_games.game_id = game;
    } 

    if(all_clients.user_id === undefined){
        all_clients.user_id = client;
    }

    game.addPlayer(user_id, client);

    Object.keys(game.socketHandlers).forEach(function(message){
        client.on(message, game.socketHandlers[message]);
    });
    //game.socketMessages.forEach(function(message){
    //	client.on(message, game.socketHandlers[message]);
    //});
};
