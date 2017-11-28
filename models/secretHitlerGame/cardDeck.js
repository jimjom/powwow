
var Deck = function(card_array) {
  this.cards = card_array;

  this.shuffle = function(){
    var num_cards = this.cards.length;
    var num_cards_left = num_cards;
    var new_deck = new Array(num_cards);

    for(let i=0; i<num_cards; i++){
      var empty_spot_to_place_in = Math.floor(Math.random() * num_cards_left)+1; 
      var empty_slots = 0;
      var final_index=0;
      while(empty_slots != empty_spot_to_place_in){
        if(new_deck[final_index] === undefined) { empty_slots++; }
        if(empty_spot_to_place_in === empty_slots) { break; }
        final_index++;
      }
      new_deck[final_index] = this.cards[i];
      num_cards_left--;
    }
    
    this.cards = new_deck;
  };
};

module.exports.createDeck = function(card_array){
  return new Deck(card_array);
};
