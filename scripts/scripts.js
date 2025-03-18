const input = document.querySelector("#input");
const output = document.querySelector("#output");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operation");
const clearAll = document.querySelector("#clear");
const deleteLast = document.querySelector("#delete");
const result = document.querySelector("#result");

let inputs = "";

function reset() {
  inputs = "";
}

for (const number of numbers) {
  number.addEventListener("click", function (event) {
    inputs += event.target.innerHTML;
    input.value = inputs;
  });
}

for (const operator of operators) {
  operator.addEventListener("click", function (event) {
    inputs += event.target.innerHTML;
    input.value = inputs;
  });
}

clearAll.addEventListener("click", function() {
    reset();
    input.value = "";
    output.value = 0;
});

deleteLast.addEventListener("click", function () {
  inputs = inputs.slice(0, inputs.length - 1);
  input.value = inputs;
});

function infixToPostfix(infix) {
  const precedence = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };

  const stack = [];
  const postfix = [];
  const tokens = infix.split(/(\d+|\+|\-|\*|\/)/);

  for (const token of tokens) {
    if (!isNaN(token)) {
      postfix.push(token);
    } else if (precedence[token]) {
      while (
        stack.length > 0 &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        postfix.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    postfix.push(stack.pop());
  }

  return postfix.join("");
}

function evaluatePostfix(tokens) {
  let stack = [];

  for (let token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      let b = stack.pop();
      let a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

result.addEventListener("click", function() {
    const expression = infixToPostfix(inputs);
    const total = evaluatePostfix(expression);
    output.value = total;
    inputs = "";
    input.value = inputs;
})