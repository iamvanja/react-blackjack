import React from 'react';

/**
 * Info component
 *
 * Renders:
 * round number
 * outcome (win, lost, pust)
 *
 * @return {ReactElement} markup
 */
const Info = () => {
    return (
        <div className="info">
            <p>
                <strong>Round:</strong>
            </p>
            <p>
                <strong>Outcome:</strong>
            </p>
        </div>
    );
}

export default Info;
