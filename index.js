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
    if (expressionHistory && !operator) {
        firstNum = '';
        answer.textContent = '';
    }

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

// Format result so it doesn't become too big
function formatResult(result) {
    if (typeof result === 'number') {
        return Number(result.toFixed(10)).toString();
    }

    return result;
}

// Handle the percent
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

// Calculate 
function calculate(operator, a, b ) {
    if (a === '' || operator === '' || b === '') return;

    expressionHistory = `${a} ${operator} ${b}`;
    let result = operate(operator, +a, +b);
    if (result === 'Cannot divide by 0') {
        clear();
        answer.textContent = result;
        return;
    }
    let formattedResult = formatResult(result)
    answer.textContent = formattedResult;

    firstNum = formattedResult;
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
    if (expressionHistory) {
        clear();
        return;
    }

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

        if (value === '%') {
            handlePercent();
            return;
        }

        updateOperator(value);
    });
});
