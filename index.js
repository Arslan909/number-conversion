const input = document.getElementsByClassName('input')[0]
const button = document.getElementsByClassName('convertBtn')[0]
const result = document.getElementById('result')
const optionsSelect = document.getElementById('options');
const base = document.getElementById('base');


function binaryToDecimal(binaryValue) {
    let position = 0;
    let decimalNumber = 0;

    while (binaryValue > 0) {
        const lastDigit = binaryValue % 10;
        decimalNumber += lastDigit * Math.pow(2, position);
        binaryValue = Math.floor(binaryValue / 10);
        position++;
    }

    return decimalNumber;
}

function decimalToBinary(decimalValue) {
    if (decimalValue == 0) {
        return '0';
    }

    let binaryNumber = '';
    while (decimalValue > 0) {
        let remainder = decimalValue % 2;
        binaryNumber = remainder.toString() + binaryNumber;
        decimalValue = Math.floor(decimalValue / 2);
    }

    return binaryNumber;
}

function binaryToHexadecimal(binaryValue) {
    const binToHexMap = {
        '0000': '0',
        '0001': '1',
        '0010': '2',
        '0011': '3',
        '0100': '4',
        '0101': '5',
        '0110': '6',
        '0111': '7',
        '1000': '8',
        '1001': '9',
        '1010': 'A',
        '1011': 'B',
        '1100': 'C',
        '1101': 'D',
        '1110': 'E',
        '1111': 'F',
    };

    const length = binaryValue.length;
    const extension = length % 4;
    if (extension > 0) {
        binaryValue = '0'.repeat(4 - extension) + binaryValue;
    }

    let hexaDecimalNumber = '';
    for (let i = 0; i < length; i += 4) {
        const group = binaryValue.slice(i, i + 4);
        hexaDecimalNumber += binToHexMap[group];
    }

    return hexaDecimalNumber;
}

function hexadecimalToBinary(hexadecimalValue) {
    const hexToBinMap = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        'A': '1010',
        'B': '1011',
        'C': '1100',
        'D': '1101',
        'E': '1110',
        'F': '1111',
    };

    hexadecimalValue = hexadecimalValue.toUpperCase();
    let invalidHexInput = false;

    let binaryNumber = '';
    for (let i = 0; i < hexadecimalValue.length; i++) {
        const hexDigit = hexadecimalValue[i];
        if (hexDigit in hexToBinMap) {
            binaryNumber += hexToBinMap[hexDigit];
        } else {
            invalidHexInput = true;
            break;
        }
    }
    if (invalidHexInput) {
        input.style.backgroundColor = "#ffcccb"
        return "Invalid hex digits";
    } else {
        input.style.backgroundColor = ""
        base.innerHTML = "x2"
        return binaryNumber;
    }
}

function binaryToOctal(binaryValue) {
    const binToOctMap = {
        '000': '0',
        '001': '1',
        '010': '2',
        '011': '3',
        '100': '4',
        '101': '5',
        '110': '6',
        '111': '7',
    };

    const length = binaryValue.length;
    const extension = length % 3;
    if (extension > 0) {
        binaryValue = '0'.repeat(3 - extension) + binaryValue;
    }

    let octalNumber = '';
    for (let i = 0; i < length; i += 3) {
        const group = binaryValue.slice(i, i + 3);
        octalNumber += binToOctMap[group];
    }
    return octalNumber;
}

function octalToBinary(octalValue) {
    const octToBinMap = {
        '0': '000',
        '1': '001',
        '2': '010',
        '3': '011',
        '4': '100',
        '5': '101',
        '6': '110',
        '7': '111',
    };

    octalValue = octalValue.toString();
    let binaryNumber = '';

    for (let i = 0; i < octalValue.length; i++) {
        const octalDigit = octalValue[i];
        binaryNumber += octToBinMap[octalDigit];
    }
    return binaryNumber;
}
// might be using built in conversition function of js becasue not feel like doing it more 
function decimalToHexadecimal(decimalValue) {
    if (!isNaN(decimalValue)) {
        return decimalValue.toString(16).toUpperCase();
    } else {
        return 'Invalid decimal';
    }
}
function hexadecimalToDecimal(hexadecimalValue) {
    const decimalNumber = parseInt(hexadecimalValue, 16);

    if (!isNaN(decimalNumber)) {
        return decimalNumber;
    } else {
        return 'Invalid hexadecimal';
    }
}
function octalToDecimal(octalValue) {
    const decimalNumber = parseInt(octalValue, 8);

    if (!isNaN(decimalNumber)) {
        return decimalNumber;
    } else {
        return 'Invalid octal';
    }
}
function decimalToOctal(decimalValue) {
    if (!isNaN(decimalValue)) {
        return decimalValue.toString(8);
    } else {
        return 'Invalid decimal';
    }
}
function octalToHexadecimal(octalValue) {
    const decimalValue = parseInt(octalValue, 8);
    if (!isNaN(decimalValue)) {
        return decimalValue.toString(16).toUpperCase();
    } else {
        return 'Invalid octal';
    }
}
function hexadecimalToOctal(hexadecimalValue) {
    const decimalValue = parseInt(hexadecimalValue, 16);
    if (!isNaN(decimalValue)) {
        return decimalValue.toString(8);
    } else {
        return 'Invalid hexadecimal';
    }
}




