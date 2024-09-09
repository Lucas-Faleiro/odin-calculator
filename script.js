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

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  operator = "";
  resultText.innerText = 0;
  operationCont.innerText = "";
};

for (let i = 0; i < allDigits.length; i++) {
  allDigits[i].addEventListener("click", displayDigit);
}

for (let i = 0; i < allOperands.length; i++) {
  allOperands[i].addEventListener("click", saveOperation);
}

equalBtn.addEventListener("click", getResult);
clearBtn.addEventListener("click", clear);
