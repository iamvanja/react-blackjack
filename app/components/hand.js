import React, { Component, PropTypes } from 'react';
import Card from './card';
import CSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Hand component where dealt cards are rendered.
 *
 * @class      Hand (name)
 * @param      {Object}       props             Component properties
 * @param      {Array}        props.cards       The cards
 * @param      {Integer}      props.score       The score
 * @param      {Bool}         props.inProgress  Is game in progress
 * @param      {String}       props.owner       Hand's owner (player or dealer)
 * @return     {ReactElement} markup
 */
class Hand extends Component {
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {Bool} isDealing
         */
        this.state = {
            isDealing: false,
        }
    }

    /**
     * Calculate and change `isDealing` state depending on
     * the received props.
     *
     */
    componentWillReceiveProps(nextProps) {
        const nextIsDealing = (nextProps.cards.length <= 2) && nextProps.inProgress;
        if (this.state.isDealing !== nextIsDealing) {
            this.setState({
                isDealing: nextIsDealing,
            })
        }
    }

    /**
     * Render conditionally score element.
     *
     * @param      {undefined||Integer}  score   The hand's score
     * @return     {ReactElement}        markup
     */
    renderScore(score) {
        return (
            score && <span className="score-value">{score}</span>
        )
    }

    render() {
        const { score, cards, owner } = this.props;
        const { isDealing } = this.state;

        const dataAttributes = {
            'data-dealing': isDealing,
            'data-owner': owner,
        };

        return (
            <div className="hand" {...dataAttributes}>
                <div className="score">
                    <CSSTransitionGroup transitionName="pop" transitionEnterTimeout={500} transitionLeaveTimeout={100}>
                        {this.renderScore(score)}
                    </CSSTransitionGroup>
                </div>
                <div className="cards">
                    <CSSTransitionGroup transitionName="list" transitionEnterTimeout={800} transitionLeaveTimeout={300}>
                        {cards.map((card, i) =>
                            <Card
                                rank={card.rank}
                                suit={card.suit}
                                isPrivate={card.rank === 'dummy'}
                                key={i}
                            />
                        )}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

/**
 * Defines property types for this component.
 */
Hand.propTypes = {
    cards: PropTypes.array.isRequired,
    score: PropTypes.number,
    inProgress: PropTypes.bool.isRequired,
    owner: PropTypes.string,
};

export default Hand;
