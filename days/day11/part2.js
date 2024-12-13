import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

let stoneArr = data[0].split(" ");
let stoneMap = new Map();

const solve = (stone, iteration) => {
  const key = `${stone}|${iteration}`;
  let value = 0;
  if (stoneMap.has(key)) return stoneMap.get(key);
  if (iteration === 0) value += 1; // no more iterations so there would be 1 number
  else if (stone === '0') value += solve('1', iteration - 1);
  else if (stone.length % 2 === 0) {
    const middleIndex = Math.ceil(stone.length / 2);
    let firstHalf = stone.slice(0, middleIndex);
    let secondHalf = stone.slice(middleIndex).replace(/^0+(?!$)/, "");
    value += solve(firstHalf, iteration - 1) + solve(secondHalf, iteration - 1);
  }
  else {
    value += solve(String(Number(stone) * 2024), iteration - 1);
  }
  stoneMap.set(key, value);
  return value;
}

let finalLength = 0;
stoneArr.forEach((stone) => finalLength += solve(stone, 75))

// 234568186890978
// cool solution! 
// got stuck on this one--watched this guy solve this problem --> https://www.youtube.com/watch?v=dfZ4uxqgT6o&ab_channel=JonathanPaulson
