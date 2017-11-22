$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return (results == null) || results[1];
};

$(function() {
	
	var log_callback = function(data){
	   $('#div_log').append($("<p>").text(data));
	};
        
	var get_game_id = function() {
		return window.location.pathname.split('/')[2];
	};

	var game_id = get_game_id();

	socket = io.connect('http://localhost:3000');
	socket.on("log", log_callback);

});
