let buttons = document.querySelectorAll('button');
let screen = document.querySelector('#screen')
let calculationScreen = document.querySelector('#calculation')
screen.value = "";

let isNumber = /[0-9]/;
let isOperator = /[/*+-]/;

let dots = 0;

let operator = "";

let resetScreen = false;
let operatorPressed = false;

let sum = 0;

let multiOperator = [];

buttons.forEach(function(button){
    button.addEventListener('click', function() {
        let buttonContent = this.textContent;
        calculationScreen.textContent = multiOperator.join("");

        if(isOperator.test(buttonContent)){
            if(operatorPressed){
                return;
            }
            operatorPressed = true;
            dots = 0;
            screen.value = "";
            operator = buttonContent;
            multiOperator.push(operator);
        }

        if(buttonContent == "="){
            if(multiOperator.length == 0){
                return;
            }
            if(isOperator.test(multiOperator[multiOperator.length-1])){
                multiOperator.push(multiOperator[multiOperator.length-2]);
            }
            returnSum();
        }

        if(buttonContent == "clear"){clear();}

        if(buttonContent == "."){
            if(dots == 0){
                if(screen.value == ""){
                    screen.value = "0";
                    multiOperator.push("0");
                }
                multiOperator.push(buttonContent);
                screen.value += ".";
                dots += 1;
            }
        }

        if(isNumber.test(buttonContent)){
            inputNumber(buttonContent);
            return multiOperator.push(buttonContent);
        }

    });
});

function clear(){
    multiOperator = [];
    sum = 0;
    operator = "";
    resetScreen = false;
    screen.value = "";
    dots = 0;
    return;
}

function returnSum(){
    screen.value = eval(multiOperator.join(""));
    resetScreen = false;
    return;
}

function inputNumber(buttonContent){
    operatorPressed = false;
    if(!resetScreen && dots == 0){
        screen.value = buttonContent;
        resetScreen = true;
    } else {
        screen.value += buttonContent;
    }
    return screen.value;
}