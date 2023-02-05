const Game = require('./Game/game');

const game = Game();

//Set basic board up
const gridContainer = document.querySelector('.grid-container');
const grid = game.getPlayer1().getGameBoard().getGrid();
for (let i = 0; i < grid.length; i += 1) {
  for (let j = 0; j < grid.length; j += 1) {
    const cell = document.createElement('div');
    // eslint-disable-next-line prefer-destructuring
    cell.innerHTML = grid[i][j][0];
    gridContainer.appendChild(cell);
  }
}
