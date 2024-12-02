import * as fs from "fs";
const openFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  //console.log(data);
  const lineArr = data.split('\n');
  return lineArr;
};

export default openFile;