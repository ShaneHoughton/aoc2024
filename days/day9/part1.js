import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const input = data[0].split("");

const blockQueue = [];
let blockCount = 0;

const setUp = () => {
  let blockIndex = 0;
  input.forEach((block, position) => {
    let value = position;
    if (position % 2 !== 0) {
      value = ".";
    } else {
      value = blockIndex;
      blockIndex++;
    }
    for (let i = 0; i < Number(block); i++) {
      if (value !== ".") blockCount++;
      blockQueue.push(value);
    }
  });
};

const swapEmpties = () => {
  for (let i = blockQueue.length - 1; i > 0; i--) {
    let iCurrent = blockQueue[i];
    if (iCurrent === ".") continue;

    let currentBlockCount = 0;
    for (let j = 0; j < blockQueue.length; j++) {
      let jCurrent = blockQueue[j];
      if (jCurrent === ".") {
        // swap values
        blockQueue[j] = iCurrent;
        blockQueue[i] = ".";
        break;
      }
      currentBlockCount++;
      if (currentBlockCount === blockCount) return;
    }
  }
};

let checksum = 0;

const doit = () => {
  for (let i = 0; i < blockCount; i ++) {
    checksum += blockQueue[i] * i
  }
}

setUp();
swapEmpties();
doit()
console.log(JSON.stringify(blockQueue));
console.log(checksum);
//6330095022244