// Driver code 
optionsSelect.addEventListener('change', function () {
    if (optionsSelect.value === "null") {
        result.style.color = "#999"
        input.value = "";
        result.innerHTML = "Output"
        base.innerHTML = ""
        input.style.backgroundColor = ""
    }
})


function conversion(value) {
    const selectedOption = optionsSelect.value;

    let negativeString = false;
    if (value.startsWith('-')) {
        negativeString = true;
        value = value.slice(1);
    }

    if (selectedOption === 'binary-decimal') {
        if (value.match(/^[01]+$/)) {
            input.style.backgroundColor = "";
            let resultValue = binaryToDecimal(parseInt(value));
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x10";
        } else {
            result.innerHTML = 'non-binary';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'decimal-binary') {
        if (!isNaN(value) && value.trim() !== "") {
            let resultValue = decimalToBinary(parseInt(value));
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x2";
        } else {
            result.innerHTML = 'non-decimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'binary-hexadecimal') {
        if (value.match(/^[01]+$/)) {
            input.style.backgroundColor = "";
            let resultValue = binaryToHexadecimal(value);
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x16";
        } else {
            result.innerHTML = 'non-binary';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === "hexadecimal-binary") {
        if (!isNaN(value) && value.trim() !== "") {
            let resultValue = hexadecimalToBinary(value);
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
        } else {
            result.innerHTML = 'invalid hexadecimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === "binary-octal") {
        if (value.match(/^[01]+$/)) {
            input.style.backgroundColor = "";
            let resultValue = binaryToOctal(value);
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x8";
        } else {
            result.innerHTML = 'non-binary';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === "octal-binary") {
        if (value.match(/^[0-7]+$/)) {
            input.style.backgroundColor = "";
            let resultValue = octalToBinary(value);
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x2";
        } else {
            result.innerHTML = 'non-octal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'decimal-hexadecimal') {
        if (!isNaN(value) && value.trim() !== "") {
            let resultValue = decimalToHexadecimal(parseInt(value));
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x16";
        } else {
            result.innerHTML = 'non-decimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'hexadecimal-decimal') {
        if (value.match(/^[0-9A-Fa-f]+$/)) {
            const decimalResult = hexadecimalToDecimal(value);
            if (!isNaN(decimalResult)) {
                input.style.backgroundColor = "";
                if (negativeString) {
                    decimalResult = -decimalResult;
                }
                result.innerHTML = decimalResult;
                result.style.color = "#333";
            } else {
                result.innerHTML = 'Invalid hexadecimal';
                input.style.backgroundColor = "#ffcccb";
            }
        } else {
            result.innerHTML = 'Invalid hexadecimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'octal-decimal') {
        if (value.match(/^[0-7]+$/)) {
            const decimalResult = octalToDecimal(value);
            if (!isNaN(decimalResult)) {
                input.style.backgroundColor = "";
                if (negativeString) {
                    decimalResult = -decimalResult;
                }
                result.innerHTML = decimalResult;
                result.style.color = "#333";
            } else {
                result.innerHTML = 'Invalid octal';
                input.style.backgroundColor = "#ffcccb";
            }
        } else {
            result.innerHTML = 'Invalid octal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'decimal-octal') {
        if (!isNaN(value) && value.trim() !== "") {
            let resultValue = decimalToOctal(parseInt(value));
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
            result.style.color = "#333";
            base.innerHTML = "x8";
        } else {
            result.innerHTML = 'non-decimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'octal-hexadecimal') {
        if (value.match(/^[0-7]+$/)) {
            const hexadecimalResult = octalToHexadecimal(value);
            if (!isNaN(hexadecimalResult)) {
                input.style.backgroundColor = "";
                if (negativeString) {
                    hexadecimalResult = -hexadecimalResult;
                }
                result.innerHTML = hexadecimalResult;
                result.style.color = "#333";
                base.innerHTML = "x16";
            } else {
                result.innerHTML = 'Invalid octal';
                input.style.backgroundColor = "#ffcccb";
            }
        } else {
            result.innerHTML = 'Invalid octal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'hexadecimal-octal') {
        if (value.match(/^[0-9A-Fa-f]+$/)) {
            const octalResult = hexadecimalToOctal(value);
            if (!isNaN(octalResult)) {
                input.style.backgroundColor = "";
                if (negativeString) {
                    octalResult = '-' + octalResult;
                }
                result.innerHTML = octalResult;
                result.style.color = "#333";
                base.innerHTML = "x8";
            } else {
                result.innerHTML = 'Invalid hexadecimal';
                input.style.backgroundColor = "#ffcccb";
            }
        } else {
            result.innerHTML = 'Invalid hexadecimal';
            input.style.backgroundColor = "#ffcccb";
        }
    }
}


button.addEventListener('click', () => {
    const value = input.value.trim();
    conversion(value)
})

input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const value = input.value.trim();
        conversion(value);
    }
});
