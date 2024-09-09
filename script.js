let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;
let displayValue = 0;
let equalClicked = false;
let clearResult = false;
const allDigits = document.querySelectorAll(".digit");
const allOperands = document.querySelectorAll(".operands");
const resultText = document.querySelector(".result");
const calculator = document.querySelector("#calculator");
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const dotBtn = document.querySelector("#dot");
const backspaceBtn = document.querySelector("#backspace");
const operationCont = document.createElement("p");

const add = (numA, numB) => +numA + +numB;
const sub = (numA, numB) => +numA - +numB;
const mult = (numA, numB) => +numA * +numB;
const divide = (numA, numB) => +numA / +numB;

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

const displayDigit = (e) => {
  if (equalClicked) {
    clear();
    equalClicked = false;
  }
  if (resultText.innerText === "0") resultText.innerText = "";
  if (clearResult) {
    resultText.innerText = "";
    clearResult = false;
  }
  resultText.innerText += e.target.innerText;
};

const displayKeyboard = (e) => {
  console.log(e.key);

  allDigits.forEach((digit) => {
    if (digit.innerText === e.key) {
      digit.click();
      return;
    }
  });
  allOperands.forEach((operator) => {
    if (operator.innerText === e.key) {
      operator.click();
      return;
    }
  });
  if (e.key === "Enter") equalBtn.click();
  if (e.key === "Backspace") backspaceBtn.click();
  if (e.key === ".") dotBtn.click();
};

const displayDot = (e) => {
  if (!resultText.innerText.includes(".")) {
    resultText.innerText += e.target.innerText;
  }
};

const saveOperation = (e) => {
  if (operator) {
    if (firstNum === resultText.innerText || equalClicked) {
      operator = e.target.innerText;
      operationCont.innerText = `${resultText.innerText} ${operator}`;
      clearResult = true;
      equalClicked = false;
      return;
    }
    secondNum = resultText.innerText;
    if (secondNum === "0" && operator === "/") {
      giveZeroAlert();
      return;
    }
    result = operate(operator, firstNum, secondNum);
    resultText.innerText = result;
    operator = e.target.innerText;
    operationCont.innerText = `${resultText.innerText} ${operator}`;
    firstNum = result;
    clearResult = true;
  }
  if (!operator) {
    operator = e.target.innerText;
    firstNum = resultText.innerText;
    createOperationPara(firstNum + operator);
    clearResult = true;
  }
};

const getResult = () => {
  if (!firstNum) firstNum = resultText.innerText;
  secondNum = resultText.innerText;
  if (secondNum === "0" && operator === "/") {
    giveZeroAlert();
    return;
  }
  if (operator && firstNum && secondNum) {
    result = operate(operator, firstNum, secondNum);
    resultText.innerText = result;
    operationCont.innerText = `${firstNum} ${operator} ${secondNum} =`;
    equalClicked = true;
  }
  if (!operator || !secondNum) {
    createOperationPara(`${resultText.innerText} =`);
    clearResult = true;
  }
  firstNum = result;
};

const createOperationPara = (sentence) => {
  operationCont.innerText = sentence;
  operationCont.setAttribute("class", "result");
  calculator.insertBefore(operationCont, resultText);
};

const giveZeroAlert = () => {
  alert("DON'T BREAK THE INTERNET, NEVER DIVIDE BY ZERO");
  clear();
};

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  operator = "";
  resultText.innerText = 0;
  operationCont.innerText = "";
};

const clearLastDigit = () => {
  let num = resultText.innerText;
  num = num.slice(0, num.length - 1);
  resultText.innerText = num;
  if (!resultText.innerText) {
    resultText.innerText = "0";
  }
};

for (let i = 0; i < allDigits.length; i++) {
  allDigits[i].addEventListener("click", displayDigit);
}

for (let i = 0; i < allOperands.length; i++) {
  allOperands[i].addEventListener("click", saveOperation);
}

dotBtn.addEventListener("click", displayDot);
equalBtn.addEventListener("click", getResult);
clearBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", clearLastDigit);
window.addEventListener("keydown", displayKeyboard);
