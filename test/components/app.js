import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../app/components/app';

describe('<App />', () => {

    const rendered = shallow(<App />);

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
    it('renders <Controls /> component', () => {
        expect(rendered.find('Controls')).to.have.length(1);
    });

});
