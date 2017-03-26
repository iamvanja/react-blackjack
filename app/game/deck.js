import { shuffleArray } from '../utils/array';

/**
 * Creates a deck.
 * Private function used by Deck.
 *
 * @return     {Array}  { standard deck of cards }
 */
function createDeck() {
    const deck = [];
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['H', 'S', 'C', 'D'];

    ranks.forEach((rank) => {
        suits.forEach((suit) => {
            deck.push({rank, suit});
        });
    });

    return deck;
}

/**
 * Deck of cards store.
 * Private variable used by Deck.
 *
 * @type       {WeakMap}
 */
let _deck = new WeakMap();
/**
 * Create a new Deck.
 * Privately stores deck of cards
 * using WeakMap.
 *
 * @class      Deck (name)
 */
export default class Deck {
    constructor() {
        this.create();
    }

    /**
     * Create the deck of cards and shuffle
     */
    create() {
        _deck.set(this, shuffleArray(createDeck()));
    }

    /**
     * Shuffle the deck of cards
     */
    shuffle() {
        _deck.set(this, shuffleArray(_deck.get(this)));
    }
    /**
     * Get the amount of remaning cards
     *
     * @return     {Integer} { deck size }
     */
    get length() {
        return _deck.get(this).length;
    }

    /**
     * Deal the last card from the deck
     *
     * @return     {Object} card { last card from the deck }
     * @return     {String} card.rank { card rank }
     * @return     {String} card.suit { card suit }
     */
    deal() {
        let deck = _deck.get(this);

        // create a new deck when
        // there are no more cards
        if (!deck.length) {
            this.create();
            return this.deal();
        }

        const card = deck.pop();
        _deck.set(this, deck);

        return card;
    }
}
