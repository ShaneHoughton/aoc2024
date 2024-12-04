import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

// arr of strings, strings are iterable so its kinda a matrix
const scanRows = (stringArr) => {
  let count = 0;
  // console.log(stringArr);
  for (let i = 0; i < stringArr.length; i++) {
    // left to right
    count += iterateAndReturnRegexCount(stringArr[i]);
    // right to left
    count += iterateAndReturnRegexCount(
      stringArr[i].split("").reverse().join("")
    );
  }
  return count;
};

const transposeStringArr = (stringArr) => {
  let newArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    let colString = "";
    for (let j = 0; j < stringArr.length; j++) {
      colString += stringArr[j][i];
    }
    newArr.push(colString);
    // console.log(colString);
  }
  return newArr;
};

const transposeDiagonal = (_stringArr) => {
  const stringArr = [..._stringArr];
  let newArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    let colString = "";
    for (let j = 0; j < stringArr[i].length; j++) {
      if (!stringArr[i + j]) break;
      colString += stringArr[i + j][j];
      //console.log(colString);
    }
    newArr.push(colString);
    //console.log(newArr);
  } // KEEP!

  // console.log(stringArr);

  
  stringArr.reverse();
  const reflected = stringArr.map((str) => str.split('').reverse().join('')
  );
  //console.log('>>> ref', reflected)

 // console.log(stringArr);

  for (let i = 1; i < reflected.length; i++) {
    let colString = "";
    for (let j = 0; j < reflected[i].length; j++) {
      if (!reflected[i + j]) break;
      colString += reflected[i + j][j];
      // console.log(colString);
    }
    newArr.push(colString);
    //console.log(newArr);
  } // KEEP!

  return newArr;
};

const iterateAndReturnRegexCount = (iterableString) => {
  const xmasRegex = /XMAS/g;
  return [...iterableString.matchAll(xmasRegex)].length;
};
let totalCount = 0;
totalCount += scanRows(data);
// console.log(JSON.stringify(test, null, 2));
// console.log(totalCount);
const columns = transposeStringArr(data);
totalCount += scanRows(columns);
// console.log(JSON.stringify(columns, null, 2));
// console.log(scanRows(columns));
const diagLeftRight = transposeDiagonal(data);
// console.log(JSON.stringify(diagLeftRight, null, 2));
const diagRightLeft = transposeDiagonal(columns);
totalCount += scanRows(diagLeftRight);
totalCount += scanRows(diagRightLeft);
console.log(totalCount);

//console.log(transposeDiagonal(test));
// console.log(scanRows(test));
// console.log(transposeArr(test));
//2497 too high!