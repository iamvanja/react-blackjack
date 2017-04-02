import React, { PropTypes } from 'react';

 /**
  * Card component.
  *
  * @class      Info (name)
  * @param      {Object}          props             Component properties
  * @param      {String|Integer}  props.rank        Card's rank
  * @param      {String}          props.suit        Card's suit
  * @param      {Bool}            props.isPrivate   Should rank & suit be rendered
  * @return     {ReactElement}    markup
  */
const Card = ({ rank, suit, isPrivate }) => {
    /**
     * Renders the top and bottom container
     * element. Keeps markup DRY.
     *
     * @return     {ReactElement}    markup
     */
    const renderContainer = () => {
        return (
            <div className="container">
                <span className="rank">{rank}</span>
                <span className="suit">{suit}</span>
            </div>
        );
    }

    /**
     * Renders the front of the card.
     *
     * @return     {ReactElement}    markup
     */
    const renderFront = () => {
        return (
            <div className="front">
                <div className="section top">
                    {renderContainer()}
                </div>
                <div className="section center suit">{suit}</div>
                <div className="section bottom">
                    {renderContainer()}
                </div>
            </div>
        );
    }

    return (
        <div className={`card ${suit}`} data-private={isPrivate}>
            {!isPrivate && renderFront()}
            <div className="back"></div>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Card.propTypes = {
    rank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    suit: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool,
};

export default Card;
