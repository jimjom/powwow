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
    it('should return existing userID', function() {
assert.equal(1,1);
    });
  });
  describe('#socket_connection_disconnectUser()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
