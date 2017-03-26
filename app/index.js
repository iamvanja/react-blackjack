import React from 'react';
import ReactDOM  from 'react-dom';

import App from './components/app';
// add game classes
import Hand from './game/Hand';
import Deck from './game/Deck';

import './css/index.scss';

// create instances of game classes
const deck = new Deck();
const dealerHand = new Hand();
const playerHand = new Hand();

/**
 * Renders the app into the DOM.
 * `#root` is the mounting point.
 */
ReactDOM.render(
    // and pass them to the app component
    <App deck={deck} dealerHand={dealerHand} playerHand={playerHand} />,
    document.getElementById('root')
);
