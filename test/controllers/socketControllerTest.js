var assert = require('assert');

var socketController = require('../../controllers/socketController');
debug_mode = true;

var create_test_client = function(game_id, user_id, socket_id){
	var client = {};
	client.handshake = {};
	client.handshake.headers = {};
	client.handshake.headers.cookie = 'user_id='+user_id+'; io='+socket_id;
	client.handshake.headers.referer = game_id+'/?user_id='+user_id;
	client.on = function(message, handler) {};
	client.emit = function(message, data) {};
	return client;
};

describe('socketController', function() {
  describe('#socket_connection_connectNewUser()', function() {
    it('should return new socketID', function() {
	var game_id = 'game1', user_id = 'yyyyyyyyyyy', socket_id = 'lu1SAeXi_XGeKFAlAAAA';
	var test_client = create_test_client(game_id, user_id, socket_id);
	var socket_test_id = socketController.connect_client(test_client);
	assert.equal(socket_id,socket_test_id);
	socketController.disconnect_client(test_client);
    });
  });

  describe('#socket_connection_connectExistingUser()', function () {
    it('should return only one user exists', function() {
	var socketController = require('../../controllers/socketController');
	var game_id = 'game1', user_id = 'yyyyyyyyyyy', socket_id = 'lu1SAeXi_XGeKFAlAAAA';
	var test_client = create_test_client(game_id, user_id, socket_id);
	var socket_test_id = socketController.connect_client(test_client);
	var socket_test_id2 = socketController.connect_client(test_client);
	assert.equal(1,Object.keys(socketController.all_sockets).length);
	socketController.disconnect_client(test_client);
    });
  });

  describe('#socket_connection_disconnectUser()', function() {
    it('should return one user when the second disconnects', function() {
	var game_id = 'game1', user_id = 'yyyyyyyyyy', socket_id = 'lu1SAeXi_XGeKFAlAAAA';
	var test_client = create_test_client(game_id, user_id, socket_id);
	var game_id2 = 'game1', user_id2 = 'xxxxxxxxxxxxx', socket_id2 = 'lu1DAeXi_XGeKFAlAAAA';
	var test_client = create_test_client(game_id, user_id, socket_id);
	var test_client2 = create_test_client(game_id2, user_id2, socket_id2);
	var socket_test_id = socketController.connect_client(test_client);
	var socket_test_id2 = socketController.connect_client(test_client2);
	socketController.disconnect_client(test_client2);
	assert.equal(1,Object.keys(socketController.all_sockets).length);
	socketController.disconnect_client(test_client);
    });
  });
});
