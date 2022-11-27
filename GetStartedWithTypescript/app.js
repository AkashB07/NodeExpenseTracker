"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = [];
const testResults = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
// console.log(add(1, 6));
// console.log(add('1', '6'));
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    numResults.push(result);
    const stringResult = add(num1, num2);
    testResults.push(stringResult);
    // console.log(result);
    // console.log(stringResult);
    // console.log(add(true, false));
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, testResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked');
    }, 1000);
});
myPromise.then((result) => {
    console.log(result.split('w'));
});
