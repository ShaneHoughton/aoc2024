import openFile from "../../helpers/open-file.js";

const data = openFile("./data/data.txt");
const test = openFile("./data/test.txt");

const equations = data.map((equationString) => {
  const [_result, _values] = equationString.split(": ");
  const values = _values.split(" ").map((value) => Number(value));
  const result = Number(_result);
  return { result, values };
});
// 81 +

const AddOrMultiplyV2 = (equation) => {
  const result = equation.result;

  const values = [...equation.values].reverse();
  const triedSubEquations = new Map();
  const equationStack = [];

  const firstValue = `+ ${values.pop()}`;
  equationStack.push(firstValue);
  triedSubEquations.set(firstValue, new Set());

  const popPreviousValueAndReturnToValues = () => {
    const [, prevValue] = equationStack.pop().split(" ");
    values.push(prevValue);
  };

  while (true) {
    const nextValue = values.pop();
    if (equationStack.length === 0) return false;
    const addValue = `+ ${nextValue}`;
    const multValue = `* ${nextValue}`;
    const concatValue = `|| ${nextValue}`

    const stackKey = equationStack.join(" ");
    const currentSet = triedSubEquations.get(stackKey);
    let currentValAndOperator = null;

    if (!currentSet.has(addValue)) {
      equationStack.push(addValue);
      currentValAndOperator = addValue;
    } else if (!currentSet.has(multValue)) {
      equationStack.push(multValue);
      currentValAndOperator = multValue;
    } else if (!currentSet.has(concatValue)){
      equationStack.push(concatValue);
      currentValAndOperator = concatValue;
    }
      else {
      values.push(nextValue);
      popPreviousValueAndReturnToValues();
      continue;
    }
    currentSet.add(currentValAndOperator);

    const currentResult = equationStack.reduce(
      (currentResult, operationAndVal) => {
        const [operation, val] = operationAndVal.split(" ");
        if (operation === "+") return currentResult + Number(val);
        else if (operation === '||') {
          return Number(`${currentResult}${val}`)
        }
        return currentResult * Number(val);
      },
      0
    );

    if (currentResult === result && values.length === 0) return true;
    else if (currentResult !== result && values.length === 0) {
      popPreviousValueAndReturnToValues();
    } else {
      triedSubEquations.set(equationStack.join(" "), new Set());
    }
  }
};

console.log(equations);
const result = equations.reduce((sum, currentEquation) => {
  console.log("---");
  if (AddOrMultiplyV2(currentEquation)) return (sum += currentEquation.result);
  console.log(sum);
  return sum;
}, 0);
console.log(result);
