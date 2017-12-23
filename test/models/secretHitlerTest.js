var assert = require('assert');

var secretHitler = require('../../models/secretHitler');
debug_mode=true;

describe('secretHitlerTest', function() {
  describe('#secretHitler_addPlayer_addNewPlayer', function() {
    it('add 10 new players', function() {
      var secretHitlerGame = new secretHitler('test game');
	for(var i=0; i<10; i++){
          secretHitlerGame.addPlayer('p'+i);
        }
      assert.equal(10, Object.keys(secretHitlerGame.players).length);
    });
  });
  describe('#secretHitler_addPlayer_addExistingPlayer', function() {
    it('add 10 players, then 1 with an existing id', function() {
      var secretHitlerGame = new secretHitler('test game');
	for(var i=0; i<10; i++){
          secretHitlerGame.addPlayer('p'+i);
        }
      secretHitlerGame.addPlayer('p1');
      secretHitlerGame.addPlayer('p2');
      assert.equal(10, Object.keys(secretHitlerGame.players).length);
    });
  });
  describe('#secretHitler_removePlayer_removeExistingPlayer', function() {
    it('add 10 players, then remove 1', function() {
      var secretHitlerGame = new secretHitler('test game');
	for(var i=0; i<10; i++){
          secretHitlerGame.addPlayer('p'+i);
        }
      secretHitlerGame.removePlayer('p1');
      assert.equal(9, Object.keys(secretHitlerGame.players).length);
    });
  });
  describe('#secretHitler_startGame_validPlayerNumber', function() {
    it('Start a game, should not start, players aren\'t readyhope nothing crashes', function() {
      var secretHitlerGame = new secretHitler('test game');
	for(var i=0; i<10; i++){
          secretHitlerGame.addPlayer('p'+i);
        }
      assert.equal(secretHitlerGame.startGame(), false);
    });
  });
  describe('#secretHitler_startGame_invalidPlayerNumber', function() {
    it('Start a game, invalid player number', function() {
      var secretHitlerGame = new secretHitler('test game');
	for(var i=0; i<1; i++){
          secretHitlerGame.addPlayer('p'+i);
        }
      assert.equal(secretHitlerGame.startGame(), false);
    });
  });
});
