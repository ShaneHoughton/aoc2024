import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

// const getSumOfProducts = (arr) => {
//   let sum = 0;
//   const fnRegex = /mul\(\d{1,3}\,\d{1,3}\)/g;
//   const numRegex = /\d{1,3}\,\d{1,3}/g;

//   const dontToDoRegex = /don't\(\).*?do\(\)/g;
//   // iterate over array and then find substrings.
//   // push substring to a list;
//   const bigStr = arr.join('');
//   // console.log(bigStr)
//   // console.log(bigStr)
//   const newline = bigStr.replaceAll(dontToDoRegex, "");
//   console.log(newline);
//   console.log("");
//   const matches = [...newline.matchAll(fnRegex)];
//   matches.forEach((match) => {
//     const numbers = [...match[0].matchAll(numRegex)][0][0].split(",");
//     // console.log(numbers);
//     const product = parseInt(numbers[0]) * parseInt(numbers[1]);
//     sum += product;
//   });
//   return sum;
// };

const getSumOfProducts = (arr) => {
  let sum = 0;
  const fnRegex = /mul\(\d{1,3}\,\d{1,3}\)/g;
  const numRegex = /\d{1,3}\,\d{1,3}/g;

  const dontToDoRegex = /don't\(\)(.*)/g;
  // iterate over array and then find substrings.
  // push substring to a list;
  const bigStr = arr.join("");
  // console.log(bigStr)
  // console.log(bigStr)
  const dosAndDonts = bigStr.split('do()')
  const dos = dosAndDonts.map((item)=> item.replaceAll(dontToDoRegex, ''))
  console.log(dos);
  const doString = dos.join("");
  console.log("");
  const matches = [...doString.matchAll(fnRegex)];
  matches.forEach((match) => {
    const numbers = [...match[0].matchAll(numRegex)][0][0].split(",");
    // console.log(numbers);
    const product = parseInt(numbers[0]) * parseInt(numbers[1]);
    sum += product;
  });
  return sum;
};

// let str =
//   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

// const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;
// const dontToDoRegex = /don't\(\).*?do\(\)/g;

// const match = [...str.matchAll(dontToDoRegex)];

// if (match) {
//   console.log("Found substring:", match); // "fox"

//   console.log(str.replaceAll(dontToDoRegex, ''));
// } else {
//   console.log("Substring not found.");
// }

// console.log(
//   findSubStrings([
//     "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
//   ])
// );

// 90085625 too high
//console.log(data.length)
console.log(getSumOfProducts(data));
console.log(69230381 < 90085625);
// solved in about 20 minutes