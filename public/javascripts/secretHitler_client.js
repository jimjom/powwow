$(function() {
	
	var move_callback = function(data){
	   $('#div_log').append($("<p>").text(data));
	};
        
	var get_user_name = function() {
		return window.location.pathname.split('/')[2];
	};

	var get_user_id = function() {
		return document.cookie.substring(15,39);
	};
	
	var user_id = get_user_id();
	var user_name = get_user_name();

	socket = io.connect('http://localhost:3000');
	socket.on("move", move_callback);

	move_callback('player_id '+get_user_id());
	
	$("#btn_connect").click( function(){
		socket.emit('client_Connect', {'user_id':user_id,'user_name':user_name});
	});
	$("#btn_disconnect").click( function(){
		socket.emit('client_Disconnect', {'user_id':user_id});
	});
});
