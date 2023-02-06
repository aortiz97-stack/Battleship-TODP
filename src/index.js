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
    gridContainer.appendChild(cell);
  }
}

const gameBoard2 = game.getPlayer1(2).getGameBoard();
gameBoard2.placeShip(5, [3, 3], 'y');
gameBoard2.placeShip(4, [1, 5]);
gameBoard2.placeShip(3, [1, 2], 'y');
gameBoard2.placeShip(3, [6, 6]);
gameBoard2.placeShip(2, [4, 7], 'y');

//Add event listener to grid
gridContainer.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'o') {
      e.target.innerHTML = 'x';
      e.target.classList.remove('o');
      e.target.classList.
    }
});
