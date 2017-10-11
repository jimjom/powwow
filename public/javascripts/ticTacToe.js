$(function() {
	
	var move_callback = function(data){
	   $('#div_log').append($("<p>").text(data));
	};
        
	var get_game_id = function() {
		return window.location.pathname.split('/')[2];
	};

	var get_user_id = function() {
		return document.cookie.substring(15,39);
	};
	

	var game_id = get_game_id();
	var user_id = get_user_id();

	socket = io.connect('http://localhost:3000');
	socket.on("move", move_callback);

	move_callback('game_id '+get_game_id());
	move_callback('player_id '+get_user_id());
	
	$("#btn_rock").click( function(){
		socket.emit('throw', {'user_id':user_id,'move':'rock'});
	});
	$("#btn_paper").click( function(){
		socket.emit('throw', {'user_id':user_id,'move':'paper'});
	});
	$("#btn_scissors").click( function(){
		socket.emit('throw', {'user_id':user_id,'move':'scissors'});
	});
});
