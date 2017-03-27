import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../app/components/app';
import Hand from '../../app/game/Hand';
import Deck from '../../app/game/Deck';

const deck = new Deck();
const dealerHand = new Hand();
const playerHand = new Hand();

describe('<App />', () => {

    const rendered = shallow(<App
                                deck={deck}
                                dealerHand={dealerHand}
                                playerHand={playerHand}
                                dealerDrawing={()=>{}}
                                getWinner={()=>{}}
                            />);

    it ('renders with `app` class', () => {
        expect(rendered.is('.app')).to.be.true;
    });
    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
    it('renders two <Hand /> components', () => {
        expect(rendered.find('Hand')).to.have.length(2);
    });
    it('passes state to props to <Info /> components', () => {
        expect(rendered.find('Info')).to.have.prop('winPercentage', false);
    });
    it('passes props to state to <Hand /> components', () => {
        expect(rendered.find('Hand').first()).to.have.prop('cards', rendered.state().dealerHand);
        expect(rendered.find('Hand').last()).to.have.prop('cards', rendered.state().playerHand);
    });
    it('renders <Controls /> component', () => {
        expect(rendered.find('Controls')).to.have.length(1);
    });

});
