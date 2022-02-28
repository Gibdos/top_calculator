// Grab all the buttons
const displayLast = document.querySelector(".last-calc");
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
let firstNumberDisp = "";
let firstNumDec = false;
let lastNumberDisp = "";
let lastNumDec = false;
let operator = "";
let operatorUsed = false;
let display = displayResult.textContent;
let result = 0;
let lastCalc = "";

// Set up Display function
function displayCalc() {
	if (firstNumberDisp === "") {
		displayResult.textContent = "0";
	} else {
		displayResult.textContent = `${firstNumberDisp} ${operator} ${lastNumberDisp}`;
	}
}

// Set up digit [DIGITS] Fn
function fnNumber(number) {
	if (!operatorUsed) {
		firstNumberDisp += number;
		displayCalc();
	} else {
		lastNumberDisp += number;
		displayCalc();
	}
}

// Clear the Display [CLEAR] Fn
function fnReset() {
	displayResult.textContent = 0;
	lastCalc = "";
	displayLast.textContent = "";
	display = "";
	firstNumberDisp = "";
	firstNumDec = false;
	lastNumberDisp = "";
	lastNumDec = false;
	operator = "";
	operatorUsed = false;
	result = 0;
}

// Calculate Result [EQUALS | OPERATOR] Fn
function fnCalculate() {
	if (firstNumberDisp === "." || lastNumberDisp === ".") {
		displayResult.textContent = `Error! Please CLEAR.`;
	} else {
		switch (operator) {
			case "+":
				result = parseFloat(firstNumberDisp) + parseFloat(lastNumberDisp);
				lastCalc = `${firstNumberDisp} ${operator} ${lastNumberDisp} = ${result}`;
				displayResult.innerHTML = result;
				displayLast.innerHTML = lastCalc;
				firstNumDec = false;
				lastNumDec = false;
				displayResult.classList.add("result-displayed");
				setTimeout(() => {
					displayResult.classList.remove("result-displayed");
				}, 150);
				break;
			case "-":
				result = parseFloat(firstNumberDisp) - parseFloat(lastNumberDisp);
				lastCalc = `${firstNumberDisp} ${operator} ${lastNumberDisp} = ${result}`;
				displayResult.innerHTML = result;
				displayLast.innerHTML = lastCalc;
				firstNumDec = false;
				lastNumDec = false;
				displayResult.classList.add("result-displayed");
				setTimeout(() => {
					displayResult.classList.remove("result-displayed");
				}, 150);
				break;
			case "x":
				result = parseFloat(firstNumberDisp) * parseFloat(lastNumberDisp);
				lastCalc = `${firstNumberDisp} ${operator} ${lastNumberDisp} = ${result}`;
				displayResult.innerHTML = result;
				displayLast.innerHTML = lastCalc;
				firstNumDec = false;
				lastNumDec = false;
				displayResult.classList.add("result-displayed");
				setTimeout(() => {
					displayResult.classList.remove("result-displayed");
				}, 150);
				break;
			case "%":
				if (firstNumberDisp === "0" || lastNumberDisp === "0") {
					displayResult.innerHTML = `Sneaky, aint'cha?`;
					displayLast.innerHTML = `Press CLEAR to reset.`;
					break;
				} else {
					result = parseFloat(firstNumberDisp) / parseFloat(lastNumberDisp);
					lastCalc = `${firstNumberDisp} ${operator} ${lastNumberDisp} = ${result}`;
					displayResult.innerHTML = result;
					displayLast.innerHTML = lastCalc;
					firstNumDec = false;
					lastNumDec = false;
					displayResult.classList.add("result-displayed");
					setTimeout(() => {
						displayResult.classList.remove("result-displayed");
					}, 150);
					break;
				}
		}
	}
}

// Set up EventListeners
// [CLEAR] Button
btnReset.addEventListener("click", () => {
	fnReset();
});

// [DEL] Button
btnBackspace.addEventListener("click", () => {
	if (!operatorUsed) {
		if (firstNumberDisp === "") {
		} else {
			if (firstNumDec === true) {
				if (firstNumberDisp.charAt(firstNumberDisp.length - 1) === ".") {
					firstNumberDisp = firstNumberDisp.slice(0, -1);
					displayCalc();
					firstNumDec = false;
				} else {
					firstNumberDisp = firstNumberDisp.slice(0, -1);
					displayCalc();
				}
			} else {
				firstNumberDisp = firstNumberDisp.slice(0, -1);
				displayCalc();
			}
		}
	} else {
		if (lastNumberDisp === "") {
			operatorUsed = false;
			operator = "";
			displayCalc();
		} else {
			if (lastNumberDisp.charAt(lastNumberDisp.length - 1) === ".") {
				lastNumberDisp = lastNumberDisp.slice(0, -1);
				displayCalc();
				lastNumDec = false;
			} else {
				lastNumberDisp = lastNumberDisp.slice(0, -1);
				displayCalc();
			}
		}
	}
});

