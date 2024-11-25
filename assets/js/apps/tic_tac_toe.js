window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

var table;
var cellSize;
var containerWidth;
var containerHeight;
var tablePadding = 25;
var tableSize;
var currentPosition;
var currentPlayer = 1;

var winner;
var resultTable1;
var resultTable2

function restart(){      
    table = [0,0,0,0,0,0,0,0,0];
    resultTable1 = [0,0,0,0,0,0,0,0];
    resultTable2 = [0,0,0,0,0,0,0,0];
    currentPosition = 0;
    winner = 0;
}

function setup(){
    containerWidth = Math.floor(windowWidth / 4) * 3;
    containerHeight = Math.floor(windowHeight / 4) * 3;

    var minSize = min(containerHeight, containerWidth);
    tableSize = minSize - (tablePadding * 2);
    cellSize = tableSize / 3;

    var canvasWidth = containerWidth;
    var canvasHeight = containerHeight;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('p5-container');
    restart();
    console.log(table);
}

function draw() {
    background(0);
    fill(255);
    drawTable();
    drawPieces();
    drawCurrentPosition();
    drawWinner();
}

function drawTable(){
    stroke(255);
    strokeWeight(5);
    var top = (containerHeight - tableSize) / 2;
    var left = (containerWidth - tableSize) / 2;
    line(left + cellSize,top, left + cellSize, top + tableSize);
    line(left + cellSize * 2,top, left + cellSize * 2, top + tableSize);
    line(left, top + cellSize, left + tableSize,  top + cellSize);
    line(left,top + cellSize * 2, left + tableSize,  top + cellSize *2);
}

function drawPieces(){
    noFill();
    strokeWeight(15);
    stroke('yellow');
    for (let index = 0; index < table.length; index++) {
        const element = table[index];
        if (element == 0) continue;
        var top = (containerHeight - tableSize) / 2;
        var left = (containerWidth - tableSize) / 2;
        var x = index % 3;
        var y = Math.trunc(index / 3);
        left = left + (x * cellSize) + 25;
        top = top + (y * cellSize) + 25;
        if (element == 1){
            line(left, top, left + cellSize - 50, top + cellSize - 50);
            line(left + cellSize - 50, top, left, top + cellSize - 50);
        }
        if (element == 2){
            const circleSize = cellSize - 50;
            circle(left + circleSize/2, top + circleSize/2, circleSize);
        }
    }
}

function drawCurrentPosition(){
    noFill();
    strokeWeight(10);
    stroke('blue');
    var top = (containerHeight - tableSize) / 2;
    var left = (containerWidth - tableSize) / 2;
    var x = currentPosition % 3;
    var y = Math.trunc(currentPosition / 3);
    if (table[currentPosition] > 0) stroke('red');
    rect(left + (x * cellSize) + 15, top + (y * cellSize) + 15, cellSize - 30, cellSize -30);
}

function keyPressed() {
    if (keyCode == ESCAPE){
        restart();
    }
    if (winner > 0) return;
    if (keyCode === UP_ARROW){
        currentPosition = currentPosition - 3;
        if (currentPosition < 0) currentPosition = currentPosition + 3;
    }
    if (keyCode === DOWN_ARROW){
        currentPosition = currentPosition + 3;
        if (currentPosition > 8) currentPosition = currentPosition - 3;
    }
    if (keyCode === RIGHT_ARROW){
        currentPosition++;
        if (currentPosition % 3 == 0 || currentPosition > 8) currentPosition--;
    }
    if (keyCode === LEFT_ARROW){
        currentPosition--;
        if (currentPosition % 3 == 2 || currentPosition < 0) currentPosition++;
    }
    if (keyCode == 32){ // SPACE
        if (table[currentPosition]> 0) return; 
        table[currentPosition] = currentPlayer;
        checkWinner();
        if (winner > 0) return;
        changePlayer();
    }
}

function changePlayer(){
    if (currentPlayer == 1){
        currentPlayer = 2;
    }else{
        currentPlayer = 1;
    }
}

function checkWinner(){
    var resultTable;
    if (currentPlayer ==1) resultTable = resultTable1;
    else resultTable = resultTable2;
    resultTable[Math.trunc(currentPosition / 3)]++;
    if (resultTable[Math.trunc(currentPosition / 3)] ==3){
        winner = currentPlayer;
        return;
    }
    resultTable[3 + currentPosition % 3]++;
    if (resultTable[3 + currentPosition % 3] ==3){
        winner = currentPlayer;
        return;
    }
    if (currentPosition % 2 == 0){
        if (currentPosition % 4 ==0){
            resultTable[6]++;
            if (resultTable[6]==3){
                winner = currentPlayer;
                return;
            }
        }
        if (Math.abs(currentPosition-4) <= 2){
            resultTable[7]++;
            if (resultTable[7]==3){
                winner = currentPlayer;
                return;
            }
        }
    }
}

function drawWinner(){
    if (winner == 0)return;
    strokeWeight(2);
    stroke('green');
    fill('green');
    textAlign(CENTER);
    textSize(70);
    var winnerText = "The winner is ";
    if (winner ==1) winnerText = winnerText + "X";
    else winnerText = winnerText + "O";
    text(winnerText, containerWidth/2, containerHeight/2);
}