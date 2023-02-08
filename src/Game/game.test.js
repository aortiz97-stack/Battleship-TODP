/* eslint-disable no-undef */
const Game = require('./game');
const Player = require('../Player/player');

test('Game creates two player objects', () => {
  expect(JSON.stringify(Game().getPlayer1())).toEqual(JSON.stringify(Player()));
  expect(JSON.stringify(Game().getPlayer2())).toEqual(JSON.stringify(Player('computer')));
});

test('Game determines if the game has ended', () => {
  expect(typeof Game().gameOver).not.toBe(undefined);
});

test('Game ends game if human player loses', () => {
  const game = Game();
  const play1Board = game.getPlayer1().getGameBoard();
  const play2Board = game.getPlayer2().getGameBoard();

  play1Board.placeShip(1, [0, 0]);
  play2Board.placeShip(1, [0, 0]);

  play1Board.receiveAttack([0, 0]);

  expect(game.gameOver()).toBe(true);
});

test('Game ends game if computer player loses', () => {
  const game = Game();
  const play1Board = game.getPlayer1().getGameBoard();
  const play2Board = game.getPlayer2().getGameBoard();

  play1Board.placeShip(1, [0, 0]);
  play2Board.placeShip(1, [0, 0]);

  play2Board.receiveAttack([0, 0]);

  expect(game.gameOver()).toBe(true);
});
