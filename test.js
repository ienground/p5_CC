
function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    fill(0);
    circle(100, 100, 10);
    translate(100, 100);
    fill(255, 0, 0);
    circle(100, 100, 10);

    translate(-100, -100);
    fill(0, 255, 0);
    circle(100, 100, 10);
}