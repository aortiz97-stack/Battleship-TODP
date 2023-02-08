/* eslint-disable no-undef */
const Ship = require('./ship');

test('Ship is a factory function', () => {
  expect(typeof Ship).not.toBe('undefined');
});

test('Ship() has length attribute', () => {
  expect(typeof Ship().getLength()).not.toBe('undefined');
});

test('Ship() has hitNum attribute', () => {
  expect(typeof Ship().getHitNum()).not.toBe('undefined');
});

test('Ship receives a length parameter and updates length parameter', () => {
  expect(Ship(4).getLength()).toBe(4);
  expect(Ship().getLength()).toBe(1);
});

test('Ship has hit() function', () => {
  expect(typeof Ship().hit).not.toBe('undefined');
});

test('Ship has isSunk() function', () => {
  expect(typeof Ship().isSunk).not.toBe('undefined');
});

test('Ship has array with coordinates it occupies', () => {
  expect(typeof Ship().getShipCoords()).not.toBe('undefined');
});

test('Ship object returns isSunk appropriately', () => {
  const ship1 = Ship();
  ship1.hit();
  const ship2 = Ship(4);
  ship2.hit();
  expect(ship1.isSunk()).toBe(true);
  expect(ship2.isSunk()).toBe(false);
});
