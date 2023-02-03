const Ship = (inputLength = 1) => {
  const length = inputLength;
  let hitNum = 0;

  const getLength = () => length;

  const getHitNum = () => hitNum;
  const setHitNum = (newHitNum) => { hitNum = newHitNum; };

  const hit = () => { setHitNum(1); };

  const isSunk = () => {
    if (getHitNum() >= getLength()) {
      return true;
    }
    return false;
  };

  return {
    length, hitNum, isSunk, hit,
  };
};

module.exports = Ship;
