var roleAssigner = require('../../../models/secretHitlerGame/roleAssigner');
var mockUserModel = require('../mockUserModel');

var assert = require('assert');

var generatePlayerArray = function (num_players){
  var playerArray = {};
  for(var i = 1; i <=num_players; i++){
    var id = 'player'+i;
    playerArray[id] = mockUserModel.findById(id); 
  }
  return playerArray;
};

var testGenerate = function (num_players){
      var players = generatePlayerArray(num_players);
      var result = true;
      for(var i =0; i <20; i++){
         roleAssigner.generate(players);
	 var roleString = roleAssigner.roleString(players);
	 result = result && roleStringValid(roleString, num_players, roleAssigner.numFacists(num_players));
      }
     assert.equal(true,result);
};

var roleStringValid = function (roleString, num_players, num_facists){
  var result = true;
  result = result && (roleString.split('h').length === 2);
  result = result && (roleString.split('f').length === num_facists+1);
  result = result && (roleString.split('l').length === num_players - num_facists);
  return result;
};

describe('roleAssigner', function() {
  describe('#roleAssigner_getHitler()', function() {
    it('run 100 times with 10 people, each should have at least 1', function() {
      var hitler_array = [];
      for(var i =0; i < 100; i ++){
        hitler_array[roleAssigner.getHitler(10)] = 1;
      }
      assert.equal('1,1,1,1,1,1,1,1,1,1', hitler_array.join());
    });
  });
  describe('#roleAssigner_numFacist_allNumbers', function() {
    it('5 should have 1', function() {
      assert.equal(1,roleAssigner.numFacists(5));
    });
    it('6 should have 1', function() {
      assert.equal(1,roleAssigner.numFacists(6));
    });
    it('7 should have 2', function() {
      assert.equal(2,roleAssigner.numFacists(7));
    });
    it('8 should have 2', function() {
      assert.equal(2,roleAssigner.numFacists(8));
    });
    it('9 should have 3', function() {
      assert.equal(3,roleAssigner.numFacists(9));
    });
    it('10 should have 3', function() {
      assert.equal(3,roleAssigner.numFacists(10));
    });
  });
  describe('#roleAssigner_generate', function() {
    it('Run 20 times, all configs valid, 5 players', function() {
      testGenerate(5);
    });
    it('Run 20 times, all configs valid, 6 players', function() {
      testGenerate(6);
    });
    it('Run 20 times, all configs valid, 7 players', function() {
      testGenerate(7);
    });
    it('Run 20 times, all configs valid, 8 players', function() {
      testGenerate(8);
    });
    it('Run 20 times, all configs valid, 9 players', function() {
      testGenerate(9);
    });
    it('Run 20 times, all configs valid, 10 players', function() {
      testGenerate(10);
    });
  });
});
