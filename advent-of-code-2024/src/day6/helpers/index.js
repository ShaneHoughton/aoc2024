

const findPath = (mapMatrix) => {
  let map = [...mapMatrix];
  const findGuard = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === "^") return [y, x];
      }
    }
    return [-1, -1];
  };
  // for the guard to leave she needs to reach the left, right, top or bottom

  const tracePath = (staringPosition, startingDirection) => {
    let positions = 0;
    // if the gaurd's x is 0(left) or y is 0(top), or x is === row[y].length(right) or y is === map.length(bottom)
    const nextDirectionMap = {
      "^": ">",
      ">": "v",
      v: "<",
      "<": "^",
    };
    const isOnGaurdOnEdge = ([y, x]) => {
      return (
        x === 0 || x === map[y].length - 1 || y === 0 || y === map.length - 1
      );
    };

    let [y, x] = staringPosition;
    let guardDirection = startingDirection;

    do {
      let nextMove = [0, 0]; // change in Y, X
      if (guardDirection === "^") {
        nextMove = [-1, 0];
      } else if (guardDirection === "v") {
        nextMove = [1, 0];
      } else if (guardDirection === ">") {
        nextMove = [0, 1];
      } else if (guardDirection === "<") {
        nextMove = [0, -1];
      }

      if (
        map[y + nextMove[0]][x + nextMove[1]] &&
        map[y + nextMove[0]][x + nextMove[1]] === "#"
      ) {
        console.log("turn");
        // if (map[nextY][nextX] === "O") Ocount++;
        // if (Ocount > 1) return true;
        guardDirection = nextDirectionMap[guardDirection];
      } else {
        console.log([y, x]);
        map[y][x] = "X";
        y = y + nextMove[0];
        x = x + nextMove[1];
        console.log([y, x]);
      }
    } while (!isOnGaurdOnEdge([x, y]));

    return positions;
  };

  const guardPosition = findGuard();
  tracePath(guardPosition, "^");
  let positions = 1;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "X") positions++;
    }
  }
  console.log(positions);
};
findPath(data);
