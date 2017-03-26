/**
 * Calculates the detailed score (soft and hard total).
 *
 * @param      {Object}   score   The score
 * @param      {Integer}  score.softTotal   Soft total
 * @param      {Integer}  score.hardTotal   Hard total
 * @param      {Object    card    The card
 * @param      {String}   card.rank Card rank
 * @param      {String}   card.suit Card suit
 * @return     {Object}   The score.
 */
function calculateScore(score, card) {
    // ace
    if (card.rank === 'A') {
        score.hardTotal += 1;
        score.softTotal += ((score.softTotal + 11) > 21 ) ? 1 : 11;
    }
    // face cards
    else if (typeof card.rank === 'string') {
       score.hardTotal += 10;
       score.softTotal += 10;
    }
    else {
       // non-face cards
       score.hardTotal += card.rank;
       score.softTotal += card.rank;
    }

    return score;
}

/**
 * Calculates the hand total score.
 *
 * @param      {Object}   score   The score
 * @param      {Integer}  score.softTotal   Soft total
 * @param      {Integer}  score.hardTotal   Hard total
 * @return     {Integer}  The total.
 */
function calculateTotal(score) {
    if (score.hardTotal === 21 || score.softTotal === 21) {
        return 21;
    }
    else if (score.softTotal > 21) {
        return score.hardTotal;
    }

    return score.softTotal;
}

/**
 * Hand of cards store.
 * Private variable used by Hand.
 *
 * @type       {WeakMap}
 */
let _hand = new WeakMap();
/**
 * Hand stats store.
 * Private variable used by Hand.
 *
 * @type       {WeakMap}
 */
let _stats = new WeakMap();

/**
 * Create a new Blackjack Hand.
 * Uses WeakMap variables for privacy
 *
 * @class      Deck (name)
 */
export default class Hand {
    /**
     * Constructs the object.
     * Sets initial states for _hand and _stats.
     */
    constructor() {
        this.clear();
    }

    /**
     * Draws a card to the hand
     * On each card draw, update score stats
     *
     * @param      {Object}  card    The card.
     * @return     {Object}  Added card to the hand.
     */
    draw(card) {
        // adds a card to the hand
        let hand = _hand.get(this);
        hand.push(card);
        _hand.set(this, hand);

        // update stats
        _stats.set(this, calculateScore(_stats.get(this), card));

        return card;
    }

    /**
     * Sets the vars to the original state.
     */
    clear() {
        _hand.set(this, []);
        _stats.set(this, {
            softTotal: 0,
            hardTotal: 0,
        });
    }

    /**
     * Gets the total score.
     *
     * @return     {Integer}  The total score.
     */
    get scoreTotal() {
        return calculateTotal(_stats.get(this));
    }

    /**
     * Gets the statistics.
     *
     * @return     {Object}  The score stats.
     * @return     {Integer} stats.softTotal { Soft total }
     * @return     {Integer} stats.hardTotal { Hard total }
     */
    get scoreStats() {
        return _stats.get(this);
    }

    /**
     * Gets the cards.
     *
     * @return     {Array}  Array of cards in the current hand
     */
    get cards() {
        return _hand.get(this);
    }

    /**
     * Determines if the hand is bust.
     *
     * @return     {boolean}  True if bust, False otherwise.
     */
    get isBust() {
        return this.scoreTotal > 21;
    }

    /**
     * Determines if the hand has a blackjack.
     *
     * @return     {boolean}  True if has blackjack, False otherwise.
     */
    get hasBlackjack() {
        return this.cards.length === 2 && this.scoreTotal === 21;
    }
}
