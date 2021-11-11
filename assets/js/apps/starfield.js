var centerX;
var centerY;

var starX = [];
var starY = [];
var starVelocityX = [];
var starVelocityY = [];
var starAccelerationX = [];
var starAccelerationY = [];
var starRadius = [];

var starBornPopulation = 30;
var starBornDelay = 5;
var starBornCount = 0;
var starDeathDelay = starBornDelay * 300;
var starGrowingRate = 1;

var acceleration = 8;
var accelerationRate = 10;
var accelerationCount = 0;
var speedControl;

function createStar(){
    var x = Math.floor(random(width));
    var y = Math.floor(random(height));
    starX.push(x);
    starY.push(y);
    var vx = map(x - centerX, -centerX, centerX, -acceleration, acceleration);
    var vy = map(y - centerY, -centerY, centerY, -acceleration, acceleration);
    starVelocityX.push(0);
    starVelocityY.push(0);
    starAccelerationX.push(vx);
    starAccelerationY.push(vy);
    starRadius.push(1);
    console.log({x, y, vx, vy})
}

function killStars(){
    for (var i = 0; i < starBornPopulation; i++){
        starX.shift();
        starY.shift();
        starVelocityX.shift();
        starVelocityY.shift();
        starAccelerationX.shift();
        starAccelerationY.shift();
        starRadius.shift();
    }
}

function drawStars(){
    for (var i = 0; i < starX.length; i++){
        ellipse(starX[i], starY[i], starRadius[i], starRadius[i] );
    }
}

function moveStars(){
    for (var i = 0; i < starX.length; i++){
        starRadius[i] = starRadius[i] + (starGrowingRate * (speedControl*0.2));
        starX[i] = starX[i] + (starVelocityX[i] * speedControl);
        starY[i] = starY[i] + (starVelocityY[i] * speedControl);
    }
}

function accelerateStars(){
    for (var i = 0; i < starX.length; i++){
        starVelocityX[i] = starVelocityX[i] + starAccelerationX[i];
        starVelocityY[i] = starVelocityY[i] + starAccelerationY[i];
    }
}


function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('p5-container');
    centerX = width / 2;
    centerY = height / 2;
    noStroke();
    //frameRate(15);
}

function draw() {
    speedControl = map(mouseY, 0, height, 1, 0);
    console.log(acceleration);
    //accelerationRate = map(mouseX, 0, width, 30, 1);
    background('black');
    fill('white');
    if (starBornCount % starBornDelay === 0){
        for (var i = 0; i <starBornPopulation;  i++){
            createStar();
        }
        if (starBornCount > starDeathDelay){
            killStars();
        }
    }
    starBornCount++;
    drawStars();
    moveStars();
    if (accelerationCount %  accelerationRate === 0){
        accelerateStars();
    }
    accelerationCount++;
}
    