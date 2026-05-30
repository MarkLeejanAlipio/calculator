# Calculator

A small browser calculator built with plain HTML, CSS, and JavaScript.

# Preview
![Project Image](/image.png)

# Live
[Live Page](https://markleejanalipio.github.io/calculator/)

# Features

- Basic operations: `+`, `-`, `x`, `/`
- Decimal input and percent conversion
- Delete and clear controls

# Pseudocode
1. CREATE basic math functions
    - `add`
    - `subtract`
    - `multiply`
    - `divide`
        - return `Cannot divide by 0` if `secNum` === 0
2. DECLARE variables
    - `firstNum` = the first input number 
    - `operator` = the math operator
    - `secNum` = the second input number
    - `expressionHistory` = the completed calculation shown after pressing equals
3. CREATE `operate` function that takes the declared variables and calls the math functions based on the operator
4. CREATE html calculator structure
5. CREATE a function that updates the num variables when a digit is clicked
    - add digits to `firstNum` if no operator exists
    - add digits to `secNum` if an operator exists
    - prevent adding more than one decimal point to the current number
    - if decimal is clicked first, start the current number with `0.`
6. CREATE a function that updates the operator when an operator button is clicked
    - ignore the operator if `firstNum` is empty
    - store the selected operator
7. CREATE a function that displays the inputs in real time
    - show `expressionHistory` after a completed calculation
    - otherwise show `firstNum`, `operator`, and `secNum`
8. CREATE a function that formats a long answer (lots of decimals)
9. CREATE a function that handles percent button clicks
    - convert `secNum` to a percent if it exists
    - otherwise convert `firstNum` to a percent if it exists
10. CREATE a function that calculates the result when equals is clicked
    - do nothing if `firstNum`, `operator`, or `secNum` is missing
    - save the completed expression in `expressionHistory`
    - display the formatted result
    - store the result as `firstNum` so the user can continue calculating
    - reset `operator` and `secNum`
11. ADD event handler for `clear` button to remove any existing data
12. ADD event handler for `del` button to remove the last input
    - remove the last digit from `secNum` if it exists
    - otherwise remove the operator if it exists
    - otherwise remove the last digit from `firstNum`
13. WHEN result is displayed, pressing new digit clears the calculator and adds the digit to start a new calculation
