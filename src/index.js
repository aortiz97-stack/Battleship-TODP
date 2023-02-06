const Game = require('./Game/game');

const game = Game();

// Set basic board up
const gridContainer = document.querySelector('.grid-container');
const grid = game.getPlayer1().getGameBoard().getGrid();

const gameBoard = game.getPlayer1().getGameBoard();
gameBoard.placeShip(5, [3, 3], 'y');
gameBoard.placeShip(4, [1, 5]);
gameBoard.placeShip(3, [1, 2], 'y');
gameBoard.placeShip(3, [6, 6]);
gameBoard.placeShip(2, [4, 7], 'y');

for (let i = 0; i < grid.length; i += 1) {
  for (let j = 0; j < grid.length; j += 1) {
    const cell = document.createElement('div');
    // eslint-disable-next-line prefer-destructuring
    if (grid[i][j][0] !== 'empty') cell.innerHTML = grid[i][j][0];
    cell.classList.add(grid[i][j][0]);
    cell.classList.add(`[${i}, ${j}]`);
    gridContainer.appendChild(cell);
  }
}

const opponentGridContainer = document.querySelector('.opponent-grid-container');
const gameBoard2 = game.getPlayer2().getGameBoard();
const grid2 = game.getPlayer2().getGameBoard().getGrid();
gameBoard2.placeShip(5, [3, 3], 'y');
gameBoard2.placeShip(4, [1, 5]);
gameBoard2.placeShip(3, [1, 2], 'y');
gameBoard2.placeShip(3, [6, 6]);
gameBoard2.placeShip(2, [4, 7], 'y');

for (let i = 0; i < grid2.length; i += 1) {
  for (let j = 0; j < grid2.length; j += 1) {
    const cell = document.createElement('div');
    // eslint-disable-next-line prefer-destructuring
    cell.classList.add(grid[i][j][0]);
    opponentGridContainer.appendChild(cell);
  }
}

// Add event listener to grid
opponentGridContainer.addEventListener('click', (e) => {
  if (e.target.classList.includes('o')) {
    e.target.innerHTML = 'x';
    e.target.classList.remove('o');
    e.target.classList.add('x');
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        
      }
    }
  }
});
