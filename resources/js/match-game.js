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
    $game.data('flipped-cards', []);
 	$game.data('pairs-found', 0);
	for (var i = 0; i < cardValues.length; i++) {
            var $card = $('<div class="col-xs-3 card"></div>');
	    var data = {
		value: cardValues[i],
		color: cardColours[cardValues[i] - 1],
		flipped: false
	    };
	
	    $card.data(data); 
	    $game.append($card);
	}
	
	$('.card').click(function() {
		MatchGame.flipCard ($(this), $game);
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	if ($card.data('flipped')) {
		console.log ('Already flipped:');
		console.log ($card.data());
		return;
	}
	
	var cards = $game.data('flipped-cards');

	if (cards.length <= 2) {
		cards.push($card);
	
		$card.css('background-color', $card.data('color'));
		$card.text($card.data('value'));
		$card.data('flipped',true);	
	
		if (cards.length === 2) {
			if (cards[0].data('value') === cards[1].data('value')) {
				for (var i = 0; i <= 1; i++) {
					cards[i].css('backgroundColor', 'rgb(153, 153, 153');
					cards[i].css('color', 'rgb(204,204,204)');
				}
				var pairs = $game.data('pairs-found');
				$game.data('pairs-found', pairs + 1);
				document.getElementById('success').play();
				if ($game.data('pairs-found') === 8) {
					setTimeout(function() {
						alert('You won!!');
					}, 50);
				}
			} else {
				setTimeout(function() {
					for (var i = 0; i <= 1; i++) {
						cards[i].css('backgroundColor', 'rgb(32, 64, 86)');
						cards[i].css('color', 'rgb(32, 64, 86)');
						cards[i].text('');
						cards[i].data('flipped', false);
					}
				}, 350);
			}
			$game.data('flipped-cards', []);
		}
	}
	else {
		$game.data('flipped-cards', []);
	}
};

