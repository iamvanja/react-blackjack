import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Card from '../../app/components/card';

describe('<Card />', () => {
    const suit = 'C';
    const rank = 2;
    const rendered = shallow(<Card suit={suit} rank={rank} />);

    it('shows suit and rank', () => {
        expect(rendered).to.include.text(suit);
        expect(rendered).to.include.text(rank);
    });

    it('adds a css class for the suit', () => {
        expect(rendered.find(`.card.${suit}`)).to.have.length(1);
    });

});
