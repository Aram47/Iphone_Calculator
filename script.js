const inputArea = document.getElementsByClassName("Input-Area")[0];
const numberButtons = document.getElementsByClassName("Number-Button");
const operationButtons = document.getElementsByClassName("Operation-Button");
const arguments = {
    "firstArgument"  : "0",
    "secondArgument" : "0",
    "operation"      : "",
    "state"          : false,
};
const operations = {
    "AC"  : () => {
        inputArea.value = arguments["firstArgument"] = arguments["secondArgument"] = "0";
        arguments["state"] = false;
    },
    "+/-" : () => {
        let tempValue = arguments["state"] === false ? arguments["firstArgument"] : arguments["secondArgument"];     
        console.log(tempValue);

        if (tempValue[0] === "-") {
            tempValue = tempValue.replace("-","");
        } else if (tempValue[0] != "0") {
            tempValue = "-" + tempValue;
        }
        inputArea.value = arguments["state"] === false ? arguments["firstArgument"] = tempValue : arguments["secondArgument"] = tempValue;
    },
    "%"   : (flag = false) => { 
        if (!flag) {
            arguments["state"] = true; 
            arguments["operation"] = "%";
        } else {
            inputArea.value = (+(arguments["firstArgument"]) % +(arguments["secondArgument"])).toString();
            arguments["firstArgument"] = inputArea.value;
            arguments["secondArgument"] = "0";
        }
    },
    "/"   : (flag = false) => {
        if (!flag) {
            arguments["state"] = true; 
            arguments["operation"] = "/";
        } else {
            if (+arguments["secondArgument"]) {
                inputArea.value = (+(arguments["firstArgument"]) / +(arguments["secondArgument"])).toString();
                arguments["firstArgument"] = inputArea.value;
                arguments["secondArgument"] = "0";
            }
        } 
    },
    "*"   : (flag = false) => { 
        if (!flag) {
            arguments["state"] = true; 
            arguments["operation"] = "*";
        } else {
            inputArea.value = (+(arguments["firstArgument"]) * +(arguments["secondArgument"])).toString();
            arguments["firstArgument"] = inputArea.value;
            arguments["secondArgument"] = "0";
        } 
    },
    "-"   : (flag = false) => { 
        if (!flag) {
            arguments["state"] = true; 
            arguments["operation"] = "-";
        } else {
            inputArea.value = (+(arguments["firstArgument"]) - +(arguments["secondArgument"])).toString();
            arguments["firstArgument"] = inputArea.value;
            arguments["secondArgument"] = "0";
        }
     },
    "+"   : (flag = false) => { 
        if (!flag) {
            arguments["state"] = true; 
            arguments["operation"] = "+";
        } else {
            inputArea.value = (+(arguments["firstArgument"]) + +(arguments["secondArgument"])).toString();
            arguments["firstArgument"] = inputArea.value;
            arguments["secondArgument"] = "0";
        }
     },
    "="   : () => {
        operations[arguments["operation"]](true); 
        arguments["state"] = false; 
    },
};

inputArea.value = "0";

for (let i = 0; i < numberButtons.length; ++i)
{
    if (numberButtons[i].textContent === ".") {
        numberButtons[i].addEventListener('click', () => {
            let tempValue = arguments["state"] === false ? arguments["firstArgument"] : arguments["secondArgument"];
            
            if (tempValue.indexOf(numberButtons[i].textContent) === -1)
                tempValue += numberButtons[i].textContent;
            
            inputArea.value = arguments["state"] === false ? arguments["firstArgument"] = tempValue : arguments["secondArgument"] = tempValue;
        });
    }
    else {
        numberButtons[i].addEventListener('click', () => {
            let tempValue = arguments["state"] === false ? arguments["firstArgument"] : arguments["secondArgument"];

            if (tempValue === "0")
                tempValue = "";

            tempValue += numberButtons[i].textContent;

            inputArea.value = arguments["state"] === false ? arguments["firstArgument"] = tempValue : arguments["secondArgument"] = tempValue;
        });
    }
}

for (let i = 0; i < operationButtons.length; ++i) 
{
    operationButtons[i].addEventListener('click', () => {
        operations[operationButtons[i].textContent]();
    });
}