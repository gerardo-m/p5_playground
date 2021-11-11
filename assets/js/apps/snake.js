window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false)

var cellSize = 0;
var myFrameRate = 10;
var gridHeight;
var gridWidth = 55;

const minCellSize = 20;

var snakeSize;
var xHead;
var yHead;
var xTail;
var yTail;

var xVelocity;
var yVelocity;
var growing = false;

var cellAvailability;
var gridCellCount;
var xFood;
var yFood;

var actionEnqueued;

function defineAvailability(x, y, available) {
    var arrayPosition = y * gridWidth + x;
    if (available) {
        if (!cellAvailability.includes(arrayPosition)){
            gridCellCount++;
            cellAvailability.push(arrayPosition);
        }
    } else {
        var index = cellAvailability.indexOf(arrayPosition);
        if (index >= 0) {
            gridCellCount--;
            cellAvailability.splice(index, 1);
        }
    }
}

function startGrid() {
    gridCellCount = gridHeight * gridWidth;
    cellAvailability = [];
    for (var i = 0; i < gridCellCount; i++) {
        cellAvailability.push(i);
    }
}

function generateFood() {
    var  arrayPosition = Math.floor(random(gridCellCount));
    var availableCell = cellAvailability[arrayPosition];
    var xGrid = availableCell % gridWidth;
    var yGrid = (availableCell - xGrid) / gridWidth;
    xFood = xGrid * cellSize;
    yFood = yGrid * cellSize;
}

function restart() {
    startGrid();
    defineAvailability(0, 3, false);
    xHead = 0;
    yHead = 3 * cellSize;
    xTail = [];
    yTail = [];
    snakeSize = 0;
    xVelocity = 1;
    yVelocity = 0;
    generateFood();
    console.log('reiniciando');
}

function eat() {
    generateFood();
    snakeSize = snakeSize + 1;
}

function isDead() {
    for (var i = 0; i < snakeSize; i++) {
        if (xHead === xTail[i] && yHead === yTail[i]) {
            return true;
        }
    }
    //console.log(xHead, yHead, width);
    return xHead < 0 || xHead >= width || yHead < 0 || yHead >= height;
}

function setCellSizeAndGridWidth(containerWidth) {
    while(cellSize < minCellSize) {
        gridWidth = gridWidth - 5;
        cellSize = Math.floor(containerWidth / gridWidth);
    }
}

function setup() {
    var containerWidth = Math.floor(windowWidth / 4) * 3;
    var containerHeight = Math.floor(windowHeight / 4) * 3;

    setCellSizeAndGridWidth(containerWidth);

    var canvasWidth = containerWidth - (containerWidth % cellSize);
    var canvasHeight = containerHeight - (containerHeight % cellSize);
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('p5-container');
    frameRate(myFrameRate);
    gridHeight = canvasHeight / cellSize;
    restart();
    console.log(containerWidth, containerHeight, canvasWidth, canvasHeight, gridHeight);
}

function draw() {
    background(0);
    fill(255);
    rect(xHead, yHead, cellSize, cellSize);
    for (var i = 0; i < snakeSize; i++) {
        rect(xTail[i], yTail[i], cellSize, cellSize);
    }
    fill('red');
    rect(xFood, yFood, cellSize, cellSize);

    xTail.push(xHead);
    yTail.push(yHead);
    xHead = xHead + (xVelocity * cellSize);
    yHead = yHead + (yVelocity * cellSize);
    defineAvailability(xHead / cellSize, yHead / cellSize, false);

    if (isDead()) {
        restart();
    } else {
        if (xHead === xFood && yHead === yFood) {
            eat();
            growing = true;
        }
        if (!growing) {
            var xFreeCell = xTail.shift() / cellSize;
            var yFreeCell = yTail.shift() / cellSize;
            defineAvailability(xFreeCell, yFreeCell, true);
        }

        growing = false;
        actionEnqueued = false;
    }
}

function keyPressed() {
    if (!actionEnqueued){
        if (keyCode === UP_ARROW && yVelocity === 0){
            xVelocity = 0;
            yVelocity = -1;
            actionEnqueued = true;
        }
        if (keyCode === DOWN_ARROW && yVelocity === 0){
            xVelocity = 0;
            yVelocity = 1;
            actionEnqueued = true;
        }
        if (keyCode === RIGHT_ARROW && xVelocity === 0){
            xVelocity = 1;
            yVelocity = 0;
            actionEnqueued = true;
        }
        if (keyCode === LEFT_ARROW && xVelocity === 0){
            xVelocity = -1;
            yVelocity = 0;
            actionEnqueued = true;
        }
    }
}