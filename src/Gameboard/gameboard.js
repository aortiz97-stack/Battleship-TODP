const Ship = require('../Ship/ship');

const GameBoard = () => {
  const setGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        const pos = ['empty'];
        row.push(pos);
      }
      grid.push(row);
    }
    return grid;
  };

  const grid = setGrid();
  const getGrid = () => grid;
  const ships = [];
  const getShips = () => ships;

  const markGridAsOccupied = (length, coords, axis, ship) => {
    getGrid()[coords[0]][coords[1]] = ['o'];
    ship.getShipCoords().push(coords);
    if (axis === 'row') {
      let newCoordY = coords[1] + 1;
      while (newCoordY < coords[1] + length) {
        getGrid()[coords[0]][newCoordY] = ['o'];
        ship.getShipCoords().push([coords[0], newCoordY]);
        newCoordY += 1;
      }
    } else if (axis === 'col') {
      let newCoordX = coords[0] + 1;
      while (newCoordX < coords[0] + length) {
        getGrid()[newCoordX][coords[1]] = ['o'];
        ship.getShipCoords().push([newCoordX, coords[1]]);
        newCoordX += 1;
      }
    }
    return ship;
  };
  const spacedOccupied = (length, coords, axis) => {
    let coordX = coords[0];
    let coordY = coords[1];
    if (axis === 'row') {
      const finalCoordY = coordY + length - 1;
      while (coordY <= finalCoordY) {
        if (grid[coordX][coordY][0] === 'o') {
          return true;
        }
        coordY += 1;
      }
    } else if (axis === 'col') {
      const finalCoordX = coordX + length - 1;
      while (coordX <= finalCoordX) {
        if (grid[coordX][coordY][0] === 'o') {
          return true;
        }
        coordX += 1;
      }
    }
    return false;
  };
  const placeShip = (length, coords, axis = 'row') => {
    if (spacedOccupied(length, coords, axis)) {
      throw new Error('Space is already occupied');
    }
    const newShip = Ship(length);
    const updatedShip = markGridAsOccupied(length, coords, axis, newShip);
    ships.push(updatedShip);
    return updatedShip;
  };

  const receiveAttack = (coords) => {
    let shipHit = false;
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      for (let j = 0; j < ship.getShipCoords().length; j += 1) {
        const shipCoord = ship.getShipCoords()[j];
        if (JSON.stringify(coords) === JSON.stringify(shipCoord)) {
          ship.hit();
          grid[coords[0]][coords[1]] = ['x'];
          shipHit = true;
        }
      }
    }
    if (!shipHit) {
      grid[coords[0]][coords[1]] = ['.'];
    }
  };

  const getShipIdxfromGridCoords = (targetCoords) => {
    for (let i = 0; i < getShips().length; i += 1) {
      const ship = getShips()[i];
      for (let j = 0; j < ship.getShipCoords().length; j += 1) {
        const coord = ship.getShipCoords()[j];
        if (JSON.stringify(targetCoords) === JSON.stringify(coord)) {
          return i;
        }
      }
    }
    return null;
  };

  const allShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  return {
    getGrid, getShips, placeShip, receiveAttack, allShipsSunk, getShipIdxfromGridCoords,
  };
};

module.exports = GameBoard;
