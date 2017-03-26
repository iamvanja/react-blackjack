import React from 'react';
import Info from './info';
import Hand from './hand';
import Controls from './controls';

/**
 * Entry point for the view layer of the app
 *
 * Renders:
 * Info component
 * Hand (dealer) component
 * Hand (player) component
 * Control component (buttons)
 *
 * @return {ReactElement} markup
 */
const App = () => {
    return (
        <div className="app">
            <h1>Blackjack</h1>
            <Info />
            <Hand />
            <Hand />
            <Controls />
        </div>
    );
}

export default App;
