import openFile from "../../helpers/open-file.js";

const data = openFile("./data/part2.txt");
const test = openFile("./data/test2.txt");

const buildArrs = (data) => {
  const arr1 = [];
  const arr2 = [];
  data.forEach((lineString) => {
    const [num1String, num2String] = lineString.split(/\s+/);
    arr1.push(num1String);
    arr2.push(num2String);
  });
  return [arr1, arr2];
};

const iterateAndBuildMap = (leftArr, rightArr) => {
  const keyValuePairs = leftArr.map((key) => ([key, 0]))
  // console.log(keyValuePairs);
  const leftMap = new Map(keyValuePairs);
  // console.log(leftMap);

  rightArr.forEach((numStr) => {
    if (leftMap.has(numStr)) {
      let value = leftMap.get(numStr);
      value += 1;
      leftMap.set(numStr, value);
    }
  })
  // console.log(leftMap);
  let similarityScore = 0;
  leftArr.forEach((numStr) => {
    const product = leftMap.get(numStr) * parseInt(numStr);
    similarityScore += product;
  })

  return similarityScore;
};

console.log(iterateAndBuildMap(...buildArrs(data)));