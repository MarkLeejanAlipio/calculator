// Initialize selectors
const expression = document.querySelector('.expression');
const answer = document.querySelector('.answer');
const buttons = document.querySelectorAll('.choice');

// operators function
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Cannot divide by 0';
    }

    return a / b;
}

let firstNum = '';
let operator = '';
let secNum = '';
let expressionHistory = '';

// Pick the right math function based on the active operator.
function operate(currentOperator, a, b) {
    if (currentOperator === '+') {
        return add(a, b);
    } else if (currentOperator === '-') {
        return sub(a, b);
    } else if (currentOperator === 'x') {
        return multiply(a, b);
    } else if (currentOperator === '/') {
        return divide(a, b);
    }

    return null;
}

// Clear both the saved values and the two display areas.
function resetCalculator() {
    firstNum = '';
    operator = '';
    secNum = '';
    expressionHistory = '';
    expression.textContent = '';
    answer.textContent = '';
}

// Delete from right to left: second number, then operator, then first number.
function deleteLastEntry() {
    if (expressionHistory) {
        resetCalculator();
        return;
    }

    answer.textContent = '';

    if (secNum) {
        secNum = secNum.slice(0, -1);
    } else if (operator) {
        operator = '';
    } else {
        firstNum = firstNum.slice(0, -1);
    }

    renderDisplay();
}

// Show either the live expression being typed or the last solved expression.
function renderDisplay() {
    if (expressionHistory) {
        expression.textContent = expressionHistory;
        return;
    }

    expression.textContent = `${firstNum} ${operator} ${secNum}`;
}

// Round number results a bit so floating-point decimals stay readable.
function formatResult(result) {
    if (typeof result === 'number') {
        return Number(result.toFixed(10)).toString();
    }

    return result;
}

// Solve the current expression, show the result, and save the full expression.
function calculateResult() {
    if (!firstNum || !operator || !secNum) {
        return;
    }

    expressionHistory = `${firstNum} ${operator} ${secNum}`;
    const result = operate(operator, Number(firstNum), Number(secNum));
    const formattedResult = formatResult(result);

    answer.textContent = formattedResult;

    if (formattedResult === 'Cannot divide by 0') {
        firstNum = '';
        operator = '';
        secNum = '';
        renderDisplay();
        return;
    }

    firstNum = formattedResult;
    operator = '';
    secNum = '';
    renderDisplay();
}

// Add digits to the current side of the expression and guard decimal input.
function handleNumber(value) {
    if (expressionHistory) {
        resetCalculator();
    }

    if (value === '.') {
        const currentNumber = operator ? secNum : firstNum;

        if (currentNumber.includes('.')) {
            return;
        }

        if (currentNumber === '') {
            value = '0.';
        }
    }

    answer.textContent = '';

    if (!operator) {
        firstNum += value;
    } else {
        secNum += value;
    }

    renderDisplay();
}

// Save the chosen operator, or replace it if the user changes their mind.
function handleOperator(value) {
    if (!firstNum) {
        return;
    }

    if (expressionHistory) {
        expressionHistory = '';
    }

    answer.textContent = '';

    if (operator && !secNum) {
        operator = value;
        renderDisplay();
        return;
    }

    if (operator && secNum) {
        calculateResult();

        if (!firstNum) {
            return;
        }
    }

    operator = value;
    renderDisplay();
}

// Convert the current number into a percentage by dividing it by 100.
function handlePercent() {
    if (expressionHistory) {
        expressionHistory = '';
    }

    if (secNum) {
        secNum = formatResult(Number(secNum) / 100);
    } else if (firstNum) {
        firstNum = formatResult(Number(firstNum) / 100);
    } else {
        return;
    }

    answer.textContent = '';
    renderDisplay();
}

// Listen to every calculator button and send it to the right handler.
function updateVar() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                handleNumber(value);
                return;
            }

            if (value === 'Clear') {
                resetCalculator();
                return;
            }

            if (value === 'Del') {
                deleteLastEntry();
                return;
            }

            if (value === '=') {
                calculateResult();
                return;
            }

            if (value === '%') {
                handlePercent();
                return;
            }

            handleOperator(value);
        });
    });
}

updateVar();
