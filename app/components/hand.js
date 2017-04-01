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
        this.state = {
            isDealing: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextIsDealing = (nextProps.cards.length <= 2) && nextProps.inProgress;
        if (this.state.isDealing !== nextIsDealing) {
            this.setState({
                isDealing: nextIsDealing,
            })
        }
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
                {score &&
                    <div className="score">
                        <span className="score-value">{score}</span>
                    </div>
                }
                <div className="cards">
                    <CSSTransitionGroup transitionName="list" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {cards.map((card, i) =>
                            <Card
                                rank={card.rank}
                                suit={card.suit}
                                isFaceDown={card.rank === 'dummy'}
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
