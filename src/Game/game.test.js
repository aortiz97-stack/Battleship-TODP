/* eslint-disable no-undef */
const Game = require('./game');
const Player = require('../Player/player');

test('Game creates two player objects', () => {
  expect(JSON.stringify(Game().getPlayer1())).toEqual(JSON.stringify(Player()));
  expect(JSON.stringify(Game().getPlayer2())).toEqual(JSON.stringify(Player('computer')));
});
