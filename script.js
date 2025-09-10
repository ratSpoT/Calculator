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
  fnum = Number(fnum);
  snum = Number(snum);
  switch (operator) {
    case "+":
      return String(add(fnum, snum));
    case "-":
      return String(subtract(fnum, snum));
    case "*":
      return String(multiply(fnum, snum));
    case "/":
      return String(Math.round(divide(fnum, snum) * 1000) / 1000);
    default:
      alert("Invalid operator!");
  }
}

let fnum = null;
let operator = null;
let snum = null;
let displayValue = null;
let justEvaluated = false;
let operatorConvertor = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
}

function handleNumber(input) {
  // if input is a number, check if operator exists, if so concat it to snum, else concat it to fnum
  // if number is just evaluated, rewrite over it
  if (operator === null) {
    if (justEvaluated || fnum === null) {
      fnum = String(input)
      justEvaluated = false;
    } else {
      fnum += String(input);
    }
    displayValue = fnum;
  } else {
    if (snum === null) {
      snum = input;
    } else {
      snum += String(input);
    }
    displayValue = fnum + operatorConvertor[operator] + snum;
  }
}

function handleOperator(input) {
  // if input is an operator, check if snum exists, if so perfrom the previous calculation first, else update operator
  // if - is given after a num, treat it as minus sign, and if given after snum, calculate previous nums first
  // if given when fnum is null or after a non minus operator, treat it as negative sign
  justEvaluated = false;
  if (snum === null) {
    if (input === "-") {
      if (fnum === null) {
        fnum = "-"
        displayValue = fnum;
      } else if (operator === null) {
        operator = input;
        displayValue = fnum + operatorConvertor[operator];
      } else if (operator !== null) {
        snum = "-"
        displayValue = fnum + operatorConvertor[operator] + snum;
      }
     } else {
      operator = input;
      if (fnum === null) {
        fnum = "0";
      }  
      displayValue = fnum + operatorConvertor[operator];
     }
  } else {    // if snum is not null, operator is not null too, thus fnum is not null too
    if ((Number(snum) === 0 || Number(snum) === -0) && operator === "/") {
      handleClear();
      displayValue = "ERROR";
    } else {
      fnum = operate(fnum, snum, operator);
      if (isNaN(fnum)) {
        handleClear();
        displayValue = "ERROR";
      } else {
        operator = input;
        snum = null;
        displayValue = fnum + operatorConvertor[operator];
      }
    }
  }
}

function handleClear() {
  // if input is clear, remove all values from all variables
  fnum = null;
  operator = null;
  snum = null;
  displayValue = null;
  justEvaluated = false;
}

function handleDelete() {
  // if input is delete, remove the last input (only limited to before = is pressed)
  justEvaluated = false;
  if (operator === null) {      // dealing with fnum
    if (fnum.length === 1) {
      fnum = null;
    } else {
      fnum = fnum.slice(0, fnum.length - 1);
    }
  } else if (snum === null) {    // dealing with operator
    operator = null;
  } else {        // dealing with snum
    if (snum.length === 1) {
      snum = null;
    } else {
      snum = snum.slice(0, snum.length - 1);
    }
  }
  displayValue = displayValue.slice(0, displayValue.length - 1);
}

function handleEvaluate() {
  // if input is evaluate, calculate based on current values
  // if fnum is present but snum is absent, perfrom the operator on fnum
  // if operator is missing too or no values provided at all, do nothing
  if (snum === null) {
    snum = fnum;
  }
  if (Number(snum) === 0 && operator === "/") {
    handleClear();
    displayValue = "ERROR";
  } else {
    fnum = operate(fnum, snum, operator);
    if (isNaN(fnum)) {
      handleClear();
      displayValue = "ERROR";
    } else {
      snum = null;
      operator = null;
      justEvaluated = true;
      displayValue = fnum;
    }
  }
}

function handleDecimal() {
  if (fnum === null || justEvaluated) {
    fnum = "0.";
    justEvaluated = false;
    displayValue = fnum;
  } else if (operator === null && !fnum.includes(".")) {
    if (fnum === "-") {
      fnum = "-0.";
    } else {
      fnum += ".";
    }
    displayValue = fnum;
  } else if (snum === null && operator !== null) {
    snum = "0.";
    displayValue = fnum + operatorConvertor[operator] + snum;
  } else if (snum !== null && !snum.includes(".")) {
    if (snum === "-") {
      snum = "-0.";
    } else {
      snum += ".";
    }
    displayValue = fnum + operatorConvertor[operator] + snum;
  }
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
    if (displayValue != null && displayValue.length >= 13 && input !== undefined) {
      handleClear();
      displayValue = "MAX LENGTH";
    } else if (!isNaN(input)) {
      handleNumber(input)
    } else if ("+-*/".includes(input)) {
      handleOperator(input);
    } else if (input === "clear") {
      handleClear();
    } else if (input === "delete" && fnum !== null) {
      handleDelete();
    } else if (input === "=" && fnum !== null && operator !== null) {
      handleEvaluate();
    } else if (input === ".") {
      handleDecimal();
    }
    display.textContent = displayValue;
  });
});
