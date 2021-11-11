var xDrop = [];
var yDrop = [];
var wDrop = [];
var hDrop = [];

var vDrop = [];

const population = 10;

var acceleration = 0.1;

function generateDrop(){
    xDrop.push(random(width));
    yDrop.push(0);
    var w = random(5);
    wDrop.push(w);
    hDrop.push(5 + random(20));

    vDrop.push(5 + w + random(3));
}

function moveDrop(i){
    yDrop[i] = yDrop[i] + vDrop[i];
    vDrop[i] = vDrop[i] + acceleration;
    hDrop[i] = hDrop[i] + acceleration;
    if (yDrop[i] > height){
        xDrop.splice(i, 1);
        yDrop.splice(i, 1);
        wDrop.splice(i, 1);
        hDrop.splice(i, 1);
        vDrop.splice(i, 1);
    }
}


function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent('p5-container');
    noStroke();
    fill(138, 43, 226);
}

function draw() {
    background(230, 230, 250);
    for (var i = 0; i < population; i++){
        generateDrop();
    }
    for (var i = 0; i < xDrop.length; i++){
        rect(xDrop[i], yDrop[i], wDrop[i], hDrop[i]);
        moveDrop(i);
    }
}