import { expect } from 'chai';

import { shuffleArray } from '../../app/utils/array';

describe('utils/array', () => {

    describe('shuffleArray()', () => {
        const originalArr = [1,2,3,4,5,6,7,8,9,10];
        const shuffledArr = shuffleArray([...originalArr]);

        it('does not lose any element', () => {
            expect(originalArr.length).to.eq(shuffledArr.length);
        });
        it('contains the same elements', () => {
            expect(originalArr).to.deep.have.same.members(shuffledArr);
        });
        it('does not equal the original array', () => {
            expect(originalArr).to.not.deep.eql(shuffledArr);
        });
        it('does not create duplicates', () => {
            expect(originalArr.length).to.eq(new Set(shuffledArr).size);
        });
    });

});
