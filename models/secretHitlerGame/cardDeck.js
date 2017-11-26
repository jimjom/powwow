
var Deck = function(card_array) {
  this.cards = card_array;

  this.shuffle = function(){
    var num_cards = this.cards.length;
    var num_cards_left = num_cards;
    var new_deck = [num_cards];

    for(let i=0; i<num_cards; i++){
      var random_index_from_remaining = Math.floor(Math.random() * num_cards_left); 
      var final_spot = random_index_from_remaining;
      for(let j=0;j<random_index_from_remaining; j++){
        if(new_deck[j] !== undefined){ final_spot++; } 
      }
      new_deck[i] = this.cards[final_spot];
    }
    
    this.cards = new_deck;
  };
};

module.exports.createDeck = function(card_array){
  return new Deck(card_array);
};

module.exports.shuffle = function(deck){
  var num_cards = deck.cards.length;
  var num_cards_left = num_cards;
  var new_deck = [num_cards];

  for(let i=0; i<num_cards; i++){
    var random_index_from_remaining = Math.floor(Math.random() * num_cards_left); 
    var final_spot = random_index_from_remaining;
    for(let j=0;j<random_index_from_remaining; j++){
      if(new_deck[j] !== undefined){ final_spot++; } 
    }
    new_deck[i] = deck[final_spot];
  }
  deck.cards = new_deck;
};
