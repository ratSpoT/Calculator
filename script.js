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

let fnum, operator, snum;
