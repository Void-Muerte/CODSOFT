// document selections

const operands = document.querySelectorAll(".operand");
const output = document.querySelector(".output");
const reset = document.querySelector('.reset');
const equals = document.querySelector('.equal');
const operators = document.querySelectorAll('.operator');
const negate = document.querySelector('.negate');
const point = document.querySelector('.point');

// variables definitions
let leftOperand ="0";
let rightOperand = "0";
let operatorString ="";
let track = false;
let result = "0";

// utils

const calculate = (op1, op, op2)=>{
    switch(op){
        case 'x':
            return Number(op1)*Number(op2);
        case '/':
            if(Number(op2)==0 && Math.abs(Number(op1))!=0) return "synt err";
            return Number(op1)/Number(op2);
        case '+':
            return Number(op1)+ Number(op2);
        case '-':
           return Number(op1)-Number(op2);
    }
}
// treating the values
const sanitize = (value)=>{
    if(value.toString().charAt(value.length-1)=='.') return value.slice(0, value.length-1);
    return value;
}
// treating the result;
const treatResult = (result)=>{
    const temp = result.toString();
    const test = temp.toString().split('.');
    if(test.length==2){
        if(test[1].length>5) return result.toFixed(3).toString();
        else return temp;
    }else if(temp.length>8){
        let count = 0;
        let holder = result;
        while(true){
            if(holder<10) break;
            holder /=10;
            count+=1;
        }
        let response;
        if(temp.indexOf('-')==0){
            response = '-' + temp.slice(0,1) + '.'+temp.slice(1);
        }else response = temp.slice(0,1) + '.'+temp.slice(1);
        response = Number(response).toFixed(3).toString() + `e ${count}`;
        return response;
    }else{
        return temp;
    }

}
/** handlers */
// the A/C button handler
const handleReset = (e)=>{
    e.preventDefault();
    output.value = "0";
    leftOperand = "0";
    rightOperand = ""
    result = "0";
    track=false;
}

const updateOutput = ()=>{
    output.value = result;
    result = "0";
}
const handlePoint = (e)=>{
    e.preventDefault();
    if(operatorString==""){
        if(leftOperand.indexOf('.') == -1){
            leftOperand = track ? '0.': leftOperand+ '.';
        }else if(track) {
            leftOperand = '0.'
        }
        result = leftOperand;
    }else{
        if(rightOperand.indexOf('.')==-1){
            rightOperand += '.'
        }
        result = rightOperand;
    }
    track=false;
    updateOutput();
}
// numbers handler =:  if the first number is zero, then replace it, otherwise just concatenate 
const handleClick = (e)=>{
    e.preventDefault();
    const text = e.target.innerHTML;
    // test to see if there are operators
    if(operatorString!=""){
        // this means we are working with the second operand string
        if(rightOperand=='0') rightOperand = text; // if the number is preceeded by zero
        else if(rightOperand == '-0') rightOperand = '-' + text;
        else rightOperand  +=text;
        result = rightOperand;
        
    }else{
        // this means we are working with the second operand string
        if(leftOperand=='0') leftOperand = text; // if the number is preceeded by zero
        else if(leftOperand == '-0') leftOperand = '-' + text;
        else {
            leftOperand = track? text: leftOperand + text;
        }
        result = leftOperand;
    }
    track= false;
    updateOutput();
}
const handleCalculations = (e)=>{
    e.preventDefault();
    if(operatorString==""){
        result=sanitize(leftOperand);
    }else{
        result = calculate(sanitize(leftOperand), operatorString, sanitize(rightOperand));
        if(isNaN(result)) result ='err';
        else  result = treatResult(result);
        rightOperand = "";
        operatorString = "";
    }
    if(result=='err') leftOperand = '0';
    else leftOperand = result;
    track=true;
    updateOutput();
}
const handleOperator = (e)=>{
    e.preventDefault();
    operatorString=e.target.innerHTML;
}
const handleNegate= (e)=>{
    e.preventDefault();
    if(operatorString) {
        rightOperand = '-' + rightOperand;
        if(rightOperand.indexOf('--')!=-1) rightOperand = rightOperand.slice(2,);
        result= rightOperand;
    }else{
        leftOperand = '-' + leftOperand;
        if(leftOperand.indexOf('--')!=-1) leftOperand = leftOperand.slice(2,)
        result = leftOperand;
    }
    track=false;
    updateOutput();
    
}

// Event listeners
operands.forEach(operand=>operand.addEventListener("click", handleClick));
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleCalculations);
operators.forEach(operator=>operator.addEventListener("click", handleOperator));
negate.addEventListener('click', handleNegate);
point.addEventListener("click", handlePoint);