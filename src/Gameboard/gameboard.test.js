/* eslint-disable no-undef */
const GameBoard = require('./gameboard');

test('Gameboard returns a nested array with 10 x 10 containing [x,y] coordinates', () => {
  expect(GameBoard().grid.length).toBe(10);
  expect(GameBoard().grid[0].length).toBe(10);
  expect(GameBoard().grid[0][0].length).toBe(2);
});
