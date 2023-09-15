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

    const isValidBinary = value.match(/^[01]+$/);
    const isValidDecimal = !isNaN(value) && value.trim() !== "";
    const isValidHexadecimal = value.match(/^[0-9A-Fa-f]+$/);
    const isValidOctal = value.match(/^[0-7]+$/);

    input.style.backgroundColor = ""; // Reset background color

    if (selectedOption === 'binary-decimal' && isValidBinary) {
        let resultValue = binaryToDecimal(parseInt(value));
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x10";
    } else if (selectedOption === 'decimal-binary' && isValidDecimal) {
        let resultValue = decimalToBinary(parseInt(value));
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x2";
    } else if (selectedOption === 'binary-hexadecimal' && isValidBinary) {
        let resultValue = binaryToHexadecimal(value);
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x16";
    } else if (selectedOption === 'hexadecimal-binary' && isValidHexadecimal) {
        let resultValue = hexadecimalToBinary(value);
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
    } else if (selectedOption === 'binary-octal' && isValidBinary) {
        let resultValue = binaryToOctal(value);
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x8";
    } else if (selectedOption === 'octal-binary' && isValidOctal) {
        let resultValue = octalToBinary(value);
        if (negativeString) {
            resultValue = -resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x2";
    } else if (selectedOption === 'decimal-hexadecimal' && isValidDecimal) {
        let resultValue = parseInt(value).toString(16).toUpperCase();
        if (negativeString) {
            resultValue = '-' + resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x16";
    } else if (selectedOption === 'hexadecimal-decimal' && isValidHexadecimal) {
        let resultValue = parseInt(value, 16);
        if (!isNaN(resultValue)) {
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
        } else {
            result.innerHTML = 'Invalid hexadecimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'octal-decimal' && isValidOctal) {
        let resultValue = parseInt(value, 8);
        if (!isNaN(resultValue)) {
            if (negativeString) {
                resultValue = -resultValue;
            }
            result.innerHTML = resultValue;
        } else {
            result.innerHTML = 'Invalid octal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'decimal-octal' && isValidDecimal) {
        let resultValue = parseInt(value).toString(8);
        if (negativeString) {
            resultValue = '-' + resultValue;
        }
        result.innerHTML = resultValue;
        base.innerHTML = "x8";
    } else if (selectedOption === 'octal-hexadecimal' && isValidOctal) {
        let hexadecimalValue = parseInt(value, 8);
        let resultValue = hexadecimalValue.toString(16).toUpperCase();
        if (!isNaN(resultValue)) {
            if (negativeString) {
                resultValue = '-' + resultValue;
            }
            result.innerHTML = resultValue;
            base.innerHTML = "x16";
        } else {
            result.innerHTML = 'Invalid octal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else if (selectedOption === 'hexadecimal-octal' && isValidHexadecimal) {
        let decimalValue = parseInt(value, 16);
        let resultValue = decimalValue.toString(8);
        if (!isNaN(resultValue)) {
            if (negativeString) {
                resultValue = '-' + resultValue;
            }
            result.innerHTML = resultValue;
            base.innerHTML = "x8";
        } else {
            result.innerHTML = 'Invalid hexadecimal';
            input.style.backgroundColor = "#ffcccb";
        }
    } else {
        result.innerHTML = 'Invalid input';
        input.style.backgroundColor = "#ffcccb";
    }
    result.style.color = "#333";
}


button.addEventListener('click', () => {
    const value = input.value.trim();
    conversion(value)
})

input.addEventListener('input', () => {
    const value = input.value.trim();
    if(value === ""){
        result.style.color = "#999"
        input.value = "";
        result.innerHTML = "Output"
        base.innerHTML = ""
        input.style.backgroundColor = ""
    }else{

        conversion(value);
    }
});

input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const value = input.value.trim();
        conversion(value);
    }
});
