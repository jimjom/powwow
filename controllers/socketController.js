var powwow_game = require("../models/powwow_game");
var powwow_user = require("../models/powwow_user");

var all_games = {};
var all_sockets = {};

exports.all_sockets = all_sockets;

exports.broadcast = function(message, data) {
	Object.keys(all_sockets).forEach(function(player_id){
		all_sockets[player_id].socket.emit(message,data);
	});
};

exports.message = function(player_id, message, data) {
	all_sockets[player_id].socket.emit(message,data);
};

exports.socket_connection_callback = function(socket_id){};
exports.socket_connection = function(client) {
  var socket_id = exports.connect_client(client);
  
  exports.socket_connection_callback(socket_id);
};

exports.socket_disconnect_callback = function(socket_id){};
exports.socket_disconnect = function() {
  var socket_id = exports.disconnect_client(this);
  
  exports.socket_disconnect_callback(socket_id);
}

exports.connect_client = function(client) {
    var user = new powwow_user(client);

    var game = all_games[user.game_id];
    if(game === undefined){
    	game = new powwow_game(user.game_id);
	all_games[user.game_id] = game;
	user.add_socket_handlers(game.socketHandlers);
    } 

    if(all_sockets[user.user_id] === undefined){
        all_sockets[user.user_id] = user;
    }

    client.on('disconnect', exports.socket_disconnect);

    return user.socket_id;
};

exports.disconnect_client = function(client) {
  var user = new powwow_user(client); //TODO: This is inefficient, make static function to get ID from client
  var socket_id = '';

  if(user !== undefined){
    socket_id = user.socket_id;
    delete all_sockets[user.user_id];
  }

  return socket_id;
};
