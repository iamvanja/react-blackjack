import { expect } from 'chai';
import Hand from '../../app/game/hand';
import { getWinner, calculateWinPercentage } from '../../app/game';

describe('Game', () => {

    describe('getWinner()', () => {
        it('determines player to lose correctly', () => {
            // playerScore, dealerScore
            expect(getWinner(5,18)).to.be.false;
            expect(getWinner(23,18)).to.be.false;
        });

        it('determines player to win correctly', () => {
            expect(getWinner(5,22)).to.be.true;
            expect(getWinner(21,18)).to.be.true;
        });

        it('determines push correctly', () => {
            expect(getWinner(18,18)).to.be.null;
            expect(getWinner(22,24)).to.be.null;
        });
    });

    describe('calculateWinPercentage()', () => {
        it('returns 0% when passed zeros', () => {
            // winCount, roundCount
            expect(calculateWinPercentage(0,0)).to.eq('0%');
        });
        it('returns 0% when passed strings', () => {
            expect(calculateWinPercentage('a','b')).to.eq('0%');
            expect(calculateWinPercentage('a', 0)).to.eq('0%');
        });
        it('returns 0% when winCount is greater than roundCount', () => {
            expect(calculateWinPercentage(1,0)).to.eq('0%');
        });
        it('returns 100% when winCount is equal roundCount', () => {
            expect(calculateWinPercentage(1,1)).to.eq('100%');
        });
        it('returns correct value when winCount is less than roundCount', () => {
            expect(calculateWinPercentage(1,3)).to.eq('33.33%');
            expect(calculateWinPercentage(1,9)).to.eq('11.11%');
            expect(calculateWinPercentage(2,23)).to.eq('8.7%');
            expect(calculateWinPercentage(1,5)).to.eq('20%');
            expect(calculateWinPercentage(1,20)).to.eq('5%');
        });
    });

});
