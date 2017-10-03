var players = [];
players.count = 0;
exports.socket_connection = function(client) {

    var user_id = client.handshake.query.user_id;
    user_id = user_id.substring(3,user_id.length - 1);
    console.log(user_id);

    if(players[user_id] === undefined){
	players[user_id] = client;
	players.count=players.count+1;
    }
    client.on('throw', function(data) {
	//console.log(client);
	console.log(players.count);
    });
};
