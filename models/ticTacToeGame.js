module.exports = function ticTacToeGame(game_id){
	
	this.game_id = game_id;
	
	this.player_1_id = '';
	this.player_1_move = '';
	
	this.player_2_id = '';
	this.player_2_move = '';
	
	this.addPlayer = function (player_id){
		if(this.player_1_id === ''){
			this.player_1_id = player_id;
		}else if (this.player_2_id === ''){
			this.player_2_id = player_id;
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
		if(this.player_1_id === player_id){
			this.player_1_move = move;
		}
		if(this.player_2_id === player_id){
			this.player_2_move = move;
		}
		var winner = this.checkWinner();
		if(winner){
			callback(winner + " Wins");
		}else{
			callback(player_id+ " threw "+move);
		}
	};
	
};
