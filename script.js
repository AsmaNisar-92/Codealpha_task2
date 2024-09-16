
let resultDisplay = document.querySelector('.result span');
let currentInput = '';
let operation = '';
let firstOperand = null;
let isOperatorPressed = false;

function updateDisplay(value) {
    // If the display is showing '0' or an operator was pressed, clear the display
    if (resultDisplay.innerText === '0' || isOperatorPressed) {
        resultDisplay.innerText = ''; 
        isOperatorPressed = false;
    }

    currentInput += value;
    resultDisplay.innerText = currentInput;
}

function clearData() {
    currentInput = '';
    operation = '';
    firstOperand = null;
    resultDisplay.innerText = '0';
}

function handleOperation(op) {
    if (currentInput === '' && op !== '=') return;

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        currentInput = '';
    } else if (operation) {
        let secondOperand = parseFloat(currentInput);
        switch (operation) {
            case '+':
                firstOperand += secondOperand;
                break;
            case '-':
                firstOperand -= secondOperand;
                break;
            case '*':
                firstOperand *= secondOperand;
                break;
            case '/':
                if (secondOperand !== 0) {
                    firstOperand /= secondOperand;
                } else {
                    alert("Dividing by 0 is not allowed!");
                    clearData();
                    return;
                }
                break;
            case '%':
                firstOperand %= secondOperand;
                break;
            case '^':
                firstOperand = Math.pow(firstOperand, secondOperand);
                break;
        }
        currentInput = '';
    }

    isOperatorPressed = true;
    operation = op;

    if (op !== '=') {
        resultDisplay.innerText = firstOperand + ` ${op} `;
    } else {
        resultDisplay.innerText = firstOperand;
        operation = ''; 
    }
}

document.querySelectorAll('.operation > div').forEach(button => {
    button.addEventListener('click', function () {
        let buttonClass = this.className;

        if (buttonClass.startsWith('num')) {
            let number = this.innerText.trim();
            updateDisplay(number);
        }

        if (buttonClass === 'Dot') {
            if (!currentInput.includes('.')) {
                updateDisplay('.');
            }
        }

        if (buttonClass === 'Add') handleOperation('+');
        if (buttonClass === 'Subtract') handleOperation('-');
        if (buttonClass === 'multiply') handleOperation('*');
        if (buttonClass === 'Division') handleOperation('/');
        if (buttonClass === 'Modulus') handleOperation('%');
        if (buttonClass === 'Power') handleOperation('^');
        if (buttonClass === 'equal') handleOperation('=');

        if (buttonClass === 'Clear') {
            clearData();
        }
    });
});
