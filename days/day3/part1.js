import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const getSumOfProducts = (arr) => {
  let sum = 0;
  const numbersToMultiply = [];
  const fnRegex = /mul\(\d{1,3}\,\d{1,3}\)/g;
  const numRegex = /\d{1,3}\,\d{1,3}/g;
  // iterate over array and then find substrings.
  // push substring to a list;
  for (const line of arr) {
    const matches = [...line.matchAll(fnRegex)];
    matches.forEach((match) => {
      const numbers = [...match[0].matchAll(numRegex)][0][0].split(',');
      console.log(numbers)
      const product = parseInt(numbers[0]) * parseInt(numbers[1]);
      sum += product;
    });
  }
  return sum;
};


let str =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;

const match = [...str.matchAll(regex)];

if (match) {
  console.log("Found substring:", match); // "fox"
} else {
  console.log("Substring not found.");
}

// console.log(
//   findSubStrings([
//     "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
//   ])
// );

console.log(getSumOfProducts(data));
// solved in half an hour