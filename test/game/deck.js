import { expect } from 'chai';
import Deck from '../../app/game/deck';

describe('Deck', () => {

    it('has 52 elements', () => {
        const deck = new Deck();
        expect(deck.length).to.eq(52);
    });

    const deck = new Deck();
    for (var i = 0; i < 53; i++) {
        let card = deck.deal();
        it('each card has suit and rank', () => {
            expect(card).to.have.property('rank');
            expect(card).to.have.property('suit');
        });
    }
    it('creates a new deck when there is no more cards', () => {
        expect(deck.length).to.eq(51);
    });

    it('returns a smaller deck when dealt', () => {
        const deck = new Deck();
        deck.deal();
        expect(deck.length).to.eq(51);
    })
});
