$(function () {
      socket = io.connect('http://localhost:3000', { query: document.cookie});

	$("#btn_rock").click(function() {
	    socket_send('throw',{'throw': 'rock'});
         });

function throw_paper(){
	socket_send('throw',{'throw': 'paper'});
}

function throw_scissors(){
	socket_send('throw',{'throw': 'scissors'});
}
function socket_send(command, data){
    //var socket = io.connect('http://localhost:3000/'+document.cookie['user_id']);
    socket.emit(command,data);
    //socket.on('connect', function(data) {
    //    socket.emit('join', 'Hello World from client');
    //});
}
});
