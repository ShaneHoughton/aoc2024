import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const frequencyMatrix = data.map((row) => row.split(""));
const frequencyMap = new Map();
const specialCharREgex = /[^A-Za-z0-9]/;
let antennaCount = 0;
const findFrequencies = () => {
  for (let i = 0; i < frequencyMatrix.length; i++) {
    for (let j = 0; j < frequencyMatrix[i].length; j++) {
      const currentChar = frequencyMatrix[i][j];
      if (specialCharREgex.test(currentChar)) continue;
      if (!frequencyMap.has(currentChar)) {
        frequencyMap.set(currentChar, new Set());
      }
      frequencyMap.get(currentChar).add(`${i},${j}`);
      frequencyMatrix[i][j] = "#";
    }
  }
};

const countAntiNodes = () => {
  const uniqueAntiNodes = new Set();
  const isInBounds = ([i, j]) => {
    const rows = frequencyMatrix.length;
    const cols = frequencyMatrix[0]?.length || 0;
    return j >= 0 && j < rows && i >= 0 && i < cols;
  };

  const createAntiNode = (originNode, referenceNode) => {
    let delta = [
      referenceNode[0] - originNode[0],
      referenceNode[1] - originNode[1],
    ];

    return [originNode[0] - delta[0], originNode[1] - delta[1]];
  };

  function calculateAntiNodesInBounds(
    startNode,
    referenceNode,
  ) {
    let currentNode = createAntiNode(referenceNode, startNode);

    while (isInBounds(currentNode)) {
      uniqueAntiNodes.add(JSON.stringify(currentNode));
      const nextNode = createAntiNode(currentNode, referenceNode);
      referenceNode = currentNode;
      currentNode = nextNode;

      console.log("Current Node:", currentNode);
    }
  }

  for (const frequency of frequencyMap) {
    const [, frequencySet] = frequency;
    if (frequencySet.size < 2) continue;

    const lines = new Set();
    const setEntries = [...frequencySet];
    for (let i = 0; i < setEntries.length - 1; i++) {
      for (let j = i + 1; j < setEntries.length; j++) {
        const orderedPairs = [setEntries[i], setEntries[j]];
        console.log(setEntries);
        lines.add(JSON.stringify(orderedPairs));
      }
    }
    console.log(lines);
    for (const orderedPairs of lines) {
      const [pair1, pair2] = JSON.parse(orderedPairs)
        .map((stringPair) => stringPair.split(","))
        .map((pair) => [Number(pair[0]), Number(pair[1])]);

      calculateAntiNodesInBounds(pair2, pair1);
      calculateAntiNodesInBounds(pair1, pair2);
    }
  }
  for (const antinode of uniqueAntiNodes) {
    const [y, x] = JSON.parse(antinode);
    frequencyMatrix[Number(y)][Number(x)] = "#";
  }
  const newMatrix = frequencyMatrix.map((row) => row.join(""));
  console.log(JSON.stringify(newMatrix, null, 2));
  console.log(uniqueAntiNodes.size + antennaCount);
};
const countAllNodes = () => {
  let count = 0;
  for (let i = 0; i < frequencyMatrix.length; i++) {
    for (let j = 0; j < frequencyMatrix[i].length; j++) {
      if (frequencyMatrix[i][j] === "#") count++;
    }
  }
  console.log(count);
};

findFrequencies();
countAntiNodes();
countAllNodes()

//1064