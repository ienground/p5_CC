


let size = 100;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(30, 10, 100);

    let shark = new Shark(size, width / 2, height / 2,  0, 0, 0);
    sharks.push(shark);

}

let cnt = 0;

function draw(){
    background(30, 10, 100);
    // let shark = new Shark(100, mouseX, mouseY, 1, random(-2, 2), (frameCount) % 360);

    sharks[0].move();
    sharks[0].draw();


}

let beforeAngle = 0;

function mousePressed() {
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}