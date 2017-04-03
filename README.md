# Blackjack

This is a blackjack app built using ES6 classes as and few helper functions for game logic which are then passed to [React](https://facebook.github.io/react/) as a view layer. The build tool used is [Webpack](https://webpack.github.io/).

<p align="center">
    <img src="https://media.giphy.com/media/3ohzdQUcLBMpfxdAe4/giphy.gif" alt="Blackjack GIF">
</p>

### Details
- Dealer must hit on soft 17
- Single Deck. The deck is shuffled every 6 rounds.
- Player is not allowed to split cards.
- Keep track of win percentage for the player.

### Getting started
**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and ideally [Yarn](https://yarnpkg.com/) installed on your machine (npm is fine too).

**Step 2**. Install project dependencies listed in `package.json` by running:  
`yarn install` or `npm install`

**Step 3**. Compile and launch the app by running:  
`yarn start` or `npm start`

**Step 4**.
Open the app at [http://localhost:8080/](http://localhost:8080/)

### Tests
To run tests, run `yarn test(:watch)` or `npm test(:watch)`, `:watch` being an option.

### Documentation
To see documentation, run `yarn docs` or `npm run docs`.

### Demo
Demo can be seen at [http://vanja.gavric.org/playground/blackjack/](http://vanja.gavric.org/playground/blackjack/).

### Sources
Aside from third-party code listed in `package.json`, this third-party material/tools is used:

- [Noise Texture Generator](http://www.noisetexturegenerator.com/) for background
- [CSS3 Patterns Gallery](http://lea.verou.me/css3patterns/#argyl) as the face down card background pattern
- [Fontello](fontello.com) for icon font generation
- [Texture from DeviantArt](http://nortago.deviantart.com/art/Bg-Texture-wood-38841113) for table edge background

### To-do
- [ ] Write more tests
- [ ] Potentially further encapsulate game logic in the Game class
- [ ] Optimize for mobile / small screen
- [ ] Implement main layout based on Flexbox
- [ ] Implement better production build (image optimization, index.html,...)
- [ ] Animate dealer's second card flip
- [x] Animate game outcome; deck score
- [ ] Implement nicer card design (inspired by [http://helveticards.ryanmyers.me/](http://helveticards.ryanmyers.me/))
