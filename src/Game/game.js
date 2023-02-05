const Player = require('../Player/player');

const Game = () => {
  const player1 = Player();
  const player2 = Player('computer');

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  return { getPlayer1, getPlayer2 };
};

module.exports = Game;
