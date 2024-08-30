let firstNum = 0;
let secondNum = 0;
let operator = "";

const add = (numA, numB) => numA + numB;
const sub = (numA, numB) => numA - numB;
const mult = (numA, numB) => numA * numB;
const divide = (numA, numB) => numA / numB;

const operate = (operation, numA, numB) => {
  switch (operation) {
    case "+":
      return add(numA, numB);
    case "-":
      return sub(numA, numB);
    case "*":
      return mult(numA, numB);
    case "/":
      return divide(numA, numB);
  }
};
