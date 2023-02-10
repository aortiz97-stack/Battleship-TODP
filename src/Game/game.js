const Player = require('../Player/player');
const Ship = require('../Ship/ship');

const Game = () => {
  const player1 = Player();
  const player2 = Player('computer');

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  let controller = getPlayer1();
  let otherPlayer = getPlayer2();
  const getController = () => controller;
  const getOtherPlayer = () => otherPlayer;

  const switchController = () => {
    const oldController = getController();
    controller = otherPlayer;
    otherPlayer = oldController;
  };

  let prevComputerHitCoord = null;
  const getPrevCompHit = () => prevComputerHitCoord;
  const setPrevCompHit = (newHitCoord) => { prevComputerHitCoord = newHitCoord; };

  const gameOver = () => {
    if (getPlayer1().getGameBoard().allShipsSunk() || getPlayer2().getGameBoard().allShipsSunk()) {
      return true;
    }
    for (let rowNum = 0; rowNum < 10; rowNum += 1) {
      for (let colNum = 0; colNum < 10; colNum += 1) {
        if (getPlayer1().getGameBoard().getGrid()[rowNum][colNum][0] === 'empty') return false;
      }
    }
    return true;
  };

  const declareWinner = () => {
    if (gameOver()) {
      if (getPlayer2().getGameBoard().allShipsSunk() && !getPlayer1().getGameBoard().allShipsSunk()) alert("Congratulations, you've won!");
      else if (getPlayer1().getGameBoard().allShipsSunk() && !getPlayer2().getGameBoard().allShipsSunk()) alert("Sorry, you've lost");
      else alert('The game is a draw');
    }
  };

  const getRandCompHit = () => {
    const enemyBoard = getOtherPlayer().getGameBoard();

    let randX = Math.floor(Math.random() * 10);
    let randY = Math.floor(Math.random() * 10);

    while (enemyBoard.getGrid()[randX][randY][0] !== 'empty' && enemyBoard.getGrid()[randX][randY][0] !== 'o') {
      randX = Math.floor(Math.random() * 10);
      randY = Math.floor(Math.random() * 10);
    }
    return [randX, randY];
  };

  const getNonRandCompHit = () => {
    const enemyBoard = getOtherPlayer().getGameBoard();

    const prevCoord = getPrevCompHit();
    const prevX = prevCoord[0];
    const prevY = prevCoord[1];

    const possibleHits = [
      [prevX + 1, prevY],
      [prevX - 1, prevY],
      [prevX, prevY + 1],
      [prevX, prevY - 1],
    ];

    const viableHits = [];
    for (let i = 0; i < possibleHits.length; i += 1) {
      const possibleX = possibleHits[i][0];
      const possibleY = possibleHits[i][1];
      if (((possibleX >= 0 && possibleX <= 9) && (possibleY >= 0 && possibleY <= 9))
      && ((enemyBoard.getGrid()[possibleX][possibleY][0] === 'empty') || (enemyBoard.getGrid()[possibleX][possibleY][0] === 'o'))) {
        viableHits.push(possibleHits[i]);
      }
    }
    if (viableHits.length === 0) {
      const randHit = getRandCompHit();
      return randHit;
    }
    const randomIdx = Math.floor(Math.random() * (viableHits.length));

    return viableHits[randomIdx];
  };

  const getCompCoord = () => {
    if (getPrevCompHit() !== null) {
      return getNonRandCompHit();
    }
    return getRandCompHit();
  };

  const playComputerRound = () => {
    const enemyBoard = getOtherPlayer().getGameBoard();

    function changeHTML(coord) {
      const enemyGridCell = document.getElementsByClassName(`${JSON.stringify(coord)}`)[0];
      if (enemyGridCell.classList.contains('o')) {
        enemyGridCell.innerHTML = 'x';
        enemyGridCell.classList.remove('o');
        enemyGridCell.classList.add('x');
      } else if (enemyGridCell.classList.contains('empty')) {
        enemyGridCell.innerHTML = '.';
        enemyGridCell.classList.remove('empty');
        enemyGridCell.classList.add('missed');
      }
    }
    const attackCoord = getCompCoord();
    enemyBoard.receiveAttack(attackCoord);
    changeHTML(attackCoord);
    if (enemyBoard.getGrid()[attackCoord[0]][attackCoord[1]][0] === 'x') setPrevCompHit(attackCoord);
    else setPrevCompHit(null);
    switchController();
  };

  const playRound = (e) => {
    const enemyBoard = getOtherPlayer().getGameBoard();
    function getCoord(event) {
      let coord;
      for (let i = 0; i < event.target.classList.length; i += 1) {
        const c = event.target.classList[i];
        if (c[0] === '[') {
          coord = JSON.parse(c);
        }
      }
      return coord;
    }
    function htmlChanges(newInnerHTML, removeClass, addClass) {
      e.target.innerHTML = newInnerHTML;
      e.target.classList.remove(removeClass);
      e.target.classList.add(addClass);
    }
    function processHit(coordFunc) {
      let coord;
      if (e.target.classList.contains('o')) {
        coord = coordFunc(e);
        enemyBoard.receiveAttack(coord);
        htmlChanges('x', 'o', 'x');
      } else if (e.target.classList.contains('empty')) {
        coord = coordFunc(e);
        enemyBoard.receiveAttack(coord);
        htmlChanges('.', 'empty', 'missed');
      }
      return coord;
    }
    if (JSON.stringify(getController()) === JSON.stringify(getPlayer1())) {
      processHit(getCoord);
    }
    switchController();
  };

  const getShipInitCoords = (shipType) => {
    function useRegex(input) {
      const regex = /\[[^\]]*\]/i;
      return regex.test(input);
    }
    const length = Ship().getShipTypeLength(shipType);
    const beginningCoords = prompt(`Enter the beginning coordinates for your ${shipType} of length ${length}`);
    if (!useRegex(beginningCoords)) {
      throw new Error('Invalid coordinate input. Please write your coordinate as [#, #]');
    }
    return JSON.parse(beginningCoords);
  };

  const demoPlacement = (coords, axis, shipType) => {
    const length = Ship().getShipTypeLength(shipType);
    const allCoords = [];
    if (axis === 'row') {
      let currY = coords[1];
      for (let i = 0; i < length; i += 1) {
        if (currY >= 0 && currY <= 9) {
          allCoords.push([coords[0], currY]);
        } else {
          throw new Error("The board cannot accomodate your ship's entire length at the proposed coordinates.");
        }
        currY += 1;
      }
    } else if (axis === 'col') {
      let currX = coords[0];
      for (let i = 0; i < length; i += 1) {
        if (currX >= 0 && currX <= 9) {
          allCoords.push([currX, coords[1]]);
        } else {
          throw new Error("The board cannot accomodate your ship's entire length at the proposed coordinates.");
        }
        currX += 1;
      }
    }
    for (let i = 0; i < allCoords.length; i += 1) {
      const coord = allCoords[i];
      const gridCell = document.getElementsByClassName(JSON.stringify(coord))[0];
      gridCell.classList.add('demo');
    }

    function confirmDemo() {
      const confirm = prompt('Is this position ok? Write in "yes" or "no".');
      if (confirm.toLowerCase() === 'yes') {
        const allDemos = Array.from(document.getElementsByClassName('demo'));
        for (let i = 0; i < allDemos.length; i += 1) {
          const demoCell = allDemos[i];
          demoCell.classList.remove('demo');
          demoCell.classList.add('o');
          demoCell.innerHTML = 'o';
        }
      } else if (confirm.toLowerCase() === 'no') {
        const allDemos = Array.from(document.getElementsByClassName('demo'));
        for (let i = 0; i < allDemos.length; i += 1) {
          const demoCell = allDemos[i];
          demoCell.classList.remove('demo');
        }
        const newCoords = getShipInitCoords(shipType);
        demoPlacement(newCoords, axis, shipType);
      } else {
        throw new Error('Invalid input. Please type "yes" or "no"');
      }
      return coords;
    }
    setTimeout(confirmDemo, 1000);
    return coords;
  };

  const placeShipsHTML = () => {
    function makeAxisButton() {
      const overallContainer = document.createElement('div');
      overallContainer.id = 'axis-placement-container';
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'button-container';

      const rowButton = document.createElement('button');
      rowButton.classList.add('row');
      rowButton.innerHTML = 'Row';
      const colButton = document.createElement('button');
      colButton.classList.add('col');
      colButton.innerHTML = 'Column';

      buttonContainer.appendChild(rowButton);
      buttonContainer.appendChild(colButton);

      const p = document.createElement('p');
      p.innerHTML = 'Toggle if you would like your ship to align along the row or column';

      overallContainer.appendChild(p);
      overallContainer.appendChild(buttonContainer);

      document.querySelector('body').prepend(overallContainer);
    }
    makeAxisButton();

    const buttonContainer = document.querySelector('div#button-container');
    let allShipsPlaced = false;
    const shipsList = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
    let idx = 0;

    buttonContainer.addEventListener('click', (e) => {
      if (!allShipsPlaced) {
        let axis;
        if (e.target.classList.contains('row')) {
          axis = 'row';
        } else if (e.target.classList.contains('col')) {
          axis = 'col';
        }
        const initShipCoord = getShipInitCoords(shipsList[idx]);
        if (getPlayer1().getGameBoard().getShipIdxfromGridCoords(initShipCoord) !== null) {
          throw new Error('There is a ship already there. Please enter another coordinate.');
        }
        const finalCoords = demoPlacement(initShipCoord, axis, shipsList[idx]);
        const shipLength = Ship().getShipTypeLength(shipsList[idx]);
        if (axis === 'row') {
          let newY = finalCoords[1];
          for (let i = 0; i < shipLength; i += 1) {
            const currCoord = [finalCoords[0], newY];
            if (getPlayer1().getGameBoard().getShipIdxfromGridCoords(currCoord) !== null) {
              throw new Error('There is a ship already there. Please enter another coordinate.');
            }
            newY += 1;
          }
        } else if (axis === 'col') {
          let newX = finalCoords[1];
          for (let i = 0; i < shipLength; i += 1) {
            const currCoord = [newX, finalCoords[1]];
            if (getPlayer1().getGameBoard().getShipIdxfromGridCoords(currCoord) !== null) {
              throw new Error('There is a ship already there. Please enter another coordinate.');
            }
            newX += 1;
          }
        }
        getPlayer1().getGameBoard().placeShip(shipLength, finalCoords, axis);
        idx += 1;

        if (idx === shipsList.length) allShipsPlaced = true;
      }
    });
    return allShipsPlaced;
  };

  const setUpYourHTMLBoard = () => {
    const gridContainer = document.querySelector('.grid-container');
    const grid = getPlayer1().getGameBoard().getGrid();
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid.length; j += 1) {
        const cell = document.createElement('div');
        // eslint-disable-next-line prefer-destructuring
        cell.classList.add('empty');
        cell.classList.add(JSON.stringify([i, j]));
        gridContainer.appendChild(cell);
      }
    }
    if (placeShipsHTML()) {
      for (let i = 0; i < grid.length; i += 1) {
        for (let j = 0; j < grid.length; j += 1) {
          const cell = document.getElementsByClassName(JSON.stringify([i, j]))[0];
          // eslint-disable-next-line prefer-destructuring
          if (grid[i][j][0] !== 'empty') {
            // eslint-disable-next-line prefer-destructuring
            cell.innerHTML = grid[i][j][0];
          }
          cell.classList.add(grid[i][j][0]);
        }
      }
    }
  };

  const placeComputerShipsRandom = () => {
    const opponentGridContainer = document.querySelector('.opponent-grid-container');
    const gameBoard2 = getPlayer2().getGameBoard();
    const grid2 = getPlayer2().getGameBoard().getGrid();

    function getRandomPlacement() {
      const axisDetermine = Math.floor(Math.random() * 2);
      let axis;
      if (axisDetermine === 0) axis = 'row';
      else if (axisDetermine === 1) axis = 'col';
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      return [row, col, axis];
    }

    function placePotentialShip(length) {
      const randomPlacement = getRandomPlacement();
      const randomCoords = [randomPlacement[0], randomPlacement[1]];
      const axis = randomPlacement[2];
      try {
        gameBoard2.placeShip(length, randomCoords, axis);
      } catch {
        placePotentialShip(length);
      }
    }

    placePotentialShip(5);
    placePotentialShip(4);
    placePotentialShip(3);
    placePotentialShip(3);
    placePotentialShip(2);

    for (let i = 0; i < grid2.length; i += 1) {
      for (let j = 0; j < grid2.length; j += 1) {
        const cell = document.createElement('div');
        // eslint-disable-next-line prefer-destructuring
        cell.classList.add(grid2[i][j][0]);
        cell.classList.add(JSON.stringify([i, j]));
        opponentGridContainer.appendChild(cell);
      }
    }
  };

  const playGame = () => {
    let gameHasEnded = false;
    const opponentGridContainer = document.querySelector('.opponent-grid-container');
    // Add event listener to grid
    opponentGridContainer.addEventListener('click', (e) => {
      if ((e.target.classList.contains('o') || e.target.classList.contains('empty')) && !gameHasEnded) {
        playRound(e);
        if (gameOver()) {
          gameHasEnded = true;
          declareWinner();
        }
        setTimeout(playComputerRound, 0);
        if (gameOver()) {
          gameHasEnded = true;
          declareWinner();
        }
      }
    });
  };

  return {
    getPlayer1,
    getPlayer2,
    gameOver,
    declareWinner,
    playRound,
    playComputerRound,
    switchController,
    setUpYourHTMLBoard,
    placeComputerShipsRandom,
  };
};

module.exports = Game;
