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

  return {
    getLength, getHitNum, isSunk, hit, getShipCoords,
  };
};

module.exports = Ship;
