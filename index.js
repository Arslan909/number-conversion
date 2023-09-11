const input = document.getElementsByClassName("input")[0]
const button = document.getElementsByClassName("convertBtn")[0]
const result = document.getElementById("result")
const optionsSelect = document.getElementById("options");



function conversion(value){
    const selectedOption = optionsSelect.value;
    if(selectedOption === "binary-decimal"){
        if (value.match(/^[01]+$/)){
            let postion=0;
            let decimalNumebr =0;
        
            while(value>0){
                const lastDigit = value%10;
                decimalNumebr += lastDigit * Math.pow(2, postion);
                value = Math.floor(value / 10); 
                postion++;
            }
            result.innerHTML = decimalNumebr;

        }else{
            console.log("non-binary");
        }

    }
    else if(selectedOption === "decimal->binary"){
        if (value == 0) {
            return "0";
        }
    
        let binaryNum = "";
        while (value > 0) {
            let remainder = value % 2; 
            binaryNum = remainder.toString() + binaryNum; 
            value = Math.floor(value / 2);  
        }
        result.innerHTML = binaryNum;
    }
}

button.addEventListener('click', ()=>{
    const value = input.value.trim();
    conversion(value)
})