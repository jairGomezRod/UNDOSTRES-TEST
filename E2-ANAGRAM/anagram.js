const resultField = document.getElementById("result");
const firstWordEntered = document.getElementById("firstWord");
const secondWordEntered = document.getElementById("secondWord");

function isAnagram() {
    if (!firstWordEntered.value || !secondWordEntered.value) 
        return alert("Completa todos los campos para continuar");

    const firstWord = structureWords(firstWordEntered.value);
    const secondWord = structureWords(secondWordEntered.value);

    const isEqual = JSON.stringify(firstWord) === JSON.stringify(secondWord);

    if(isEqual){
        resultField.innerText = "Son Anagramas";
    } else {
        resultField.innerText = "No son Anagramas";
    }
}

function structureWords(unstructuredWord) {     
    const lowercaseWord = unstructuredWord.toLowerCase().replace(/\s+/g, '');
    return [...lowercaseWord].sort();
}

function resetFields(){
    firstWordEntered.value = "";
    secondWordEntered.value = "";
    resultField.innerText = "";
}