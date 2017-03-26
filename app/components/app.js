import React, { Component, PropTypes } from 'react';
import Info from './info';
import Hand from './hand';
import Controls from './controls';

 /**
  * Entry point for the view layer of the app
  *
  * Renders:
  * Info component
  * Hand (dealer) component
  * Hand (player) component
  * Control component (buttons)
  *
  * @return {ReactElement} markup
  */
class App extends Component {
    /**
     * Constructor
     *
     * @param      {object} props       Component properties
     * @param      {object} deck        Deck instance
     * @param      {object} playerHand  Hand instance
     * @param      {object} dealerHand  Hand instance
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {Integer} round
         * @property {Bool} inProgress
         * @property {Array} playerHand
         * @property {Array} dealerHand
         */
        this.state = {
            round: 0,
            inProgress: false,
            playerHand: [],
            dealerHand: [],
        };
    }


    /**
     * Handle deal new cards event (new round).
     * Deals cards to player and dealer.
     * Sets application state to update the app view.
     */
    onDeal(e) {
        let { deck, playerHand, dealerHand } = this.props;

        playerHand.add(deck.deal());
        dealerHand.add(deck.deal());
        playerHand.add(deck.deal());
        dealerHand.add(deck.deal());

        this.setState((prevState, props) => ({
            playerHand: playerHand.getCards(),
            dealerHand: dealerHand.getCards(),
            playerScore: playerHand.getTotal(),
            round: ++prevState.round,
            inProgress: true,
        }));
    }

    /**
     * Handle player's new hit event.
     */
    onHit() {
        console.log('on hit');
    }

    /**
     * Handle player's stand event (round finished).
     */
    onStand() {
        console.log('on stand');
    }

    /**
     * Render the app component.
     * @return {ReactElement} markup
     */
    render() {
        const {
            round,
            playerHand,
            playerScore,
            dealerHand,
            inProgress,

        } = this.state;

        return (
            <div className="app">
                <h1>Blackjack</h1>
                <Info round={round} />
                <Hand cards={dealerHand} />
                <Hand cards={playerHand} score={playerScore} />
                <Controls
                    dealDisabled={inProgress}
                    deal={(e) => this.onDeal()}
                    hit={() => this.onHit()}
                    stand={() => this.onStand()}
                />
            </div>
        );
    }
}

/**
 * Defines property types for this component.
 * @property {object} deck Deck instance
 * @property {object} playerHand Hand instance
 * @property {object} dealerHand Hand instance
 *
 */
App.propTypes = {
    deck: PropTypes.object.isRequired,
    playerHand: PropTypes.object.isRequired,
    dealerHand: PropTypes.object.isRequired,
};

export default App;
