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

function resetCalculator() {
    firstNum = '';
    operator = '';
    secNum = '';
    expressionHistory = '';
    expression.textContent = '';
    answer.textContent = '';
}

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

function renderDisplay() {
    if (expressionHistory) {
        expression.textContent = expressionHistory;
        return;
    }

    expression.textContent = `${firstNum} ${operator} ${secNum}`;
}

function formatResult(result) {
    if (typeof result === 'number' && Number.isFinite(result)) {
        return Number(result.toFixed(10)).toString();
    }

    return result;
}

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
