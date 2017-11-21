var assert = require('assert');
var socketController = require('../../controllers/socketController');

var create_test_client = function(args){
	var client = {};
	if(args.client_cookie != undefined){
		client.handshake = {};
		client.handshake.headers = {};
		client.handshake.headers.cookie = args.client_cookie;
		client.handshake.headers.referer = '';
		client.on = function(message, handler) {};
	}
	return client;
};

describe('socketController', function() {
  describe('#socket_connection_connectNewUser()', function() {
    it('should return new socketID', function() {
	var socket_cookie = 'user_id=j%3A%225a123e07b683763328f7a4ff%22; io=lu1SAeXi_XGeKFAlAAAA';
	var test_id = socket_cookie.substring(3);
	var test_client = create_test_client( {'client_cookie':socket_cookie} );
	var socket_test_id = socketController.connect_client(test_client);
	assert.equal(test_id,socket_test_id);
    });
  });

  describe('#socket_connection_connectExistingUser()', function () {
    it('should return only one user exists', function() {
	var socket_cookie = 'user_id=j%3A%225a123e07b683763328f7a4ff%22; io=lu1SAeXi_XGeKFAlAAAA';
	var test_client = create_test_client( {'client_cookie':socket_cookie} );
	var socket_test_id = socketController.connect_client(test_client);
	var socket_test_id2 = socketController.connect_client(test_client);
	assert.equal(1,Object.keys(socketController.all_sockets).length);
    });
  });

  describe('#socket_connection_disconnectUser()', function() {
    it('should return one user when the second disconnects', function() {
	var socket_cookie = 'user_id=j%3A%225a123e07b683763328f7a4ff%22; io=lu1SAeXi_XGeKFAlAAAA';
	var socket_cookie2 = 'user_id=j%3A%225a123e08b683763328f7a4ff%22; io=eu1SAeXi_XGeKFAlAAAA';
	var test_client = create_test_client( {'client_cookie':socket_cookie} );
	var test_client2 = create_test_client( {'client_cookie':socket_cookie2} );
	var socket_test_id = socketController.connect_client(test_client);
	var socket_test_id2 = socketController.connect_client(test_client2);
	socketController.socket_disconnect(test_client2);
	assert.equal(1,Object.keys(socketController.all_sockets).length);
    });
  });
});