// [DECIMAL] Button
btnDot.addEventListener("click", () => {
	if (!operatorUsed && !firstNumDec) {
		firstNumberDisp += ".";
		firstNumDec = true;
		displayCalc();
	} else if (operatorUsed && !lastNumDec) {
		lastNumberDisp += ".";
		lastNumDec = true;
		displayCalc();
	}
});

// [EQUALS] Button
btnEqual.addEventListener("click", () => {
	if (firstNumberDisp === "." || lastNumberDisp === ".") {
		return;
	} else if (firstNumberDisp != "" && lastNumberDisp != "") {
		fnCalculate();
		operatorUsed = false;
		firstNumberDisp = result;
		lastNumberDisp = "";
		displayResult.classList.add("result-displayed");
		setTimeout(() => {
			displayResult.classList.remove("result-displayed");
		}, 150);
	} else {
	}
});

// [+] Button
btnAdd.addEventListener("click", () => {
	if (firstNumberDisp === "." || lastNumberDisp === ".") {
		return;
	} else if (firstNumberDisp === "") {
	} else {
		if (operatorUsed) {
			if (lastNumberDisp === "") {
				operator = "+";
				operatorUsed = true;
				displayCalc();
			} else {
				fnCalculate();
				firstNumberDisp = result;
				lastNumberDisp = "";
				operator = "+";
				operatorUsed = true;
				displayCalc();
			}
		} else {
			operatorUsed = true;
			operator = "+";
			displayCalc();
		}
	}
});

// [-] Button
btnSubtract.addEventListener("click", () => {
	if (firstNumberDisp === "." || lastNumberDisp === ".") {
		return;
	} else if (firstNumberDisp === "") {
		firstNumberDisp = "-";
		displayCalc();
	} else {
		if (operatorUsed) {
			if (lastNumberDisp === "") {
				lastNumberDisp = "-";
				displayCalc();
			} else {
				fnCalculate();
				firstNumberDisp = result;
				lastNumberDisp = "";
				operator = "-";
				operatorUsed = true;
				displayCalc();
			}
		} else {
			operatorUsed = true;
			operator = "-";
			displayCalc();
		}
	}
});

// [x] Button
btnMultiply.addEventListener("click", () => {
	if (firstNumberDisp === "." || lastNumberDisp === ".") {
	} else if (firstNumberDisp === "") {
	} else {
		if (operatorUsed) {
			if (lastNumberDisp === "") {
				operator = "x";
				operatorUsed = true;
				displayCalc();
			} else {
				fnCalculate();
				firstNumberDisp = result;
				lastNumberDisp = "";
				operator = "x";
				operatorUsed = true;
				displayCalc();
			}
		} else {
			operatorUsed = true;
			operator = "x";
			displayCalc();
		}
	}
});

// [%] Button
btnDivide.addEventListener("click", () => {
	if (
		firstNumberDisp === "." ||
		lastNumberDisp === "." ||
		firstNumberDisp === "0" ||
		lastNumberDisp === "0"
	) {
	} else if (firstNumberDisp === "") {
	} else {
		if (operatorUsed) {
			if (lastNumberDisp === "") {
				operator = "%";
				operatorUsed = true;
				displayCalc();
			} else {
				fnCalculate();
				firstNumberDisp = result;
				lastNumberDisp = "";
				operator = "%";
				operatorUsed = true;
				displayCalc();
			}
		} else {
			operatorUsed = true;
			operator = "%";
			displayCalc();
		}
	}
});

// [1|2|3|4|5|6|7|8|9|0] Button
btnDigit.forEach((e) => {
	e.addEventListener("click", () => {
		fnNumber(e.textContent);
	});
}, 1);

// Keyboard support
window.addEventListener("keydown", (e) => {
	let keyPressed = e.key;
	let keyValue = document.querySelector(`[data-key='${keyPressed}']`);
	switch (keyPressed) {
		case "1":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "2":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "3":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "4":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "5":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "6":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "7":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "8":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "9":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "0":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case ".":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "Enter":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "+":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "-":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "*":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "/":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "Backspace":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
		case "Escape":
			document.querySelector(`[data-key='${keyPressed}']`).click();
			document
				.querySelector(`[data-key='${keyPressed}']`)
				.classList.add("animation");
			setTimeout(() => {
				document
					.querySelector(`[data-key='${keyPressed}']`)
					.classList.remove("animation");
			}, 50);
			break;
	}
});
