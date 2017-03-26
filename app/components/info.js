import React, { PropTypes } from 'react';

/**
 * Info component
 *
 * Renders:
 * round number
 * outcome (win, lost, pust)
 *
 * @return {ReactElement} markup
 */

/**
 * Info component where game info is rendered.
 *
 * @class      Info (name)
 * @param      {Object}       props        Component properties
 * @param      {Integer}      props.round  Game's round
 * @return     {ReactElement} markup
 */
const Info = ({ round }) => {
    return (
        <div className="info">
            <p>
                <strong>Round:</strong> {round}
            </p>
            <p>
                <strong>Outcome:</strong>
            </p>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Info.propTypes = {
    round: PropTypes.number.isRequired,
};

export default Info;
