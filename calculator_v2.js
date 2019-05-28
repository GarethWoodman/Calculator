let buttons = document.querySelectorAll('calcButton');
let screen = document.querySelector('#screen')
let calculationScreen = document.querySelector('#calculation')
buttons = Array.from(buttons);
buttons.push(document.querySelector('#clear'))
screen.value = "";

let isNumber = /[0-9]/;
let isOperator = /[/*+-]/;
let operator = "";
let operatorPressed = false;
let multiOperator = [];

buttons.forEach(function(button){
    mouseEvents(button);

    button.addEventListener('click', function() {
        let buttonContent = this.textContent;

        if(isOperator.test(buttonContent)){
            if(operatorPressed){
                return;
            }
            operatorPressed = true;
            screen.value = "";
            operator = buttonContent;
            updateSum(buttonContent)
        }

        if(buttonContent == "="){
            if(multiOperator.length == 0){
                return;
            }
            if(isOperator.test(multiOperator[multiOperator.length-1])){
                multiOperator.push(multiOperator[multiOperator.length-2]);
                calculationScreen.textContent = multiOperator.join("");
            }
            return screen.value = eval(multiOperator.join(""));
        }

        if(buttonContent == "C"){clear();}

        if(buttonContent == "."){
            if(screen.value % 1 == 0){
                if(screen.value == ""){
                    screen.value = "0";
                    multiOperator.push("0");
                }
                updateSum(buttonContent)
                screen.value += ".";
            }
        }

        if(isNumber.test(buttonContent)){
            operatorPressed = false;
            screen.value += buttonContent;
            updateSum(buttonContent);
            return;
        }

    });
});

function clear(){
    multiOperator = [];
    operator = "";
    screen.value = "";
    calculationScreen.textContent = "";
    dots = 0;
    return;
}

function updateSum(buttonContent){
    multiOperator.push(buttonContent);
    calculationScreen.textContent = multiOperator.join("");
    return;
}

function mouseEvents(button){
    button.addEventListener('mouseover', function(){
        this.style.backgroundColor = 'rgb(153, 204, 255)';
    })
    button.addEventListener('mouseout', function(){
        this.style.backgroundColor = 'rgb(200, 215, 230)';
    })
    button.addEventListener('mousedown', function(){
        this.style.color = "white";
    })
    button.addEventListener('mouseup', function(){
        this.style.color = "black";
    })
}