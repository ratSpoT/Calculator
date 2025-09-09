function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a b) {
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

let fnum, operator, snum, displayValue;

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

btns.forEach(btn, () => {
  btn.addEventListener("click", e => {
    displayValue = e.getAttribute("class");
  });
});

