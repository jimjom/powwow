var powwow_game = require("../models/powwow_game");

var all_games = {};
var all_sockets = {};
//var all_clients = {};

exports.socket_connection = function(client) {

    var socket_id = client.handshake.headers.cookie.substring(3);
    var game_id = client.handshake.headers.referer.substr(client.handshake.headers.referer.lastIndexOf('/') + 1);

    //var user_id = client.handshake.headers.cookie.substring(15,39);
    //var game_id = client.handshake.headers.referer.split('/')[4];

    var game = all_games.game_id;
    if(game === undefined){
    	game = new powwow_game(game_id);
	all_games.game_id = game;
    } 

    if(all_sockets.socket_id === undefined){
        all_sockets.socket_id = client;
    }

    Object.keys(game.socketHandlers).forEach(function(message){
        client.on(message, game.socketHandlers[message]);
    });
    //game.socketMessages.forEach(function(message){
    //	client.on(message, game.socketHandlers[message]);
    //});
};
