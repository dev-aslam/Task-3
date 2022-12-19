let operant = [];
let operator = [];

const inputString = document.getElementById("input-string");
const outputString = document.getElementById("output-string");

let isLastOperator = () => operant.length === operator.length;

const getOuputString = () => {
    let output = operant.map(
        (v, i) => v + (operator[i] || "")
    ).join("");
    return output;
}

const calcOutput = () => {
    for (let i = 0; i < operator.length; i++) {
        if (operator[i] === '*' || operator[i] === '/') {
            operate(i);
        }
    }
    for (let i = 0; i < operator.length; i++) {
            operate(i);
    }
};

const operate = (n) => {
    operant[n] = getValue(operator[n], operant[n], operant[n + 1]);
    operant = operant.filter((v, i) => i !== n + 1);
    operator = operator.filter((v, i) => i !== n);
};

const getValue = (op, a, b) => {
    switch (op) {
        case "+":
            return Number(a) + Number(b);
        case "-":
            return Number(a) - Number(b);
        case "*":
            return Number(a)*Number(b);
        case "/":
            return Number(a)/Number(b);
    }
};

const buttons = document.getElementsByTagName("button");

const buttonClicked = (event) => {
    const button = event.target;
    if (button.className === "green") {
        if(!isLastOperator()){
            calcOutput();
            outputString.innerText =operant[0];
            operant = [];
            return;
        }
    }
    else if (button.className === "red") {
        if (!isLastOperator()) {
            operator.push(button.innerText);
        }
    }
    else {
        if (isLastOperator()) {
            operant.push(button.innerText);
        }
        else {
            operant[operant.length - 1] = operant[operant.length - 1] + button.innerText;
        }
    }
    inputString.innerText = getOuputString();
    console.log(operant, operator);
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", buttonClicked);
}