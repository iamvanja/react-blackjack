import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Info from '../../app/components/info';

describe('<Info />', () => {

    it ('renders the game outcome', () => {
        let rendered = shallow(<Info isWin={true} winPercentage={false} />);
        expect(rendered).to.include.text('Outcome: WIN!');

        rendered = shallow(<Info isWin={false} winPercentage={false} />);
        expect(rendered).to.include.text('Outcome: LOST!');

        rendered = shallow(<Info isWin={null} winPercentage={false} />);
        expect(rendered).to.include.text('Outcome: PUSH!');

        rendered = shallow(<Info isWin={undefined} winPercentage={false} />);
        expect(rendered).to.not.include.text('Outcome');
    });

    it ('renders the win percentage', () => {
        let rendered = shallow(<Info winPercentage={'100%'} />);
        expect(rendered).to.include.text('Wins: 100%');

        rendered = shallow(<Info winPercentage={false} />);
        expect(rendered).to.not.include.text('Wins:');
    });

});
