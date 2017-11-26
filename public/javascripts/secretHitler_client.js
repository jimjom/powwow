$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return (results == null) || results[1];
};

$(function() {
	
	var log_callback = function(data){
	   $('#div_log').append($("<p>").text(data));
	};
        
	var get_user_name = function() {
		return window.location.pathname.split('/')[2];
	};

	var get_user_id = function() {
		return $.urlParam('user_id');
	};
	
	var user_id = get_user_id();
	var user_name = get_user_name();

	socket = io.connect('http://localhost:3000');
	socket.on("log", log_callback);

	$("#btn_start").click( function(){
		socket.emit('start_game', {'user_id':user_id});
	});
});
