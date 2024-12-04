import openFile from "../../helpers/open-file.js";

const data = openFile("./data/part1.txt");
const test = openFile("./data/test.txt");

const isSafe = (report) => {
  if (report.length === 0) return "EMPTY LIST!";

  const islevelDiffValid = (level1, level2) => {
    const absDiff = Math.abs(level1 - level2);
    return absDiff <= 3 && absDiff >= 1; // needs to change by 1 2 or 3
  };

  const isLevelIncreasing = (level1, level2) => {
    return level1 < level2;
  };

  let isSupposedToIncrease = isLevelIncreasing(report[0], report[1]); // assuming the list is never empty

  for (let i = 0; i < report.length - 1; i++) {
    const level1 = report[i];
    const level2 = report[i + 1];
    const isSupposedToIncreaseButDoesnt =
      isSupposedToIncrease && !isLevelIncreasing(level1, level2);

    const isSupposedToDecreaseButDoesnt =
      !isSupposedToIncrease && isLevelIncreasing(level1, level2);

    const isChangeInvalid = !islevelDiffValid(level1, level2);
    if (
      isSupposedToIncreaseButDoesnt ||
      isSupposedToDecreaseButDoesnt ||
      isChangeInvalid
    ) {
      return false
    }
  }
  
  return true;
};

const hasFoundSafe = (report) => {
  console.log(report);
  for (let i = 0; i < report.length; i ++) {
    const newReport = [...report];
    newReport.splice(i, 1);
    if (isSafe(newReport)) return true;
  }
  return false;
}

const checkAllReports = (reports) => {
  let safeCount = 0;
  const invalids = [];
  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
    } else if (hasFoundSafe(report)) {
      safeCount++;
    }
  }
  console.log(invalids);
  return safeCount;
};


const buildReports = (data) => {
  const reports = [];
  data.forEach((lineString) => {
    const levelList = lineString
      .split(/\s+/)
      .map((levelStr) => parseInt(levelStr));
    reports.push(levelList);
  });
  return reports;
};
// [8, 10, 13, 14, 12]
//console.log(checkAllReports([[8, 10, 13, 14, 12]]));
//622 too low
// console.log(checkAllReports([[38, 38, 41, 43, 47, 49, 51]]));
console.log(checkAllReports(buildReports(data)));

// took approximately 2 hours of time.
// The mistake I was making was not trying every permutation.
//634 right answer
// I was just trying to remove the level at the index where the original report failed.