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

    while (enemyBoard.getGrid()[randX][randY][0] !== 'empty') {
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
      console.log(`possibleX: ${possibleX}`);
      console.log(`possibleY: ${possibleY}`);
      console.log(`x truth: ${(possibleX >= 0 || possibleX <= 9)}`);
      if (((possibleX >= 0 && possibleX <= 9) && (possibleY >= 0 && possibleY <= 9)) && enemyBoard.getGrid()[possibleX][possibleY] === 'empty') {
        viableHits.push(possibleHits[i]);
      }
    }

    const randomIdx = Math.floor(Math.random() * (viableHits.length));

    console.log(`viableHits: ${viableHits}`);

    if (viableHits.length === 0) return getRandCompHit();

    return viableHits[randomIdx];
  };

  const getCompCoord = () => {
    if (getPrevCompHit() !== null) {
      return getNonRandCompHit();
    }
    return getRandCompHit();
  };

  const playComputerRound = () => {
    console.log('exterminate');
    const enemyGrid = document.querySelector('.grid-container');
    const enemyBoard = getOtherPlayer().getGameBoard();

    function changeHTML(coord) {
      const enemyGridCell = enemyGrid.getElementsByClassName(JSON.stringify(coord))[0];
      console.log('beep');
      if (enemyGridCell.classList.contains('o')) {
        console.log('pop goes the weasel');
        enemyGridCell.innerHTML = 'x';
        enemyGridCell.classList.remove('o');
        enemyGridCell.classList.add('x');
      } else if (enemyGridCell.classList.contains('empty')) {
        enemyGridCell.innerHTML = '.';
        enemyGridCell.classList.remove('empty');
        enemyGridCell.classList.add('missed');
      } else if (enemyGridCell.classList.contains('.') || enemyGridCell.classList.contains('x')) {
        switchController();
      }
    }
    const attackCoord = getCompCoord();
    enemyBoard.receiveAttack(attackCoord);
    changeHTML(attackCoord);

    setPrevCompHit(attackCoord);
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
        htmlChanges('x', 'o', 'x');
        coord = coordFunc(e);
        enemyBoard.receiveAttack(coord);
      } else if (e.target.classList.contains('empty')) {
        htmlChanges('.', 'empty', 'missed');
        coord = coordFunc(e);
        enemyBoard.receiveAttack(coord);
      } else if (e.target.classList.contains('.') || e.target.classList.contains('x')) {
        switchController();
      }
      return coord;
    }

    if (JSON.stringify(getController()) === JSON.stringify(getPlayer1())) {
      processHit(getCoord);
    } else if (JSON.stringify(getController()) === JSON.stringify(getPlayer2()) && getController().getPlayerType === 'computer') {
      playComputerRound();
    }
    switchController();
    console.log(`controller: ${getController().getPlayerType()}`);
  };
  return {
    getPlayer1, getPlayer2, gameOver, declareWinner, playRound, playComputerRound, switchController,
  };
};

module.exports = Game;
