import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import App from '../../app/components/app';
import Hand from '../../app/game/Hand';
import Deck from '../../app/game/Deck';

const deck = new Deck();
const dealerHand = new Hand();
const playerHand = new Hand();

describe('<App />', () => {

    const rendered = shallow(<App deck={deck} dealerHand={dealerHand} playerHand={playerHand} />);

    it ('renders with `app` class', () => {
        expect(rendered.is('.app')).to.be.true;
    });
    it('renders a single h1', () => {
        expect(rendered.find('h1')).to.have.length(1);
        expect(rendered.find('h1').text()).to.eq('Blackjack');
    });
    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
    it('renders two <Hand /> components', () => {
        expect(rendered.find('Hand')).to.have.length(2);
    });
    it('passes state to props to <Info /> components', () => {
        expect(rendered.find('Info')).to.have.prop('round', 0);
    });
    it('passes props to state to <Hand /> components', () => {
        expect(rendered.find('Hand').first()).to.have.prop('cards', rendered.state().dealerHand);
        expect(rendered.find('Hand').last()).to.have.prop('cards', rendered.state().playerHand);
    });
    it('renders <Controls /> component', () => {
        expect(rendered.find('Controls')).to.have.length(1);
    });

});
