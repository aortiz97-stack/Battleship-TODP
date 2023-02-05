const Player = require('../Player/player');

const Game = () => {
  const player1 = Player();
  const player2 = Player('computer');

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  const gameOver = () => (getPlayer1().getGameBoard().allShipsSunk()
    || getPlayer2().getGameBoard().allShipsSunk());

  const declareWinner = () => {
    if (gameOver()) {
      if (getPlayer1.getGameBoard().allShipsSunk()) alert("Congratulations, you've won!");
      else if (getPlayer2.getGameBoard().allShipsSunk()) alert("Sorry, you've lost");
      else alert('The game is a draw');
    }
  };

  return {
    getPlayer1, getPlayer2, gameOver, declareWinner,
  };
};

module.exports = Game;
