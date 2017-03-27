import React, { Component, PropTypes } from 'react';
import Info from './info';
import Hand from './hand';
import Controls from './controls';
import { calculateWinPercentage } from '../game';

const RESET_ROUND_TIME = 1500;

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
     * @param      {object}    props                Component properties
     * @param      {object}    props.deck           Deck instance
     * @param      {object}    props.playerHand     Hand instance
     * @param      {object}    props.dealerHand     Hand instance
     * @param      {function}  props.getWinner      Decides the winner
     * @param      {function}  props.dealerDrawing  Dealer's AI
     *
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {Integer} winCount
         * @property {Integer} roundCount
         * @property {Bool} inProgress
         * @property {Array} playerHand
         * @property {Array} dealerHand
         * @property {Bool|String} winPercentage
         * @property {Bool} isWin
         */
        this.state = {
            winCount: 0,
            roundCount: 0,
            inProgress: false,
            playerHand: [],
            dealerHand: [],
            winPercentage: false,
            isWin: undefined,
        };
    }


    /**
     * Handle deal new cards event (new round).
     * Deals cards to player and dealer.
     * Sets application state to update the app view.
     */
    onDeal() {
        let { deck, playerHand, dealerHand } = this.props;
        const { roundCount } = this.state;

        // clear timeout in case the
        // deal button is pressed before
        // the game was reset
        this.clearTimeout();
        this.resetRound();

        // shuffle deck every 6 rounds
        if (roundCount % 6 === 0) {
            deck.shuffle();
        }

        // deal cards
        playerHand.draw(deck.deal());
        dealerHand.draw(deck.deal());
        playerHand.draw(deck.deal());
        // second card to dealer
        // remains in the hand distance
        // but we wont show it in the view
        dealerHand.draw(deck.deal());

        // set state to update the view
        this.setState((prevState, props) => ({
            playerHand: playerHand.cards,
            // first card and the dummy card for
            // the dealer's hand view
            dealerHand: [dealerHand.cards[0], {rank: 'dummy',  suit: ''}],
            playerScore: playerHand.scoreTotal,
            roundCount: ++prevState.roundCount,
            inProgress: true,
        }), () => {
            // automatically stand if blackjack is drawn!
            return playerHand.hasBlackjack ? this.onStand() : null;
        });

    }

    /**
     * Handle player's new hit event.
     */
    onHit() {
        let { deck, playerHand } = this.props;

        // draw one card
        playerHand.draw(deck.deal());

        // update the view
        this.setState({
            playerHand: playerHand.cards,
            playerScore: playerHand.scoreTotal,
        }, () => {
            // automatically stand if bust
            return playerHand.isBust ? this.onStand() : null;
        });

    }

    /**
     * Handles player's stand event (round finished).
     * Dealers hits here - view layer does not know
     * anything about the logic.
     * Determines the winner
     * Updates the view
     */
    onStand() {
        const { playerHand, deck, getWinner, dealerDrawing } = this.props;
        let { dealerHand } = this.props;

        // let dealer draw
        dealerDrawing(dealerHand, deck, playerHand);

        // prepare state to be updated
        const dealerScore = dealerHand.scoreTotal;
        const isWin = getWinner(playerHand.scoreTotal, dealerScore);
        const winCount = isWin === true ? ++this.state.winCount : this.state.winCount;
        const winPercentage = calculateWinPercentage(winCount, this.state.roundCount);

        this.setState((prevState, props) => ({
            winCount,
            winPercentage,
            dealerHand: dealerHand.cards,
            dealerScore,
            inProgress: false,
            isWin,
        }), () => {
            // hide cards and prepare for the next round
            this.timeout = window.setTimeout(() => {
                this.resetRound();
            }, RESET_ROUND_TIME);
        });
    }

    resetRound() {
        const { playerHand, dealerHand } = this.props;

        // clear hands
        playerHand.clear();
        dealerHand.clear();

        // clean-up the view
        this.setState({
            isWin: undefined,
            playerHand: [],
            dealerHand: [],
            playerScore: undefined,
            dealerScore: undefined,
        });
    }

    /**
     * Clear timeout if defined
     */
    clearTimeout() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
    }

    /**
     * Clear timeout when component unmounts.
     * This is not necessary for this app because
     * this component will only umnount when the
     * browser tab/window is closed, but still
     * it is good to clean-up
     */
    componentWillUnmount() {
        this.clearTimeout();
    }


    /**
     * Render the app component.
     * @return {ReactElement} markup
     */
    render() {
        const {
            roundCount,
            playerHand,
            playerScore,
            dealerScore,
            dealerHand,
            inProgress,
            isWin,
            winCount,
            winPercentage,
        } = this.state;

        return (
            <div className="app">
                <Info isWin={isWin} winPercentage={winPercentage} />
                <Hand cards={dealerHand} score={dealerScore} />
                <Hand cards={playerHand} score={playerScore} />
                <Controls
                    dealDisabled={inProgress}
                    deal={() => this.onDeal()}
                    hit={() => this.onHit()}
                    stand={() => this.onStand()}
                />
            </div>
        );
    }
}

/**
 * Defines property types for this component.
 */
App.propTypes = {
    deck: PropTypes.object.isRequired,
    playerHand: PropTypes.object.isRequired,
    dealerHand: PropTypes.object.isRequired,
    getWinner: PropTypes.func.isRequired,
    dealerDrawing: PropTypes.func.isRequired,
};

export default App;
