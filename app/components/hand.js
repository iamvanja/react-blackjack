import React, { PropTypes } from 'react';
import Card from './card';

/**
 * Hand component where dealt cards are rendered.
 *
 * @class      Hand (name)
 * @param      {Object}       props        Component properties
 * @param      {Array}        props.cards  The cards
 * @param      {Integer}      props.score  The score
 * @return     {ReactElement} markup
 */
const Hand = ({ cards, score }) => {
    return (
        <div className="hand">
            {score &&
                <p className="score">
                    <strong>Score:</strong> {score}
                </p>
            }
            <div className="cards">
                {cards.map((card, i) =>
                    <Card
                        rank={card.rank}
                        suit={card.suit}
                        key={i}
                    />
                )}
            </div>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Hand.propTypes = {
    cards: PropTypes.array.isRequired,
    score: PropTypes.number,
};

export default Hand;
