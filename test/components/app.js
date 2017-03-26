import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../app/components/app';

describe('<App />', () => {

    const wrapper = shallow(<App />);

    it ('renders with `app` class', () => {
        expect(wrapper.is('.app')).to.be.true;
    });
    it('renders a single h1', () => {
        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('h1').text()).to.eq('Blackjack');
    });

});
