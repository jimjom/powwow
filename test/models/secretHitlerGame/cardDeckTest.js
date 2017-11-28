var assert = require('assert');

var cardDeck = require('../../../models/secretHitlerGame/cardDeck');
debug_mode=true;

var createRoleCards = function(hitlerCards, facistCards, liberalCards){
  var result = new Array(hitlerCards + facistCards + liberalCards);
  for(var i = 0; i < hitlerCards; i++){ result[i] = 'hitler'; }
  for(var i = hitlerCards; i < hitlerCards + facistCards; i++){ result[i] = 'facist'; }
  for(var i = hitlerCards + facistCards; i < hitlerCards + facistCards + liberalCards; i++){ result[i] = 'liberal'; }
  return result;
};

describe('cardDeckTest', function() {
  describe('#cardDeckTest_shuffle', function() {
    it('in a 100 games, each player should have been hitler at least once', function() {
        var hitler_array = new Array(10);
	for(var i =0; i<100; i++){
	var roleCards = createRoleCards(1,3,6);
	var deck = cardDeck.createDeck(roleCards);
	deck.shuffle();
        hitler_array[deck.cards.indexOf('hitler')] = 1; 
        }
        assert.equal('1,1,1,1,1,1,1,1,1,1', hitler_array.join());
    });
  });
});
