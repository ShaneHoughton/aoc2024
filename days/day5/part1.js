import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const divideInput = (input) => {
  const rules = input.splice(0, input.indexOf(""));
  const updates = input.splice(input.indexOf("") + 1, input.length);
  return [rules, updates];
};


const findValidUpdates = (_rules, _updates) => {
  const rules = _rules.map((rule) => rule.split('|'))
  const updates = _updates.map((update) => update.split(','))
  const doesFollowRules = (update) => {
    const updateIndexes = new Map();
    for (const [index, value] of update.entries()){
      updateIndexes.set(value, index);
    }
    for (const [before, after] of rules) {
      if (
        updateIndexes.has(before) &&
        updateIndexes.has(after) &&
        updateIndexes.get(before) > updateIndexes.get(after)
      ) {
        return false;
      }
    }
    return true;
  }
  let count = 0;
  for (const update of updates) {
    if (doesFollowRules(update)) {
      count += parseInt(update[Math.floor(update.length / 2)]);
    }
  }
  return count;
}
const [rules, updates] = divideInput(data);
console.log(findValidUpdates(rules, updates));

// 6267