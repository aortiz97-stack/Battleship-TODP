const Ship = require('../Ship/ship');

const GameBoard = () => {
  const setGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        const pos = [];
        row.push(pos);
      }
      grid.push(row);
    }
    return grid;
  };

  const grid = setGrid();
  const getGrid = () => grid;
  const ships = [];

  const markGridAsOccupied = (length, coords, axis, ship) => {
    getGrid()[coords[0]][coords[1]] = ['o'];
    ship.shipCoords.push(coords);
    if (axis === 'x') {
      let newCoordX = coords[0] + 1;
      while (newCoordX < coords[0] + length) {
        getGrid()[newCoordX][coords[1]] = ['o'];
        ship.shipCoords.push([newCoordX, coords[1]]);
        newCoordX += 1;
      }
    } else if (axis === 'y') {
      let newCoordY = coords[1] + 1;
      while (newCoordY < coords[1] + length) {
        getGrid()[coords[0]][newCoordY] = ['o'];
        ship.shipCoords.push([coords[0], newCoordY]);
        newCoordY += 1;
      }
    }
    return ship;
  };
  const placeShip = (length, coords, axis = 'x') => {
    const newShip = Ship(length);
    const updatedShip = markGridAsOccupied(length, coords, axis, newShip);
    ships.push(updatedShip);
    return updatedShip;
  };

  return { grid, ships, placeShip };
};

module.exports = GameBoard;
