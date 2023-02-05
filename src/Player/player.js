const GameBoard = require('../Gameboard/gameboard');

const Player = (playerMode = 'player') => {
  const gameBoard = GameBoard();
  const player = playerMode;
  const getPlayerType = () => player;

  return { gameBoard, getPlayerType };
};

module.exports = Player;
