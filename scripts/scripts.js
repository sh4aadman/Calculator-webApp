const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operation");
const result = document.querySelector("#result");

let inputs = [];
let tokens = [];
let operands = [];

for (const number of numbers) {
  number.addEventListener("click", function (event) {
    inputs.push(event.target.innerHTML);
  });
}

for (const operator of operators) {
  operator.addEventListener("click", function (event) {
    inputs.push(event.target.innerHTML);
  });
}

result.addEventListener("click", function () {
  console.log(inputs);
});
