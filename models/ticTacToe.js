module.exports = function ticTacToe(game_id){
	
	var ticTacToe = this;
	this.game_id = game_id;
	this.socketHandlers =[];
	
	this.player_1_id = '';
	this.player_1_move = '';
	this.player_1_client;
	
	this.player_2_id = '';
	this.player_2_move = '';
	this.player_2_client;
	
	this.addPlayer = function (player_id, client){
		if(this.player_1_id == player_id) { return;}
		if(this.player_1_id === ''){
			this.player_1_id = player_id;
			this.player_1_client = client;
		}else if (this.player_2_id === ''){
			this.player_2_id = player_id;
			this.player_2_client = client;
		}
	};
	
	this.checkWinner = function(){
		if( (this.player_1_move === 'rock' && this.player_2_move === 'scissors') ||
            (this.player_1_move === 'paper' && this.player_2_move === 'rock') ||
			(this.player_1_move === 'scissors' && this.player_2_move === 'paper')	) { return this.player_1_id; }
		if( (this.player_2_move === 'rock' && this.player_1_move === 'scissors') ||
            (this.player_2_move === 'paper' && this.player_1_move === 'rock') ||
			(this.player_2_move === 'scissors' && this.player_1_move === 'paper')	) { return this.player_2_id; }
		return undefined;
	};
	
	this.move = function(player_id, move, callback){
		var response;
		if(this.player_1_id === player_id){
			this.player_1_move = move;
		}
		if(this.player_2_id === player_id){
			this.player_2_move = move;
		}
		var winner = this.checkWinner();
		if(winner){
			response = winner + " Wins";
		}else{
			response = (player_id+ " threw "+move);
		}
		this.player_1_client.emit('move', response);
		//this.player_2_client.emit('move', response);
		if(callback) {callback(response);}
	};

	this.socketHandlers['throw'] = function(data){
		ticTacToe.move(data.user_id, data.move, console.log);
	};
	
};
