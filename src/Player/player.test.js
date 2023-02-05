/* eslint-disable no-undef */
const Player = require('./player');
const GameBoard = require('../Gameboard/gameboard');

test('Player can create player objects', () => {
  expect(typeof Player()).toBe('object');
});

test('Player creates a gameboard and stores it for player', () => {
  expect(JSON.stringify(Player().gameBoard)).toEqual(JSON.stringify(GameBoard()));
});
