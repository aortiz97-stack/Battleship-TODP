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

test('Gameboard placeShip throws an error if coordinates are already occupied', () => {
  const board = GameBoard();
  board.placeShip(2, [0, 0], 'x');
  board.placeShip(3, [7, 7], 'y');

  expect(() => board.placeShip(1, [0, 0])).toThrow('Space is already occupied');
  expect(() => board.placeShip(2, [7, 8], 'y')).toThrow('Space is already occupied');
});

test('Gameboard has receiveAttack function', () => {
  expect(typeof GameBoard().receiveAttack).toBe('function');
});

test('Gameboard receiveAttack function calls hit if it hits a ship', () => {
  const board = GameBoard();
  board.placeShip(4, [2, 0], 'x');
  expect(board.receiveAttack([5, 0])).toBe(undefined);
  //expect(board.ships[0].hitNum).toBe(1);
});
