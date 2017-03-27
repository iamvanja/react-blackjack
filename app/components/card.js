import React, { PropTypes } from 'react';

 /**
  * Card component.
  *
  * @class      Info (name)
  * @param      {Object}          props             Component properties
  * @param      {String|Integer}  props.rank        Card's rank
  * @param      {String}          props.suit        Card's suit
  * @param      {Bool}            props.isFaceDown  Should card be facedown
  * @return     {ReactElement}    markup
  */
const Info = ({ rank, suit, isFaceDown }) => {
    const faceDownClass = isFaceDown ? 'face-down' : '';
    return (
        <div className={`card ${suit} ${faceDownClass}`}>
            <div className="section top">
                <div className="container">
                    <span className="rank">{rank}</span>
                    <span className="suit">{suit}</span>
                </div>
            </div>
            <div className="section center suit">{suit}</div>
            <div className="section bottom">
                <div className="container">
                    <span className="rank">{rank}</span>
                    <span className="suit">{suit}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Info.propTypes = {
    rank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    suit: PropTypes.string.isRequired,
    isFaceDown: PropTypes.bool,
};

export default Info;
