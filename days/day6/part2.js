import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const makeMapMatrix = (input) => input.map((row) => row.split(""));

const hasLoop = (staringPosition, startingDirection, obstaclePosition, _map) => {
  const map = JSON.parse(JSON.stringify(_map));
  let OCount = 0;
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

  if (map[obstaclePosition[0]][obstaclePosition[1]] === "#") return false;
  map[obstaclePosition[0]][obstaclePosition[1]] = "O";
  const visitedObstacles = new Set();
  
  let iteration = 0;
  while (true) {
    iteration ++;
    console.log(iteration)
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
      (map[y + nextMove[0]][x + nextMove[1]] === "#" ||
        map[y + nextMove[0]][x + nextMove[1]] === "O")
    ) {
      const vistitedKeyString = `${[y, x]}${guardDirection}`;
      if (visitedObstacles.has(vistitedKeyString)) return true;
      visitedObstacles.add(vistitedKeyString);
      guardDirection = nextDirectionMap[guardDirection];
    } else {
      map[y][x] = "X";
      y = y + nextMove[0];
      x = x + nextMove[1];
      
      if (isOnGaurdOnEdge([x, y])) {
        map[y][x] = "X";
        return false;
      }
    }
  }
};

const findPath = (mapData) => {
  let _map = makeMapMatrix(mapData);
  const findGuard = () => {
    for (let y = 0; y < _map.length; y++) {
      for (let x = 0; x < _map[y].length; x++) {
        if (_map[y][x] === "^") return [y, x];
      }
    }
    return [-1, -1];
  };
  // for the guard to leave she needs to reach the left, right, top or bottom

  const guardPosition = findGuard();
  //tracePath(guardPosition, "^");
  let positions = 0;
  for (let i = 0; i < _map.length; i++) {
    for (let j = 0; j < _map[i].length; j++) {
      console.log(`Putting O at [${i}, ${j}]`)
      if (hasLoop(guardPosition, "^", [i, j], _map)) positions++;
    }
  }
  console.log(positions);
};

findPath(data);
// 2262 -- took over 5 minutes to run this brute force solution