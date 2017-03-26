import React from 'react';

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
const Controls = () => {
    return (
        <div className="controls">
            <button>DEAL</button>
            <button>HIT</button>
            <button>STAND</button>
        </div>
    );
}

export default Controls;
