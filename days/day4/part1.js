import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const iterateAndReturnRegexCount = (stringArr) => {
  const ArrAsString = stringArr.join('');
  const xmasRegex = /XMAS/g;
  return [...ArrAsString.matchAll(xmasRegex)].length;
};

const scanRows = (rows) => {
  let count = 0;
  for (const row of rows) {
    // left to right
    const reversedRow = [...row].reverse();
    count += iterateAndReturnRegexCount(row);
    // right to left
    count += iterateAndReturnRegexCount(reversedRow);
  }
  return count;
};

const transposeStringArr = (stringArr) => {
  return stringArr[0].map((_, colIndex) =>
    stringArr.map((row) => row[colIndex]).reverse()
  );
};

const transposeDiagonal = (_arr) => {
  //console.log(_arr);
  const arr = [..._arr];
  arr.forEach((row) => row.reverse())
  arr.reverse()
  //console.log(arr);
  let diagonals = [];
  for (let i = 0; i < arr.length; i++) {
    let diagonal = [];
    for (let j = 0; j < arr[i].length; j++) {
      if (!arr[i + j]) break;
      diagonal.push(arr[i + j][j]);
    }
    diagonals.push(diagonal);
  }

  for (let i = 1; i < arr[0].length; i++) {
    let diagonal = [];
    // console.log(arr[i])
    for (let j = 0; j < arr.length; j++) {
      if (!arr[j][i + j]) break;
      diagonal.push(arr[j][i + j]);
    }
    diagonals.push(diagonal);
  }
  //console.log(diagonals)
  return diagonals;
};


let totalCount = 0;
const rows = data.map((row)=> row.split(''));
const columns = transposeStringArr(rows);
//console.log(columns)
const diagsDownAndRight = transposeDiagonal(rows);
const diagsUpAndRight = transposeDiagonal(columns);
//console.log(diagsUpAndRight);
// console.log(diagsDownAndRight)
totalCount += scanRows(rows);
totalCount += scanRows(columns);
totalCount += scanRows(diagsDownAndRight);
totalCount += scanRows(diagsUpAndRight);
console.log(totalCount);



//2497 too high!
// 2493 someone else's answer?
//2468
// 4:12 of elapsed time... jeez...