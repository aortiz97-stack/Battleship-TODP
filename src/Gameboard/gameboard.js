const GameBoard = () => {
  const setGrid = () => {
    const grid = [];

    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        const coord = [];
        coord.push(i);
        coord.push(j);
        row.push(coord);
      }
      grid.push(row);
    }
    return grid;
  };
  const grid = setGrid();

  return { grid };
};
module.exports = GameBoard;
