let firstNum = 0;
let secondNum = 0;
let operator = "";
let displayValue = 0;
const allDigits = document.querySelectorAll(".digit");
const allOperands = document.querySelectorAll(".operands");
const resultText = document.querySelector(".result");
const calculator = document.querySelector("#calculator");
const equalBtn = document.querySelector("#equal");
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
  displayValue = e.target.innerText;
  if (resultText.innerText === "0") resultText.innerText = "";
  if (resultText.innerText === firstNum) resultText.innerText = "";
  resultText.innerText += displayValue;
};

const saveOperation = (e) => {
  operator = e.target.innerText;
  firstNum = resultText.innerText;
  operationCont.innerText = firstNum + operator;
  operationCont.setAttribute("class", "result");
  calculator.insertBefore(operationCont, resultText);
};

const getResult = () => {
  secondNum = resultText.innerText;
  resultText.innerText = operate(operator, firstNum, secondNum);
  operationCont.innerText = `${secondNum} ${operator} ${firstNum} =`;
};

for (let i = 0; i < allDigits.length; i++) {
  allDigits[i].addEventListener("click", displayDigit);
}

for (let i = 0; i < allOperands.length; i++) {
  allOperands[i].addEventListener("click", saveOperation);
}

equalBtn.addEventListener("click", getResult);
