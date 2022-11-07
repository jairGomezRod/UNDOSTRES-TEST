const resultField = document.getElementById("result");
const arrToValidate = document.getElementById("arrToValidate");

function validateDifference() {
    if (!arrToValidate.value) 
        return alert("Completa todos los campos para continuar");

   const structuredArray = buildArray(arrToValidate.value);

   if(structuredArray.length <= 2) return setResult(0);

   let maxDifference = 0;
   structuredArray.forEach((prev,current)=>{
    if((structuredArray[current+1] - prev) > maxDifference){
        maxDifference = (structuredArray[current+1] - prev);
    }
   });

   setResult(maxDifference);
}

function buildArray(numericString) {   
    const formatedArray = numericString.split(",").map(function(item) {
        return parseInt(item, 10);
    });
    return formatedArray.filter(Boolean).sort(function(a, b){return a - b});
}

function resetFields(){
    arrToValidate.value = "";
    resultField.innerText = "";
}

function setResult(result){
    return resultField.innerText = `La diferencia máxima es de : ${result}`;
}
