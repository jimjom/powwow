
/*$(function() {
  socket = io.connect('http://localhost:3000');
});
*/
app.controller('secretHitlerClientCtlr',function secretHitlerClientCtlr($scope, $location, socket) {

	$scope.users = {};
	$scope.current_user = {};
	$scope.current_user_id = ($location.absUrl().split('user_id=')[1]);
	$scope.game_phase = 'pregame';

	$scope.start_game = function(){
          socket.emit('start_game');
        };

	$scope.toggle_ready = function(){
		$scope.current_user.isReady = !$scope.current_user.isReady;
		socket.emit('player_ready', {'user_id':$scope.current_user_id,
					     'isReady':$scope.current_user.isReady});
	};

	var player_list_callback = function(data){
	   Object.keys(data).forEach(function (user_id){
		if(data[user_id].picture === undefined){
			data[user_id].picture ='../images/no_user.jpg';
		}
	   });
	   $scope.current_user = data[$scope.current_user_id];
	   delete data[$scope.current_user_id]; 
	   $scope.users = data;
        };

	var player_added_callback = function(data){
	   $scope.users[data._id] = data;
	};

	var player_removed_callback = function(data){
	   delete $scope.users[data.user_id]; 
	};

	var player_update_callback = function(data){
	  if($scope.users[data._id] !== undefined){
	    $scope.users[data._id].isReady = data.isReady;
	  }
	};

	var player_role_assigned_callback = function(data){
	    $scope.game_phase = 'confirm_role';
	    $scope.game_role = data.role;
	    if(data.role == 'hitler'){ $scope.game_role_picture = '../images/secret_hitler_1.jpg'; }
	    if(data.role == 'facist'){ $scope.game_role_picture = '../images/secret_facist_1.jpg'; }
	    if(data.role == 'liberal'){ $scope.game_role_picture = '../images/secret_liberal_1.jpg'; }
	    $scope.game_role_hitler = data.role_hitler;
	    $scope.game_role_facists = data.role_facists;
	};

	var log_callback = function(data){
	   $('#div_log').append($("<p>").text(data));
	};

	socket.on("log", log_callback);
	socket.on("player_list", player_list_callback);
	socket.on("player_added", player_added_callback);
	socket.on("player_removed", player_removed_callback);
	socket.on("player_update", player_update_callback);
	socket.on("player_role_assigned", player_role_assigned_callback);
});
