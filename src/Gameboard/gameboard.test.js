/* eslint-disable no-undef */
const GameBoard = require('./gameboard');

test('Gameboard returns a nested array with 10 x 10 containing [x,y] coordinates', () => {
  expect(GameBoard().getGrid().length).toBe(10);
  expect(GameBoard().getGrid()[0].length).toBe(10);
});

test('Gameboard has placeShip function', () => {
  expect(typeof GameBoard().placeShip).not.toBe('undefined');
});

test('Gameboard placeShip creates ship object and places in array', () => {
  const board = GameBoard();
  board.placeShip(3, [0, 0]);
  expect(board.getShips().length).toEqual(1);
});

test('Gameboard placeShip marks coordinates as occupied', () => {
  const board = GameBoard();
  board.placeShip(2, [0, 0], 'x');
  expect(board.getGrid()[0][0]).toEqual(['o']);
  expect(board.getGrid()[0][1]).toEqual(['o']);
  expect(board.getGrid()[0][2]).not.toEqual(['o']);
});

test('Gameboard placeShip throws an error if coordinates are already occupied', () => {
  const board = GameBoard();
  board.placeShip(2, [0, 0], 'y');
  board.placeShip(3, [7, 7], 'x');

  expect(() => board.placeShip(1, [0, 0])).toThrow('Space is already occupied');
  expect(() => board.placeShip(2, [7, 8], 'x')).toThrow('Space is already occupied');
});

test('Gameboard has receiveAttack function', () => {
  expect(typeof GameBoard().receiveAttack).toBe('function');
});

test('Gameboard receiveAttack function calls hit if it hits a ship', () => {
  const board = GameBoard();
  board.placeShip(4, [2, 0], 'x');
  board.receiveAttack([2, 3]);
  expect(board.getShips()[0].getHitNum()).toBe(1);
});

test('Gameboard marks cell with x if a ship is hit', () => {
  const board = GameBoard();
  board.placeShip(4, [2, 0], 'y');
  board.receiveAttack([5, 0]);
  expect(board.getGrid()[5][0]).toEqual(['x']);
});

test('Gameboard cell with with . if it is a missed shot', () => {
  const board = GameBoard();
  board.placeShip(4, [2, 0], 'x');
  board.receiveAttack([6, 0]);
  expect(board.getGrid()[6][0]).toEqual(['.']);
});

test('Gameboard has function that tests to see if all ships are sunk', () => {
  expect(GameBoard().allShipsSunk).not.toBe(undefined);
});

test('Gameboard allShips sunk returns true if all ships are sunk', () => {
  const board = GameBoard();
  board.placeShip(1, [2, 0]);
  board.placeShip(1, [9, 9]);
  board.receiveAttack([2, 0]);
  board.receiveAttack([9, 9]);
  expect(board.allShipsSunk()).toBe(true);
});

test('Gameboard allShips sunk returns false if not all ships are sunk', () => {
  const board = GameBoard();
  board.placeShip(1, [2, 0]);
  board.placeShip(1, [9, 9]);
  board.receiveAttack([2, 0]);
  expect(board.allShipsSunk()).toBe(false);
});

test('Gameboard getShipfromGridCoords returns ship with coordinates', () => {
  const board = GameBoard();
  board.placeShip(2, [2, 0]);
  expect(board.getShipIdxfromGridCoords([2, 1]))
    .toBe(0);

  board.placeShip(3, [6, 0], 'y');
  expect(board.getShipIdxfromGridCoords([1, 1])).toBe(null);
});
