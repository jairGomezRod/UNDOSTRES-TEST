const resultField = document.getElementById("result");
const lengthX = document.getElementById("lengthX");
const lengthY = document.getElementById("lengthY");
const arrayCellsContent = document.getElementById("arrayCellsContent");
const arrayCellsSection = document.getElementById("arrayCellsSection");
const startCollectionButton = document.getElementById("startCollectionButton");
const createArrayButton = document.getElementById("createArrayButton");

let carrotsArray;
let botLeft;
let botLeftPos;
let botLeftRoute = [];

let botRight;
let botRightPos;
let botRightRoute = [];

function createArray() {
    if (!lengthX.value || !lengthY.value) 
        return alert("Completa todos los campos para continuar");

    let cellsContent = ``;

    carrotsArray = new Array(lengthX.value);
    for(let posX = 0; posX < lengthX.value; posX++){
        carrotsArray[posX] = new Array(lengthY.value);
        for(let posY = 0; posY < lengthY.value; posY++){
            cellsContent += `<input type="number" value="0" onchange="setArray(this)" data-x="${posX}" data-y="${posY}" id="cell">`;

            carrotsArray[posX][posY] = 0;
        }
        cellsContent += `<br>`;
    }

    arrayCellsContent.innerHTML = cellsContent;
    arrayCellsSection.style.display = "initial";
    startCollectionButton.style.display = "initial";
    createArrayButton.style.display = "none";
}

function setArray(e){    
    const cellCarrots = e.value;
    const {x , y} = e.dataset;
    carrotsArray[Number(x)][Number(y)] = Number(cellCarrots);
}

function createBot(){
    botLeft = carrotsArray[0][0];
    botLeftPos = [0,0];
    botLeftRoute[0] = carrotsArray[0][0];

    botRight = carrotsArray[0][lengthY.value - 1];
    botRightPos = [0,lengthY.value - 1];
    botRightRoute[0] = carrotsArray[0][lengthY.value - 1];

    const endRouteLeft = startCollection(botLeft, botLeftPos, botLeftRoute);
    const endRouteRight = startCollection(botRight, botRightPos, botRightRoute);

    showResult(endRouteLeft, endRouteRight);
}

function startCollection(botAcc, botPos, botRoute){
    for(let posX = 0; posX < lengthX.value; posX++){
        if(posX == 0) posX++;

        if(botPos[1]== 0){            

            if(carrotsArray[posX][botPos[1]] > carrotsArray[posX][botPos[1]+1]){

                botAcc = botAcc + carrotsArray[posX][botPos[1]];
                botRoute.push(carrotsArray[posX][botPos[1]]);
                carrotsArray[posX][botPos[1]] = 0;

            } else {

                botAcc = botAcc + carrotsArray[posX][botPos[1]+1];
                botRoute.push(carrotsArray[posX][botPos[1]+1]);
                carrotsArray[posX][botPos[1]+1] = 0;

            }

        } else if(botPos[1]== lengthY.value - 1){

            if(carrotsArray[posX][botPos[1]] > carrotsArray[posX][botPos[1]-1]){

                botAcc = botAcc + carrotsArray[posX][botPos[1]];
                botRoute.push(carrotsArray[posX][botPos[1]]);
                carrotsArray[posX][botPos[1]] = 0;

            } else {

                botAcc = botAcc + carrotsArray[posX][botPos[1]-1];
                botRoute.push(carrotsArray[posX][botPos[1]-1]);
                carrotsArray[posX][botPos[1]-1] = 0;

            }
        }

    }

    return {
        botAcc,
        botRoute,
    };
    
}

function showResult(routeLeft, routeRight){
    const collectionResult = `Robot A => ${routeRight.botRoute.toString()} = ${routeRight.botAcc}
                Robot B => ${routeLeft.botRoute.toString()} = ${routeLeft.botAcc}`;

    resultField.innerText = collectionResult;
}

function resetFields(){
    arrayCellsContent.innerHTML = "";
    arrayCellsSection.style.display = "none";
    startCollectionButton.style.display = "none";
    createArrayButton.style.display = "initial";
    lengthX.value = 0;
    lengthY.value = 0;
    resultField.innerText = "";
}