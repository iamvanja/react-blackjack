import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
            <CSSTransitionGroup transitionName="buttons" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                { !dealDisabled &&
                    <div className="button-container">
                        <button className="deal" onClick={deal}>
                            <i className="icon-right"></i>
                            <span>Deal</span>
                        </button>
                    </div>
                }

                { dealDisabled &&
                    <div className="button-container">
                        <button className="hit" onClick={hit}>
                            <i className="icon-right"></i>
                            <span>Hit</span>
                        </button>
                        <button className="stand" onClick={stand}>
                            <i className="icon-down"></i>
                            <span>Stand</span>
                        </button>
                    </div>
                }
            </CSSTransitionGroup>
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
