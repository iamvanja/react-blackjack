/**
 * Gets the winner.
 *
 * @param      {number}         playerScore  The player score
 * @param      {number}         dealerScore  The dealer score
 * @return     {boolean|null}   true = win, false = lost, null = push
 */
export function getWinner(playerScore, dealerScore) {
    switch(true) {
        case (playerScore === dealerScore):
        case (playerScore > 21 && dealerScore > 21):
            return null;
        case (playerScore > 21):
        case (dealerScore > playerScore && dealerScore <= 21):
            return false;
        default:
            return true;
    }
}

/**
 * Dealer AI.
 * Hit until score of 16 or soft 17.
 * Do not hit if the player is already bust
 * or the player has blackjack.
 *
 * @param      {object}  dealerHand  The dealer hand
 * @param      {object}  deck        The deck
 * @param      {object}  playerHand  The player hand
 */
export function dealerDrawing(dealerHand, deck, playerHand) {
    if (!playerHand.isBust && !playerHand.hasBlackjack) {
        for (let stats = dealerHand.scoreStats; (stats.hardTotal < 17) || (stats.softTotal === 17);) {
            dealerHand.draw(deck.deal());
        }
    }
}

/**
 * Calculates the win percentage
 * given the win and round count.
 *
 * @param      {number}  winCount    The win count
 * @param      {number}  roundCount  The round count
 * @return     {string}  The win percentage.
 */
export function calculateWinPercentage(winCount, roundCount) {
    let num = (winCount / roundCount);
    num = isNaN(num) ? 0 : isFinite(num) ? num : 0;

    return +(num * 100).toFixed(2) + '%';
}
