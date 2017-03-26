import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Hand from '../../app/components/hand';

describe('<Hand />', () => {
    const cards = [{ rank: 'A', suit: 'D' }, { rank: 9, suit: 'H' }];

    describe('score', () => {
        it('renders score when passed', () => {
            let rendered = shallow(<Hand cards={cards} score={12} />);
            expect(rendered.find('.score')).to.have.length(1);
        });
        it('does not render score when not passed', () => {
            let rendered = shallow(<Hand cards={cards} />);
            expect(rendered.find('.score')).to.have.length(0);
        });
    });

});
