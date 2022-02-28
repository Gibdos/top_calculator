// Grab all the buttons
const displayResult = document.querySelector(".display");
const btnReset = document.querySelector(".reset");
const btnBackspace = document.querySelector(".delete");
const btnDot = document.querySelector(".decimal");
const btnDigit = document.querySelectorAll(".digit");
const btnEqual = document.querySelector(".equals");
const btnAdd = document.querySelector(".add");
const btnSubtract = document.querySelector(".subtract");
const btnMultiply = document.querySelector(".multiply");
const btnDivide = document.querySelector(".divide");

// Set up start state
let firstNumber = 0;
let operator = "";
let lastNumber = 0;

// Set up EventListeners
btnReset.addEventListener("click", fnReset());
btnBackspace.addEventListener("click", fnBackspace());
btnDot.addEventListener("click", fnDecimal());
btnEqual.addEventListener("click", fnCalculate());
btnAdd.addEventListener("click", fnAdd());
btnSubtract.addEventListener("click", fnSubtract());
btnMultiply.addEventListener("click", fnMultiply());
btnDivide.addEventListener("click", fnDivide());

btnDigit.forEach((e) => {
	e.addEventListener("click", fnNumber(e.textContent));
});
