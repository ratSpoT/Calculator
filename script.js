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
let operatorConvertor = {
  "+": "+",
  "-": "-",
  "*": "x",
  "/": "÷",
}

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
  clear: "clear",
  del: "delete",
};
const btns = document.querySelectorAll("button");

btns.forEach(btn => {
  btn.addEventListener("click", e => {
    let input = buttonLabel[e.target.getAttribute("class")];
    // if input is a number, check if operator exists, if so concat it to snum, else concat it to fnum
    if (!isNaN(input)) {
      if (operator === null) {
        if (fnum === null) {
          fnum = input;
        } else {
          fnum = fnum * 10 + input;
        }
        displayValue = String(fnum);
      } else {
        if (snum === null) {
          snum = input;
        } else {
          snum = snum * 10 + input;
        }
        displayValue = String(fnum) + operatorConvertor[operator] + String(snum);
      }
    }
    // if input is an operator, check if snum exists, if so perfrom the previous calculation first, else update operator
    else if ("+-*/".includes(input)) {
      if (snum === null) {
        operator = input;
        if (fnum === null) {
          fnum = 0;
          displayValue = "0" + operatorConvertor[operator];
        } else {
          displayValue = String(fnum) + operatorConvertor[operator];
        }
      } else {    // if snum is not null, operator is not null too
        if (fnum === null) {
          fnum = 0;
        }
        fnum = operate(fnum, snum, operator);
        operator = input;
        snum = null;
        displayValue = String(fnum) + operatorConvertor[operator];
      }
    }
    // if input is clear, remove all values from all variables
    else if (input === "clear") {
      fnum = null;
      operator = null;
      snum = null;
      displayValue = null;
    }
    // if input is delete, remove the last input (only limited to before = is pressed)
    else if (input === "delete") {
      displayValue = displayValue.slice(0, displayValue.length - 1);
      if (fnum !== null) {
        if (operator === null) {
          if (fnum < 10) {
            fnum = null;
          } else {
            fnum = Math.floor(fnum / 10);
          }
        } else if (snum === null) {
          operator = null;
        } else {
          if (snum < 10) {
            snum = null;
          } else {
            snum = Math.floor(snum / 10);
          }
        }
      }
    }
    display.textContent = displayValue;
    // if input is evaluate, calculate based on current values
    // if fnum is present but snum is absent, perfrom the operator on fnum
    // if operator is missing too, perform the previous operation ran
    // if no previous operation ran, do nothing
    // if operator is given then a num is given, treat fnum as 0 and snum as num given
  });
});

