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
  const spacedOccupied = (length, coords, axis) => {
    let coordX = coords[0];
    let coordY = coords[1];
    if (axis === 'x') {
      const finalCoordX = coordX + length - 1;
      while (coordX <= finalCoordX) {
        if (grid[coordX][coordY][0] === 'o') {
          return true;
        }
        coordX += 1;
      }
    } else if (axis === 'y') {
      const finalCoordY = coordY + length - 1;
      while (coordY <= finalCoordY) {
        if (grid[coordX][coordY][0] === 'o') {
          return true;
        }
        coordY += 1;
      }
    }
    return false;
  };
  const placeShip = (length, coords, axis = 'x') => {
    if (spacedOccupied(length, coords, axis)) {
      throw new Error('Space is already occupied');
    }
    const newShip = Ship(length);
    const updatedShip = markGridAsOccupied(length, coords, axis, newShip);
    ships.push(updatedShip);
    return updatedShip;
  };

  const receiveAttack = (coords) => {
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      for (let j = 0; j < ship.shipCoords.length; j += 1) {
        const shipCoord = ship.shipCoords[j];
        if (JSON.stringify(coords) === JSON.stringify(shipCoord)) {
          ship.hit();
        }
      }
    }
  };

  return {
    grid, ships, placeShip, receiveAttack,
  };
};

module.exports = GameBoard;
