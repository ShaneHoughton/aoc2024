import openFile from "../../helpers/open-file.js";

const data = openFile("./data/part1.txt");
const test = openFile("./data/test.txt");

const isSafe = (report) => {
  if (report.length === 0) return "EMPTY LIST!";

  const islevelDiffValid = (level1, level2) => {
    const absDiff = Math.abs(level1 - level2);
    return (absDiff <= 3 && absDiff >= 1); // needs to change by 1 2 or 3
  };

  const isLevelIncreasing = (level1, level2) => {
    return level1 < level2;
  };


  let isSupposedToIncrease = isLevelIncreasing(report[0], report[1]) // assuming the list is never empty

  for (let i = 0; i < report.length - 1; i++) {
    const level1 = report[i];
    const level2 = report[i + 1];
    if (!islevelDiffValid(level1, level2)) return false;

    if ((isSupposedToIncrease && !isLevelIncreasing(level1, level2))) {
      return false;
    }
    else if ((!isSupposedToIncrease && isLevelIncreasing(level1, level2))) {
      return false;
    }
  }
  return true;
};

const checkAllReports = (reports) => {
  let safeCount = 0;
  for(const report of reports) {
    if (isSafe(report)) safeCount ++;
  }
  return safeCount;
}


const buildReports = (data) => {
  const reports = []
  data.forEach((lineString) => {
    const levelList = lineString.split(/\s+/).map((levelStr) => parseInt(levelStr));
    reports.push(levelList);
  });
  return reports;
};
// [8, 10, 13, 14, 12]
//console.log(checkAllReports([[8, 10, 13, 14, 12]]));
console.log(checkAllReports(buildReports(test)));

//completed in 59:00.38...