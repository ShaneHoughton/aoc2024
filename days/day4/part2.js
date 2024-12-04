// iterate over matrix
// if (i, j) === a
// create a string of (i - 1, j - 1), (i,j), (i + 1, j + 1) and  (i - 1, j + 1), (i ,j), (i + 1, j - 1)
// if both strings are MAS matched with regex, icrement count

import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const rows = data.map((row) => row.split(""));

const isMAS = (str) => {
 return str === 'MAS' || str === 'SAM'
}

const iterate = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i ++) {
    const row = arr[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'A') {
        const hasTopLeftBottomRight =
          arr[i - 1] !== undefined &&
          arr[i - 1][j - 1] !== undefined &&
          arr[i + 1] !== undefined &&
          arr[i + 1][j + 1] !== undefined;

        const hasTopRightBottomLeft =
          arr[i - 1] !== undefined &&
          arr[i - 1][j + 1] !== undefined &&
          arr[i + 1] !== undefined &&
          arr[i + 1][j - 1] !== undefined;

        //console.log(hasTopLeftBottomRight && hasTopRightBottomLeft)
        if (hasTopLeftBottomRight && hasTopRightBottomLeft) {
          const string1 = `${arr[i - 1][j - 1]}${row[j]}${arr[i + 1][j + 1]}`
          const string2 = `${arr[i - 1][j + 1]}${row[j]}${arr[i + 1][j - 1]}`;
          if (isMAS(string1) && isMAS(string2)) count ++;
        }
      }
    }
  }
  console.log(count);
}

iterate(rows)

// 1864
// much better than part 1! 16:49