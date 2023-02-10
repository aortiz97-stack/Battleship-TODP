const Game = require('./Game/game');

const game = Game();

// Set basic board up
game.setUpYourHTMLBoard();

game.placeComputerShipsRandom();
