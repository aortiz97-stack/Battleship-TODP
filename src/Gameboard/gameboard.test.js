/* eslint-disable no-undef */
const GameBoard = require('./gameboard');
const Ship = require('../Ship/ship');

test('Gameboard returns a nested array with 10 x 10 containing [x,y] coordinates', () => {
  expect(GameBoard().grid.length).toBe(10);
  expect(GameBoard().grid[0].length).toBe(10);
});

test('Gameboard has placeShip function', () => {
  expect(typeof GameBoard().placeShip).not.toBe('undefined');
});

test('Gameboard placeShip creates ship object and places in array', () => {
  const board = GameBoard();
  board.placeShip(3, [0, 0]);
  expect(board.ships.length).toEqual(1);
});

test('Gameboard placeShip marks coordinates as occupied', () => {
  const board = GameBoard();
  board.placeShip(2, [0, 0], 'x');
  expect(board.grid[0][0]).toEqual(['o']);
  expect(board.grid[1][0]).toEqual(['o']);
  expect(board.grid[2][0]).not.toEqual(['o']);
});
