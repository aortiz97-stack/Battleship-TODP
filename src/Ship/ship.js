const Ship = (inputLength = 1) => {
  const length = inputLength;
  let hitNum = 0;

  const getLength = () => length;

  const getHitNum = () => hitNum;
  const setHitNum = (newHitNum) => { hitNum = newHitNum; };

  const hit = () => { setHitNum(getHitNum() + 1); };

  const isSunk = () => {
    if (getHitNum() >= getLength()) {
      return true;
    }
    return false;
  };

  const shipCoords = [];
  const getShipCoords = () => shipCoords;

  const getShipTypeLength = (shipType) => {
    let shipTypeLength;
    if (shipType === 'carrier') shipTypeLength = 5;
    else if (shipType === 'battleship') shipTypeLength = 4;
    else if (shipType === 'cruiser') shipTypeLength = 3;
    else if (shipType === 'submarine') shipTypeLength = 3;
    else if (shipType === 'destroyer') shipTypeLength = 2;
    return shipTypeLength;
  };

  return {
    getLength, getHitNum, isSunk, hit, getShipCoords, getShipTypeLength,
  };
};

module.exports = Ship;
