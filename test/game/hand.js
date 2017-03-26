import { expect } from 'chai';
import Hand from '../../app/game/hand';

describe('Hand', () => {

    describe('fresh instance', () => {
        const hand = new Hand();
        it('has no cards', () => {
            expect(hand.cards.length).to.eq(0);
        });
        it('returns score 0', () => {
            expect(hand.scoreTotal).to.eq(0);
        });
        it('returns stats', () => {
            const stats = hand.scoreStats;
            expect(stats).to.have.property('softTotal');
            expect(stats).to.have.property('hardTotal');
        });
    });

    describe('add', () => {
        it('returns dealt cards', () => {
            const hand = new Hand();
            hand.draw({rank: 3, suit: 'S'});
            hand.draw({rank: 'A', suit: 'D'});
            expect(hand.cards.length).to.eq(2);
        });
    });

    describe('score', () => {
        it('calculates score with numeric ranks', () => {
            const hand = new Hand();
            hand.draw({rank: 2, suit: 'D'});
            expect(hand.scoreTotal).to.eq(2);
            hand.draw({rank: 7, suit: 'S'});
            expect(hand.scoreTotal).to.eq(9);
        });
        it('calculates score with face ranks', () => {
            const hand = new Hand();
            hand.draw({rank: 'Q', suit: 'D'});
            expect(hand.scoreTotal).to.eq(10);
            hand.draw({rank: 7, suit: 'S'});
            expect(hand.scoreTotal).to.eq(17);
        });
        it('counts aces as 11 for hands less than 21', () => {
            const hand = new Hand();
            hand.draw({rank: 3, suit: 'S'});
            hand.draw({rank: 'A', suit: 'D'});
            expect(hand.scoreTotal).to.eq(14);
        });
        it('counts aces as 11 for hands equal to 21', () => {
            let hand = new Hand();
            hand.draw({rank: 10, suit: 'S'});
            hand.draw({rank: 'A', suit: 'D'});
            expect(hand.scoreTotal).to.eq(21);

            hand = new Hand();
            hand.draw({rank: 'K', suit: 'S'});
            hand.draw({rank: 'A', suit: 'D'});
            expect(hand.scoreTotal).to.eq(21);
        });
        it('counts aces as 1 for hands greater than 21', () => {
            let hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            hand.draw({rank: 5, suit: 'S'});
            hand.draw({rank: 7, suit: 'C'});
            expect(hand.scoreTotal).to.eq(13);

            hand = new Hand();
            hand.draw({rank: 'K', suit: 'S'});
            hand.draw({rank: 'K', suit: 'C'});
            hand.draw({rank: 'A', suit: 'H'});
            expect(hand.scoreTotal).to.eq(21);
        });
        it('works with multiple aces', () => {
            let hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            expect(hand.scoreTotal).to.eq(11);
            hand.draw({rank: 'A', suit: 'H'});
            expect(hand.scoreTotal).to.eq(12);
            hand.draw({rank: 'A', suit: 'S'});
            expect(hand.scoreTotal).to.eq(13);
            hand.draw({rank: 'A', suit: 'C'});
            expect(hand.scoreTotal).to.eq(14);

            hand = new Hand();
            hand.draw({rank: 'K', suit: 'S'});
            hand.draw({rank: 'A', suit: 'C'});
            hand.draw({rank: 'A', suit: 'H'});
            expect(hand.scoreTotal).to.eq(12);
        });
    });

    describe('stats', () => {
        it('calculates softTotal and hardTotal correctly', () => {
            let hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            hand.draw({rank: 6, suit: 'S'});
            let stats = hand.scoreStats;
            expect(stats.hardTotal).to.eq(7);
            expect(stats.softTotal).to.eq(17);

            hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            hand.draw({rank: 'Q', suit: 'S'});
            hand.draw({rank: 9, suit: 'S'});
            stats = hand.scoreStats;
            expect(stats.hardTotal).to.eq(20);
            expect(stats.softTotal).to.eq(30);
        });
    });

    describe('clear', () => {
        it('clears cards and scores', () => {
            let hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            hand.draw({rank: 6, suit: 'S'});
            expect(hand.scoreTotal).to.eq(17);
            expect(hand.cards.length).to.eq(2);

            hand.clear();
            expect(hand.scoreTotal).to.eq(0);
            expect(hand.cards.length).to.eq(0);
        });
    });

    describe('isBust', () => {
        it('calculates bust hand', () => {
            let hand = new Hand();
            hand.draw({rank: 'Q', suit: 'D'});
            hand.draw({rank: 10, suit: 'S'});
            expect(hand.isBust).to.be.false;

            hand.draw({rank: 3, suit: 'S'});
            expect(hand.isBust).to.be.true;
        });
    });

    describe('hasBlackjack', () => {
        it('calculates blackjack', () => {
            let hand = new Hand();
            hand.draw({rank: 'A', suit: 'D'});
            hand.draw({rank: 10, suit: 'S'});
            expect(hand.hasBlackjack).to.be.true;

            hand.draw({rank: 3, suit: 'S'});
            expect(hand.hasBlackjack).to.be.false;
        });
    });

});
