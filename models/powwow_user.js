
var get_user_id = function(socket){
  var referer = socket.handshake.headers.referer;
  var indexOfUserID = referer.lastIndexOf('user_id=');
  return (indexOfUserID > 0) ? referer.substr(indexOfUserID + 8) : undefined;
};

var get_user_name = function(user_id){
	return "Bob "+user_id;
};

var get_game_id = function(socket) {
  var full_url = socket.handshake.headers.referer.substr(socket.handshake.headers.referer.lastIndexOf('/') + 1);
  return (full_url.lastIndexOf('?') > 0) ? full_url.split('?')[0] : full_url;
};

var get_socket_id = function(socket){
  var cookie = socket.handshake.headers.cookie;
  var ioIndex = cookie.indexOf('io=');
  return cookie.substring(ioIndex+3).trim();
};

module.exports = function powwow_user(socket){
	
	this.user_id = get_user_id(socket);
	this.user_name = get_user_name(this.user_id);
	this.game_id = get_game_id(socket);
	this.socket_id = get_socket_id(socket);
};
