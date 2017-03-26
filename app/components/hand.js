import React from 'react';
import Card from './card';

/**
 * Hand component
 *
 * Renders:
 * score
 * cards
 *
 * @return {ReactElement} markup
 */
const Hand = () => {
    return (
        <div className="hand">
            <p>
                <strong>Score:</strong>

            </p>
            <div className="cards">
                <Card />
            </div>
        </div>
    );
}

export default Hand;
