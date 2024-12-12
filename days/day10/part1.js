import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

let topoMatrix = data.map((row) => row.split("").map((value) => value === '.' ? '.' : Number(value)));

const countTrailHeads = (startI, startJ) => {
  const indexToVisitStack = [];
  const trailheadSet = new Set();

  const findNeighbors = () => {
    const isIndexValid = (i, j) => topoMatrix[i] !== undefined && topoMatrix[i][j] !== undefined;
    
    const addToStackIfNeighborIsWalkable 
    = (ni, nj) => {
      if (topoMatrix[ni][nj] - topoMatrix[i][j] === 1) indexToVisitStack.push([ni, nj]);
    };
    
    const [i, j] = indexToVisitStack.pop();
    const trailHeadKey = `${i},${j}`;
    if (topoMatrix[i][j] === 9 && !trailheadSet.has(trailHeadKey)) {
      trailheadSet.add(trailHeadKey);
    } else {
      // check up
      if (isIndexValid(i - 1, j)) addToStackIfNeighborIsWalkable(i - 1, j);
      // check left
      if (isIndexValid(i, j + 1)) addToStackIfNeighborIsWalkable(i, j + 1);
      // check right
      if (isIndexValid(i + 1, j)) addToStackIfNeighborIsWalkable(i + 1, j);
      // check down
      if (isIndexValid(i, j - 1)) addToStackIfNeighborIsWalkable(i, j - 1);
    }
    if (indexToVisitStack.length === 0) return;
    else {
      //const [nextI, nextJ] = indexToVisitStack.pop();
      return findNeighbors();
    }
  }

  indexToVisitStack.push([startI, startJ]);
  findNeighbors();
  return trailheadSet.size;
} 
let trailheadCount = 0;

for (let i = 0 ; i < topoMatrix.length; i ++) {
  for (let j = 0; j < topoMatrix[i].length; j ++){
    if (topoMatrix[i][j] === 0) trailheadCount += countTrailHeads(i, j)
  }
}
console.log(trailheadCount);
//624
// first try