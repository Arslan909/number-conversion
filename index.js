const input = document.getElementsByClassName('input')[0]
const button = document.getElementsByClassName('convertBtn')[0]
const result = document.getElementById('result')
const optionsSelect = document.getElementById('options');


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

    return '0x' + hexaDecimalNumber;
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
        return "Invalid hex digits";
    } else {
        return binaryNumber;
    }
}

// Driver code 
function conversion(value) {
    const selectedOption = optionsSelect.value;
    if (selectedOption === 'binary-decimal') {
        if (value.match(/^[01]+$/)) {
            result.innerHTML = binaryToDecimal(parseInt(value));
        } else {
            result.innerHTML = 'non-binary';
        }
    }
    else if (selectedOption === 'decimal-binary') {
        result.innerHTML = decimalToBinary(parseInt(value));
    }
    else if (selectedOption === 'binary-hexadecimal') {
        result.innerHTML = binaryToHexadecimal(value);
    }
    else if (selectedOption === "hexadecimal-binary") {
        result.innerHTML = hexadecimalToBinary(value);
    }
}
//TODO- conversion options for binary to octal and octal to binary system 


button.addEventListener('click', () => {
    const value = input.value.trim();
    conversion(value)
})
