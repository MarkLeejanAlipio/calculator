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