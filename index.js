const expression = document.querySelector('.expression');
const answer = document.querySelector('.answer');
const buttons = document.querySelectorAll('button');

let firstNum = '';
let operator = '';
let secNum = '';
let expressionHistory = '';

// Basic Math Functions
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) return 'Cannot divide by 0';
    return a / b;
}

// Operate Function
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case 'x':
            return multiply(a, b);
        case '/': 
            return division(a, b);
    }
}

// Update Number when a number button is clicked
function updateNum(value) {
    if (!operator) {
        firstNum += value;
    } else {
        secNum += value;
    }

    renderDisplay()
}

// Update Operator 
function updateOperator(value) {
    if (!firstNum) {
        return;
    }

    operator = value;
    renderDisplay()
}

// Render Display
function renderDisplay() {
    if (expressionHistory) {
        expression.textContent = expressionHistory;
    } else {
        expression.textContent = `${firstNum} ${operator} ${secNum}`;
    }
}

// Calculate 
function calculate(operator, a, b) {
    expressionHistory = `${a} ${operator} ${b}`;
    let result = operate(operator, +a, +b);
    answer.textContent = result;

    renderDisplay()
}

// Clear
function clear() {
    firstNum = '';
    operator = '';
    secNum = '';
    expressionHistory = '';
    expression.textContent = '';
    answer.textContent = '';
}

