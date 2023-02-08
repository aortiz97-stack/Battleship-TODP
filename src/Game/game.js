const Player = require('../Player/player');

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

  const gameOver = () => (getPlayer1().getGameBoard().allShipsSunk()
    || getPlayer2().getGameBoard().allShipsSunk());

  const declareWinner = () => {
    if (gameOver()) {
      if (getPlayer1.getGameBoard().allShipsSunk()) alert("Congratulations, you've won!");
      else if (getPlayer2.getGameBoard().allShipsSunk()) alert("Sorry, you've lost");
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
    console.log(`what is going on here fellas ${enemyBoard.getGrid()[randX][randY]}`);
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
      return getRandCompHit();
      //return getNonRandCompHit();
    }
    return getRandCompHit();
  };

  const playComputerRound = () => {
    const enemyBoard = getOtherPlayer().getGameBoard();

    function changeHTML(coord) {
      const enemyGridCell = document.getElementsByClassName(`${JSON.stringify(coord)}`)[0];
      console.log(`theclasslist ${Array.from(enemyGridCell.classList)}`);
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
  return {
    getPlayer1, getPlayer2, gameOver, declareWinner, playRound, playComputerRound, switchController,
  };
};

module.exports = Game;
