const GameBoard = require('../Gameboard/gameboard');

const Player = (playerMode = 'player') => {
  const gameBoard = GameBoard();
  const getGameBoard = () => gameBoard;
  const player = playerMode;
  const getPlayerType = () => player;

  return { getGameBoard, getPlayerType };
};

module.exports = Player;
