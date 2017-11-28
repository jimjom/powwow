var cardDeck = require('./cardDeck');

module.exports.getHitler = function(num_players){
  return Math.floor(Math.random()*num_players);
};

module.exports.numFacists = function(num_players){
  return Math.floor((num_players-1)/2)-1;
};

module.exports.numLiberals = function(num_players){
  return num_players - module.exports.numFacists(num_players) - 1;
};

module.exports.playersString = function(players){
  var result = '[';
  Object.keys(players).forEach(function (player_id){
    result = result + players[player_id].userName+ ',';
  });
  return result;
};

module.exports.roleString = function(players){
  var result = '[';
  Object.keys(players).forEach(function (player_id){
    result = result + players[player_id].role.substring(0,1)+ ',';
  });
  return result.substring(0,result.length -1) + ']';
}

module.exports.generate = function generate(players){
  var player_keys = Object.keys(players);
  var num_players = player_keys.length;
  var num_facists = module.exports.numFacists(num_players);

  var roleCards = [num_players];
  roleCards[0]='hitler';
  for(var i=1; i<= num_facists; i++){ roleCards[i] = 'facist'; }
  for(var i=num_facists+1; i<num_players; i++) { roleCards[i] = 'liberal'; }
  var deck = cardDeck.createDeck(roleCards); 
  deck.shuffle();

  var count=0;
  player_keys.forEach(function (player_id){
    players[player_id].role = deck.cards[count++];
  });
};
