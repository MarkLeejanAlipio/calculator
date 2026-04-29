// Initialize selectors
const expression = document.querySelector('.expression');
const answer = document.querySelector('.answer');
const buttons = document.querySelectorAll('.choice');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        expression.textContent += buttonValue;
    });
});

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

