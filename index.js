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
    expressionHistory = '';

    const currentNumber = operator ? secNum : firstNum;

    if (value === '.') {
        if (currentNumber.includes('.')) {
            return;
        }

        if (currentNumber === '') {
            value = '0.';
        }
    }

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

    expressionHistory = '';
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
function calculate(operator, a, b ) {
    if (!a || !operator || !b) return;

    expressionHistory = `${a} ${operator} ${b}`;
    let result = operate(operator, +a, +b);
    answer.textContent = result;

    firstNum = result;
    operator = '';
    secNum = '';

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

// Delete last entry
function del() {
    if (expressionHistory) clear();
    if (secNum) {
        secNum = secNum.slice(0, -1);
    } else if (!secNum && operator) {
        operator = '';
    } else {
        firstNum = firstNum.slice(0, -1);
    }

    renderDisplay();
}

// Event Listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            updateNum(value);
            return;
        }

        if (value === 'Clear') {
            clear();
            return;
        }

        if (value === 'Del') {
            del();
            return;
        }

        if (value === '=') {
            calculate(operator, firstNum, secNum);
            return;
        }

        updateOperator(value);
    });
});
