import openFile from "../../helpers/open-file.js"

const data = openFile('./data/part1.txt');
const test = openFile('./data/test.txt');

const findDistance = (arr1, arr2) => {
  let totalDistance = 0;
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  for (let i = 0; i < arr1.length; i ++) {
    const distance = Math.abs(arr1[i] - arr2[i]);
    console.log(distance)
    totalDistance += distance;
  }

  return totalDistance;
}

const buildArrs = (data) => {
  const arr1 = [];
  const arr2 = [];
  data.forEach((lineString) => {
    const [num1String, num2String] = lineString.split(/\s+/);
    arr1.push(parseInt(num1String));
    arr2.push(parseInt(num2String));
  })
  return [arr1, arr2];
}
console.log(findDistance(...buildArrs(data)));
// findDistance()