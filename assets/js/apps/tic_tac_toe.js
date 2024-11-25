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

function restart(){
    table = [0,0,0,0,0,0,0,0,0];
    currentPosition = 0;
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
}

function drawTable(){
    stroke(255);
    strokeWeight(5);
    var top = (containerHeight - tableSize) / 2;
    var left = (containerWidth - tableSize) / 2;
    console.log(top, left)
    line(left + cellSize,top, left + cellSize, top + tableSize);
    line(left + cellSize * 2,top, left + cellSize * 2, top + tableSize);
    line(left, top + cellSize, left + tableSize,  top + cellSize);
    line(left,top + cellSize * 2, left + tableSize,  top + cellSize *2);
}

function drawPieces(){

}

function drawCurrentPosition(){
    fill(0);
    strokeWeight(10);
    stroke('blue');
    var top = (containerHeight - tableSize) / 2;
    var left = (containerWidth - tableSize) / 2;
    var x = currentPosition % 3;
    var y = Math.trunc(currentPosition / 3);
    rect(left + (x * cellSize) + 15, top + (y * cellSize) + 15, cellSize - 30, cellSize -30);
}

function keyPressed() {
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
}