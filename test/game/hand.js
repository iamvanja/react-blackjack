import { expect } from 'chai';
import Hand from '../../app/game/hand';

describe('Hand', () => {

    describe('fresh instance', () => {
        const hand = new Hand();
        it('has no cards', () => {
            expect(hand.getCards().length).to.eq(0);
        });
        it('returns score 0', () => {
            expect(hand.getTotal()).to.eq(0);
        });
        it('returns stats', () => {
            const stats = hand.getStats();
            expect(stats).to.have.property('softTotal');
            expect(stats).to.have.property('hardTotal');
        });
    });

    describe('add', () => {
        it('returns dealt cards', () => {
            const hand = new Hand();
            hand.add({rank: 3, suit: 'S'});
            hand.add({rank: 'A', suit: 'D'});
            expect(hand.getCards().length).to.eq(2);
        });
    });

    describe('score', () => {
        it('calculates score with numeric ranks', () => {
            const hand = new Hand();
            hand.add({rank: 2, suit: 'D'});
            expect(hand.getTotal()).to.eq(2);
            hand.add({rank: 7, suit: 'S'});
            expect(hand.getTotal()).to.eq(9);
        });
        it('calculates score with face ranks', () => {
            const hand = new Hand();
            hand.add({rank: 'Q', suit: 'D'});
            expect(hand.getTotal()).to.eq(10);
            hand.add({rank: 7, suit: 'S'});
            expect(hand.getTotal()).to.eq(17);
        });
        it('counts aces as 11 for hands less than 21', () => {
            const hand = new Hand();
            hand.add({rank: 3, suit: 'S'});
            hand.add({rank: 'A', suit: 'D'});
            expect(hand.getTotal()).to.eq(14);
        });
        it('counts aces as 11 for hands equal to 21', () => {
            let hand = new Hand();
            hand.add({rank: 10, suit: 'S'});
            hand.add({rank: 'A', suit: 'D'});
            expect(hand.getTotal()).to.eq(21);

            hand = new Hand();
            hand.add({rank: 'K', suit: 'S'});
            hand.add({rank: 'A', suit: 'D'});
            expect(hand.getTotal()).to.eq(21);
        });
        it('counts aces as 1 for hands greater than 21', () => {
            let hand = new Hand();
            hand.add({rank: 'A', suit: 'D'});
            hand.add({rank: 5, suit: 'S'});
            hand.add({rank: 7, suit: 'C'});
            expect(hand.getTotal()).to.eq(13);

            hand = new Hand();
            hand.add({rank: 'K', suit: 'S'});
            hand.add({rank: 'K', suit: 'C'});
            hand.add({rank: 'A', suit: 'H'});
            expect(hand.getTotal()).to.eq(21);
        });
        it('works with multiple aces', () => {
            let hand = new Hand();
            hand.add({rank: 'A', suit: 'D'});
            expect(hand.getTotal()).to.eq(11);
            hand.add({rank: 'A', suit: 'H'});
            expect(hand.getTotal()).to.eq(12);
            hand.add({rank: 'A', suit: 'S'});
            expect(hand.getTotal()).to.eq(13);
            hand.add({rank: 'A', suit: 'C'});
            expect(hand.getTotal()).to.eq(14);

            hand = new Hand();
            hand.add({rank: 'K', suit: 'S'});
            hand.add({rank: 'A', suit: 'C'});
            hand.add({rank: 'A', suit: 'H'});
            expect(hand.getTotal()).to.eq(12);
        });
    });

    describe('stats', () => {
        it('calculates softTotal and hardTotal correctly', () => {
            let hand = new Hand();
            hand.add({rank: 'A', suit: 'D'});
            hand.add({rank: 6, suit: 'S'});
            let stats = hand.getStats();
            expect(stats.hardTotal).to.eq(7);
            expect(stats.softTotal).to.eq(17);

            hand = new Hand();
            hand.add({rank: 'A', suit: 'D'});
            hand.add({rank: 'Q', suit: 'S'});
            hand.add({rank: 9, suit: 'S'});
            stats = hand.getStats();
            expect(stats.hardTotal).to.eq(20);
            expect(stats.softTotal).to.eq(30);
        });
    });

});
