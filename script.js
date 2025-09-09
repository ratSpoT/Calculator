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
      return Math.round(divide(fnum, snum) * 1000) / 1000;
    default:
      alert("Invalid operator!");
  }
}

let fnum = null;
let operator = null;
let snum = null;
let displayValue = null;
let isDecimal = false;
let isNegative = false;
let operatorConvertor = {
  "+": "+",
  "-": "-",
  "*": "×",
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
    if (displayValue != null && displayValue.length >= 13 && input !== undefined) {
      displayValue = "MAX LENGTH";
      fnum = null;
      operator = null;
      snum = null;
      displayValue = null;
      isDecimal = false;
    }
    // if input is a number, check if operator exists, if so concat it to snum, else concat it to fnum
    // it doesn't matter if the number is just derived, I like it this way
    else if (!isNaN(input)) {
      if (operator === null) {
        if (fnum === null) {
          if (isDecimal) {
            fnum = input / 10;
          } else if (isNegative) {
            fnum = -input;
            isNegative = false;
          } else {
            fnum = input;
          }
        } else {
          if (isDecimal) {
            fnum = Number(String(fnum) + "." + String(input));
            isDecimal = false;
          } else {
            fnum = Number(String(fnum) + String(input));
          }
        }
        displayValue = String(fnum);
      } else {
        if (snum === null) {
          if (isDecimal) {
            snum = input / 10;
          } else if (isNegative) {
            snum = -input;
            isNegative = false;
          } else {
            snum = input;
          }
        } else {
          if (isDecimal) {
            snum = Number(String(snum) + "." + String(input));
            isDecimal = false;
          } else {
            snum = Number(String(snum) + String(input));
          }
        }
        displayValue = String(fnum) + operatorConvertor[operator] + String(snum);
      }
    }
    // if input is an operator, check if snum exists, if so perfrom the previous calculation first, else update operator
    else if ("+-*/".includes(input)) {
      if (snum === null) {
        if (input === "-") {
          if (fnum === null) {
            isNegative = true;
            displayValue = "-";
          } else if (operator === null) {
            operator = input;
            displayValue = String(fnum) + operatorConvertor[operator];
          } else if (operator !== null) {
            isNegative = true;
            displayValue = String(fnum) + operatorConvertor[operator] + "-";
          }
         } else {
          operator = input;
          if (fnum === null) {
            fnum = 0;
            displayValue = "0" + operatorConvertor[operator];
          } else {
            displayValue = String(fnum) + operatorConvertor[operator];
          }
        }
      } else {    // if snum is not null, operator is not null too, thus fnum is not null too
        if (fnum === 0 && operator === "/") {
          fnum = null;
          operator = null;
          snum = null;
          displayValue = null;
          isDecimal = false;
          isNegative = false;
          displayValue = "ERROR";
        } else {
          fnum = operate(fnum, snum, operator);
          operator = input;
          snum = null;
          isDecimal = false;
          isNegative = false;
          displayValue = String(fnum) + operatorConvertor[operator];
        }
      }
    }
    // if input is clear, remove all values from all variables
    else if (input === "clear") {
      fnum = null;
      operator = null;
      snum = null;
      displayValue = null;
      isDecimal = false;
      isNegative = false;
    }
    // if input is delete, remove the last input (only limited to before = is pressed)
    else if (input === "delete" && fnum !== null) {
      displayValue = displayValue.slice(0, displayValue.length - 1);
      if (isNegative) {
        isNegative = false;
      }
      else if (operator === null) {
        if (String(fnum).length <= 1) {
          fnum = null;
        } else {
          fnum = Number(String(fnum).slice(0, String(fnum).length - 1));
        }
      } else if (snum === null) {
        operator = null;
      } else {
        if (String(snum).length <= 1) {
          snum = null;
        } else {
          snum = Number(String(snum).slice(0, String(snum).length - 1));
        }
      }
    }
    // if input is evaluate, calculate based on current values
    // if fnum is present but snum is absent, perfrom the operator on fnum
    // if operator is missing too or no values provided at all, do nothing
    else if (input === "=") {
      if (fnum !== null && operator !== null && snum !== null) {
        if (fnum === 0 && operator === "/") {
          fnum = null;
          operator = null;
          snum = null;
          isDecimal = false;
          isNegative = false;
          displayValue = "ERROR";
        } else {
          fnum = operate(fnum, snum, operator);
          snum = null;
          operator = null;
          isDecimal = false;
          isNegative = false;
          displayValue = String(fnum);
        }
      } else if (operator !== null && snum === null) {  // if operator is not null, fnum cannot be null too
        if (fnum === 0 && operator === "/") {
          fnum = null;
          operator = null;
          displayValue = "ERROR";
        } else {
          if (isDecimal) {
            snum = 0;
          } else {
            snum = fnum;
          }
          fnum = operate(fnum, snum, operator);  
          operator = null;
          snum = null;
          displayValue = String(fnum);
        }
      }
      isDecimal = false;
    }
    // if input is decimal, add decimal to number
    // if no number present, set counter to true such that next number type would cause 
    else if (input === ".") {
      if (fnum === null) {
        fnum = 0;
        isDecimal = true;
        displayValue = "0.";
      } else if (operator === null) {
        if (!String(fnum).includes(".")) {
          isDecimal = true;
          displayValue = String(fnum) + ".";
        }
      } else if (snum === null) {
        snum = 0;
        isDecimal = true;
        displayValue = String(fnum) + operatorConvertor[operator] + "0."
      } else {
        if (!String(snum).includes(".")) {
          isDecimal = true;
          displayValue = String(fnum) + operatorConvertor[operator] + String(snum) + ".";
        }
      }
    }
    display.textContent = displayValue;
  });
});
