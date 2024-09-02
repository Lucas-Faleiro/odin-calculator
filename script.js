let firstNum = 0;
let secondNum = 0;
let operator = "";
let displayValue = 0;
const allDigits = document.querySelectorAll(".digit");
const resultText = document.querySelector("#result");

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

const displayDigit = (e) => {
  displayValue = e.target.innerText;
  if (resultText.innerText === "0") resultText.innerText = "";
  resultText.innerText += displayValue;
};

for (let i = 0; i < allDigits.length; i++) {
  allDigits[i].addEventListener("click", displayDigit);
}
