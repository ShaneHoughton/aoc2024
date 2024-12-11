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
    let sameBlocks = [iCurrent];
    let inextBlock = i - 1;
    let nextBlock = blockQueue[inextBlock];
    while (nextBlock === iCurrent) {
      sameBlocks.push(nextBlock);
      inextBlock -= 1;
      nextBlock = blockQueue[inextBlock];
    }

    let currentBlockCount = 0;
    for (let j = 0; j < i; j++) {
      let jCurrent = blockQueue[j];
      if (jCurrent === ".") {
        let sameEmpties = [jCurrent];
        let inextEmpty = j + 1;
        let nextEmpty = blockQueue[inextEmpty];
        while (
          nextEmpty === jCurrent &&
          sameEmpties.length < sameBlocks.length
        ) {
          sameEmpties.push(nextEmpty);
          inextEmpty += 1;
          nextEmpty = blockQueue[inextEmpty];
        }

        if (sameEmpties.length === sameBlocks.length) {
          blockQueue.splice(j, sameEmpties.length, ...sameBlocks);
          blockQueue.splice(inextBlock + 1, sameBlocks.length, ...sameEmpties);          
          break;
        }
      
      }
      i = inextBlock + 1;
      if (currentBlockCount === blockCount) return;
    }
    // console.log(JSON.stringify(blockQueue));
  }
};

let checksum = 0;
const doit = () => {
  let positionIndex = 0;
  for (let i = 0; i < blockQueue.length; i++) {
    if (blockQueue[i] === ".") continue;
    checksum += blockQueue[i] * i;
    positionIndex++;
  }
};

setUp();
swapEmpties();
doit();
console.log(JSON.stringify(blockQueue));
console.log(checksum);
//6359491814941