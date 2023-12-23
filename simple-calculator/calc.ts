// document selections

const operands: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".operand");
const output: HTMLInputElement = document.querySelector(
  ".output"
) as HTMLInputElement;
const reset = document.querySelector(".reset") as HTMLButtonElement;
const equals = document.querySelector(".equal") as HTMLButtonElement;
const operators: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".operator");
const negate = document.querySelector(".negate") as HTMLButtonElement;
const point = document.querySelector(".point") as HTMLButtonElement;

// variables definitions
let leftOperand = "0";
let rightOperand = "0";
let operatorString = "";
let track = false;
let result = "0";

type calcType = (op1: number, op: string, op2: number) => number | string;
// utils

const calculate: calcType = (op1, op, op2) => {
  switch (op) {
    case "x":
      return op1 * op2;
    case "/":
      if (op2 == 0 && Math.abs(op1) != 0) return "synt err";
      else {
        return op1 / op2;
      }
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    default:
      return "undef";
  }
};
// treating the values
const sanitize = (value: string) => {
  if (value.toString().charAt(value.length - 1) == ".")
    return value.slice(0, value.length - 1);
  return value;
};
// treating the result;
const treatResult = (result: number) => {
  const temp = result.toString();
  const test = temp.toString().split(".");
  if (test.length == 2) {
    if (test[1].length > 5) return result.toFixed(3).toString();
    else return temp;
  } else if (temp.length > 8) {
    let count = 0;
    let holder = result;
    while (true) {
      if (holder < 10) break;
      holder /= 10;
      count += 1;
    }
    let response;
    if (temp.indexOf("-") == 0) {
      response = "-" + temp.slice(0, 1) + "." + temp.slice(1);
    } else response = temp.slice(0, 1) + "." + temp.slice(1);
    response = Number(response).toFixed(3).toString() + `e ${count}`;
    return response;
  } else {
    return temp;
  }
};
const resetAllParams = () => {
  leftOperand = "0";
  rightOperand = "0";
  result = "0";
  track = false;
  operatorString = "";
};
/** handlers */
// the A/C button handler
const handleReset = (e: Event) => {
  e.preventDefault();
  output.value = "0";
  resetAllParams();
};

const updateOutput = () => {
  output.value = result;
  result = "0";
};
const handlePoint = (e: Event) => {
  e.preventDefault();
  if (operatorString == "") {
    if (leftOperand.indexOf(".") == -1) {
      leftOperand = track ? "0." : leftOperand + ".";
    } else if (track) {
      leftOperand = "0.";
    }
    result = leftOperand;
  } else {
    if (rightOperand.indexOf(".") == -1) {
      rightOperand += ".";
    }
    result = rightOperand;
  }
  track = false;
  updateOutput();
};
// numbers handler =:  if the first number is zero, then replace it, otherwise just concatenate
const handleClick = (e: Event) => {
  e.preventDefault();
  const btn = e.target as HTMLButtonElement;
  const text: string = btn.innerHTML;
  // test to see if there are operators
  if (operatorString != "") {
    // this means we are working with the second operand string
    if (rightOperand == "0")
      rightOperand = text; // if the number is preceeded by zero
    else if (rightOperand == "-0") rightOperand = "-" + text;
    else rightOperand += text;
    result = rightOperand;
  } else {
    // this means we are working with the second operand string
    if (leftOperand == "0")
      leftOperand = text; // if the number is preceeded by zero
    else if (leftOperand == "-0") leftOperand = "-" + text;
    else {
      leftOperand = track ? text : leftOperand + text;
    }
    result = leftOperand;
  }
  track = false;
  updateOutput();
};
const updateLeftOperand = () => {
  if (result == "err") leftOperand = "0";
  else leftOperand = result;
};
const updateRightOpAndOpStr = () => {
  rightOperand = "0";
  operatorString = "";
};
const updateResult = () => {
  const resultTemp = calculate(
    Number(sanitize(leftOperand)),
    operatorString,
    Number(sanitize(rightOperand))
  );
  if (isNaN(resultTemp as number)) result = "err";
  else result = treatResult(Number(resultTemp));
};
const handleCalculations = (e: Event) => {
  e.preventDefault();
  if (operatorString == "") {
    result = sanitize(leftOperand);
  } else {
    updateResult();
    updateRightOpAndOpStr();
  }
  updateLeftOperand();
  track = true;
  updateOutput();
};
const handleOperator = (e: Event) => {
  e.preventDefault();
  if (operatorString != "") {
    if (rightOperand == "0") {
      result = "err";
      updateOutput();
      resetAllParams();
    } else {
      updateResult();
      updateLeftOperand();
      updateRightOpAndOpStr();
      updateOutput();
      operatorString = (e.target as HTMLButtonElement).innerHTML;
    }
  } else {
    operatorString = (e.target as HTMLButtonElement).innerHTML;
  }
};
const handleNegate = (e: Event) => {
  e.preventDefault();
  if (operatorString) {
    rightOperand = "-" + rightOperand;
    if (rightOperand.indexOf("--") != -1) rightOperand = rightOperand.slice(2);
    result = rightOperand;
  } else {
    leftOperand = "-" + leftOperand;
    if (leftOperand.indexOf("--") != -1) leftOperand = leftOperand.slice(2);
    result = leftOperand;
  }
  track = false;
  updateOutput();
};

// Event listeners
operands.forEach((operand) => operand.addEventListener("click", handleClick));
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleCalculations);
operators.forEach((operator) =>
  operator.addEventListener("click", handleOperator)
);
negate.addEventListener("click", handleNegate);
point.addEventListener("click", handlePoint);
