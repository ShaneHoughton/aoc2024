import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

let stoneArr = test[0].split(' ');

const splitStrInHalf = (str) => {
  const middleIndex = Math.ceil(arr.length / 2);
  let firstHalf = str.slice(0, middleIndex);
  let secondHalf = str.slice(middleIndex).replace(/^0+(?!$)/, "");
  return [firstHalf, secondHalf];
}

const applyRules = () => {
  for (let i = 0; i < 5; i ++) {
    let nextStoneArr = [];
    stoneArr.forEach((stone) => {
      if (stone === '0') nextStoneArr.push('1');
      else if (stone.length % 2 === 0) nextStoneArr.push(...splitStrInHalf(stone));
      else {
        nextStoneArr.push(String(Number(stone) * 2024))
      }
    })
    stoneArr = [...nextStoneArr];
    console.log(stoneArr);
  }
}

applyRules();
console.log(stoneArr.length);

