import React, { PropTypes } from 'react';

/**
 * Control component
 *
 * Renders:
 * deal button
 * hit button
 * stand button
 *
 * @return {ReactElement} markup
 */


/**
 * Control component where player controls how to play the game.
 *
 * @class      Controls (name)
 * @param      {Object}       props               Component properties
 * @param      {Bool}         props.dealDisabled  Should deal button be disabled
 * @param      {Function}     props.deal          Run when Deal button is clicked
 * @param      {Function}     props.hit           Run when Hit button is clicked
 * @param      {Function}     props.stand         Run when Stand button is clicked
 * @return     {ReactElement} markup
 */
const Controls = ({ dealDisabled, deal, hit, stand }) => {
    return (
        <div className="controls">
            <button onClick={deal} disabled={dealDisabled}>DEAL</button>
            <button onClick={hit} disabled={!dealDisabled}>HIT</button>
            <button onClick={stand} disabled={!dealDisabled}>STAND</button>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Controls.propTypes = {
    dealDisabled: PropTypes.bool.isRequired,
    deal: PropTypes.func.isRequired,
    hit: PropTypes.func.isRequired,
    stand: PropTypes.func.isRequired,
};

export default Controls;
