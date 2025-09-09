function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(fnum, snum, operator) {
  switch (operator) {
    case "+":
      return add(fnum, snum);
    case "-":
      return subtract(fnum, snum);
    case "*":
      return multiply(fnum, snum);
    case "/":
      return divide(fnum, snum);
    default:
      alert("Invalid operator!");
  }
}

let fnum = null;
let operator = null;
let snum = null;
let displayValue = null;

const display = document.querySelector("div.display");

const buttonLabel = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
  evaluate: "=",
  decimal: ".",
  clear: null,
  delete: null,
};
const btns = document.querySelectorAll("button");

btns.forEach(btn => {
  btn.addEventListener("click", e => {
    let input = buttonLabel[e.target.getAttribute("class")];
    // if input is a number, check if operator exists, if so concat it to snum, else concat it to fnum
    if (!isNaN(input)) {
      
    }
    // if input is an operator, check if snum exists, if so perfrom the previous calculation first, else update operator
    else if "+-*/".includes(displayValue)
    display.textContent = displayValue;

    // if input is clear, remove all values from all variables

    // if input is delete, remove the last input (only limited to before = is pressed)

    // if input is evaluate, calculate based on current values
    // 
  });
});

