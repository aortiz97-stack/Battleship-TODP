const Player = require('../Player/player');

const Game = () => {
  const player1 = Player();
  const player2 = Player('computer');

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  const gameEnded = () => getPlayer1().getGameBoard().allShipsSunk() 
  || getPlayer2().getGameBoard().allShipsSunk();

  return { getPlayer1, getPlayer2, gameEnded };
};

module.exports = Game;
