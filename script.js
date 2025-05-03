const displayCont = document.querySelector("#displayCont");

const btnsList = document.querySelectorAll("button");

let operand1, operand2, currentResult;
let operator = "";
let tempStr = "";

btnsList.forEach((btn) => btn.addEventListener("click", () => handleBtn(btn)));


function handleBtn(btn) {
    const userClickedValue = btn.value;

    switch (userClickedValue) {
        case "clear": handleClear();
            break;
        case "del": handleDel();
            break;
        case "+": handleOperands("+")
            break;
        case "-": handleOperands("-");
            break;
        case "/": handleOperands("/");
            break;
        case "*": handleOperands("*");
            break;
        case "=": handleEqualsToResult();
            break;
        default: handleNumber(userClickedValue);
            break;
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        handleNumber(key);
        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleOperands(key);
        return;
    }

    if (key === "Enter" || key === "=") {
        e.preventDefault(); // prevent form submission if any
        handleEqualsToResult();
        return;
    }

    if (key === "Backspace") {
        handleDel();
        return;
    }

    if (key === "Escape") {
        handleClear();
        return;
    }
});


let justEvaluated = false;

function handleNumber(digitOrDecimalPoint) {
    if (justEvaluated) {
        tempStr = "";
        operand1 = null;
        operand2 = null;
        currentResult = null;
        operator = "";
        justEvaluated = false;
    }

    if (digitOrDecimalPoint === "." && tempStr.includes(".")) return;

    tempStr += digitOrDecimalPoint;
    displayCont.textContent = tempStr;
}

function handleOperands(clickedOperator) {
    if (operand1 === undefined || operand1 === null) {
        operand1 = Number(tempStr);
        tempStr = "";
        operator = clickedOperator;
        return;
    }

    operand2 = Number(tempStr);

    operate(operator, operand1, operand2);

    if (typeof currentResult === "number") {
        let result;
        if (Number.isInteger(currentResult)) {
            result = currentResult;
        } else {
            result = currentResult.toFixed(2);
        }

        displayCont.textContent = result;

        operand1 = currentResult;
        operand2 = null;
        currentResult = null;

        operator = clickedOperator;
    }

    tempStr = "";
}

function operate(oper, num1, num2) {

    switch (oper) {
        case "+": currentResult = num1 + num2;
            break;
        case "-": currentResult = num1 - num2;
            break;
        case "/": if (num2 === 0) {
            handleClear("Please don't crash me 😭");
            currentResult = null;
        } else {
            currentResult = num1 / num2;
        }
            break;
        case "*": currentResult = num1 * num2;
            break;
    }
}

function handleClear(errorMsg) {
    operand1 = null;
    operand2 = null;
    currentResult = null;
    operator = "";
    tempStr = "";
    if (errorMsg) {
        displayCont.textContent = errorMsg;
    } else {
        displayCont.textContent = "";
    }
}

function handleDel() {
    if (!tempStr) return;
    tempStr = tempStr.slice(0, -1);
    displayCont.textContent = tempStr;
}

function handleEqualsToResult() {
    if (!operator || tempStr === "") return;
    handleOperands(operator);
    operator = "";
    justEvaluated = true;
}