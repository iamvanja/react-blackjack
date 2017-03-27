import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Info from '../../app/components/info';

describe('<Info />', () => {

    it ('renders the game outcome', () => {
        let rendered = shallow(<Info isWin={true} winPercentage={false} />);
        expect(rendered).to.include.text('WIN!');

        rendered = shallow(<Info isWin={false} winPercentage={false} />);
        expect(rendered).to.include.text('LOST!');

        rendered = shallow(<Info isWin={null} winPercentage={false} />);
        expect(rendered).to.include.text('PUSH!');

        rendered = shallow(<Info isWin={undefined} winPercentage={false} />);
        expect(rendered.find('.outcome').length).to.be.eq(0);
    });

    it ('renders the win percentage', () => {
        let rendered = shallow(<Info winPercentage={'100%'} />);
        expect(rendered).to.include.text('100%');

        rendered = shallow(<Info winPercentage={false} />);
        expect(rendered).to.not.include.text('wins');
    });

});
