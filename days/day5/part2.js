import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const divideInput = (input) => {
  const rules = input.splice(0, input.indexOf(""));
  const updates = input.splice(input.indexOf("") + 1, input.length);
  return [rules, updates];
};


const findValidUpdates = (_rules, _updates) => {
  const rules = _rules.map((rule) => rule.split("|"));
  const updates = _updates.map((update) => update.split(","));

  const topologicalSort = (update) => {
    const graph = new Map();
    const inDegree = new Map();
    const nodes = new Set();

    update.forEach((node) => {
      nodes.add(node);
      graph.set(node, []);
      inDegree.set(node, 0);
    });

    rules.forEach(([left, right]) => {
      if (!nodes.has(left) || !nodes.has(right)) return;
      graph.get(left).push(right);
      inDegree.set(right, inDegree.get(right) + 1);
    });

    const queue = [];
    const sortedList = [];

    inDegree.forEach((degree, node) => {
      if (degree === 0) {
        queue.push(node);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift();
      sortedList.push(current);

      graph.get(current).forEach((neighbor) => {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      });
    }
    return sortedList;
  }

  const doesFollowRules = (update) => {
    const updateIndexes = new Map();
    for (const [index, value] of update.entries()) {
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
  };
  let count = 0;
  for (const update of updates) {
    if (!doesFollowRules(update)) {
      const sorted = topologicalSort(update);
      count += parseInt(sorted[Math.floor(sorted.length / 2)]);
    }
  }
  return count;
};
const [rules, updates] = divideInput(data);
console.log(findValidUpdates(rules, updates));

// 5184
