var powwow_game = require("../models/powwow_game");

var all_games = {};
var all_sockets = {};

var get_socket_id = function(client) {
  return client.handshake.headers.cookie.substring(3);
};

var get_game_id = function(client){
  return client.handshake.headers.referer.substr(client.handshake.headers.referer.lastIndexOf('/') + 1);
};

exports.socket_connection = function(client) {
  exports.connect_client(client);
};


exports.connect_client = function(client) {
    var socket_id = get_socket_id(client);
    var game_id = get_game_id(client);

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

    return socket_id;
};
