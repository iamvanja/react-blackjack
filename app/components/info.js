import React, { PropTypes } from 'react';

/**
 * Info component where game info is rendered.
 *
 * @class      Info (name)
 * @param      {Object}          props                Component properties
 * @param      {Bool|undefined}  props.isWin          Indicated player's win
 * @param      {String|Bool}     props.winPercentage  Shows win percentage when truthy
 * @return     {ReactElement} markup
 */
const Info = ({ isWin, winPercentage }) => {
    /**
     * Gets the game outcome.
     *
     * @param      {Bool|null}  win  The win.
     * @return     {string}     The outcome.
     */
    const getOutcome = (win) => {
        switch(win) {
            case (true):
                return 'WIN!';
            case (false):
                return 'LOST!';
            case (null):
                return 'PUSH!';
        }
    }

    return (
        <div className="info">
            { winPercentage &&
                <p>
                    <strong>Wins:</strong> {winPercentage}
                </p>
            }
            { isWin !== undefined &&
                <p>
                    <strong>Outcome:</strong> {getOutcome(isWin)}
                </p>
            }
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Info.propTypes = {
    isWin: PropTypes.bool,
    winPercentage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]).isRequired,
};

export default Info;
