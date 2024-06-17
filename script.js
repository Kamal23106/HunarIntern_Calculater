document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let memory = 0;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id;

            if (!isNaN(buttonId)) {
                currentInput += buttonId;
                display.textContent = currentInput;
            } else if (buttonId === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (buttonId === 'equals') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (buttonId === 'sqrt') {
                if (currentInput) {
                    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                    display.textContent = currentInput;
                }
            } else if (buttonId === 'percent') {
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.textContent = currentInput;
                }
            } else if (buttonId === 'mc') {
                memory = 0;
            } else if (buttonId === 'mr') {
                currentInput = memory.toString();
                display.textContent = currentInput;
            } else if (buttonId === 'mplus') {
                memory += parseFloat(currentInput);
            } else if (buttonId === 'mminus') {
                memory -= parseFloat(currentInput);
            } else {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    operator = buttonId;
                    currentInput = '';
                }
            }
        });
    });

    function calculate(first, second, operator) {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);

        switch (operator) {
            case 'add':
                return (num1 + num2).toString();
            case 'subtract':
                return (num1 - num2).toString();
            case 'multiply':
                return (num1 * num2).toString();
            case 'divide':
                return (num1 / num2).toString();
            default:
                return '0';
        }
    }
});
