/*!
* Playing Cards Library 0.1
*
* Author: Joe Maddalone
* Date: Sep 29 2010
*/

var Deck = function (deckCount) {
	this.count = (51 * deckCount)+deckCount; //example: deck=0-51  * 2 = 102 + 2<--deckCount = 204
	this.cards = new Array(this.count);
	for (var i = this.count; i--;) { //reversed loop for execution speed, might switch to unrolled loop
		this.cards[i] = i + 1;	//not creating a card at this point, just storing it's position which can later be evaluated
	}
};

Deck.prototype = {
	cardsLeft: function(){return this.cards.length}, 
	nextCard : function(){if (this.cardsLeft() > 0){return this.cards.pop();} else {return null};},  //might use shift instead of pop here
	dealCard : function(playerHand){if (this.cardsLeft() > 0){playerHand.push(this.cards.pop());} else {return null};},   //might use shift instead of pop here
	shuffle: function(n) {
		var i;
		var tmp;
		for(var x=0;x<n;x++)
		{
			length = this.cards.length;
			//might need to switch to this.cardsLeft along with shift() above, in case there is a burn card implemented...
			while (length--) {
				i = (Math.random() * length | 0) ;
				tmp = this.cards[i];
				this.cards[i] = this.cards[length];
				this.cards[length] = tmp;
			}
		}
	}
};

var Card = function (id) {this.id = id};
Card.prototype = {
	suit: function () {
		var ret;
		var x = parseInt(this.id);
		if (x < 14) {
			x = 0
		}
		else {
			if (x % 13 == 0) {
				x = (x / 13) - 1
			}
			else {
				x = parseInt(x / 13)
			}
		};
		if (x > 3) {
			while (x > 3) { //there is more than one deck
				x -= 4
			}
		}
		switch (x) {
			case 0:
				ret = "Clubs";
				break;
			case 1:
				ret = "Diamonds";
				break;
			case 2:
				ret = "Hearts";
				break;
			case 3:
				ret = "Spades";
				break;
			default:
				ret = "????"; //just for debugging purposes
				break;
		}
		return ret
	},
	faceValue: function () {
		var x = parseInt(this.id);
		if (x > 13) {
			while (x > 13) {
				x -= 13
			}
		}
		switch (x) {
			case 1:
				return "A";
				break;
			case 11:
				return "J";
				break;
			case 12:
				return "Q";
				break;
			case 13:
				return "K";
				break;
			default:
				return x;	//not a face card
				break;
		}
		},
		info: function(){return this.faceValue() + ' of ' + this.suit()}
};

