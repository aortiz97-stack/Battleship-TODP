const GameBoard = require('../Gameboard/gameboard');

const Player = () => {
  const gameBoard = GameBoard();

  return { gameBoard };
};

module.exports = Player;
