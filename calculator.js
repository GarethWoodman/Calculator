let buttons = document.querySelectorAll('button');
let screen = document.querySelector('#screen')
screen.value = 0;

let isNumber = /[0-9]/;
let isOperator = /[/*+-]/;

let firstNumber = 0;
let secondNumber = 0;
let calculations = 0;
let dots = 0;

let operator = "";
let lastOperator = "";

let resetScreen = false;
let operatorPressed = false;

let multiOperator = [];

buttons.forEach(function(button){
    button.addEventListener('click', function() {
        let buttonContent = this.textContent;

        if(isOperator.test(buttonContent)){
            operator = buttonContent;
            calculations += 1;
            resetScreen = false;
            dots = 0;
            if(lastOperator != operator || operatorPressed){
                return calculations = 1;
            }
            if(calculations == 2){
                operatorPressed = true;
                returnSum();
            }
            return;
        }

        if(buttonContent == "="){
            returnSum();
            return calculations = 0;
        }

        if(buttonContent == "clear"){clear();}

        if(buttonContent == "."){
            if(dots == 0){
                screen.value += ".";
                dots += 1;
            }
        }

        if(calculations == 1){
            if(isNumber.test(buttonContent)){
                return secondNumber = inputNumber(buttonContent);
            }
        } else {
            if(isNumber.test(buttonContent)){
                return firstNumber = inputNumber(buttonContent);
            }
        }

    });
});

function clear(){
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    calculations = 0;
    resetScreen = false;
    screen.value = "0";
    dots = 0;
    return;
}

function multiOperatorArray(number, operator){

}

function returnSum(){
    firstNumber = eval(firstNumber + operator + secondNumber);
    screen.value = firstNumber;
    resetScreen = false;
    calculations = 1;
    return;
}

function inputNumber(buttonContent){
    operatorPressed = false;
    lastOperator = operator;
    if(!resetScreen && dots == 0){
        screen.value = buttonContent;
        resetScreen = true;
    } else {
        screen.value += buttonContent;
    }
    return screen.value;
}