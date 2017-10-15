var MatchGame = {};

$(document).ready(function() {
	var $game = $('#game');
	var cards = MatchGame.generateCardValues();
	MatchGame.renderCards (cards, $game);
});

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var numbers = [];
	for (var i = 0; i < 8; i++) { // Could also do 1 to <= 8)
		numbers.push(i + 1);
		numbers.push(numbers[i + i]);	
	}
	
	var randomizedNumbers = [];
	while (numbers.length > 0) {
		var cardPosition = Math.floor(Math.random() * numbers.length);
		randomizedNumbers.push(numbers[cardPosition]);
		numbers.splice(cardPosition, 1);
	}
		
	return randomizedNumbers;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	var cardColours = [
		'hsl(25, 85%, 65%)',
		'hsl(55, 85%, 65%)',
		'hsl(90, 85%, 65%)',
		'hsl(160, 85%, 65%)',
		'hsl(220, 85%, 65%)',
		'hsl(265, 85%, 65%)',
		'hsl(310, 85%, 65%)',
		'hsl(360, 85%, 65%)'];
		
    $game.empty();
        
	for (var i = 0; i < cardValues.length; i++) {
		
		
		var data = {
			value: cardValues[i],
			color: cardColours[cardValues[i] - 1],
			flipped: false
		};
		
		var $card = $('<div class="col-xs-3 card"></div>');
		$card.data(data); 

		$('#game').append($card);
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};

