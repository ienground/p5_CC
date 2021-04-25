let a;
let timer = 0;

class s {
    time = 0;
    angle = 0;
    x = 0
    y = 0

    constructor(cx, cy, color) {
        this.cx = cx;
        this.cy = cy;
        this.color = color;
    }

    update(time) {
        this.time = time;
        this.angle = this.time * (PI / 36);
        this.x = this.cx + cos(this.angle) * 200;
        this.y = this.cy - sin(this.angle) * 200;
    }

    draw() {
        noStroke();
        fill(255, 165, 0, 50);
        circle(this.x, this.y, 100);

        fill(255, 100, 0, 100);
        circle(this.x, this.y, 70);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    a = new s(width / 2, height / 2, 0, timer)

    circle(width / 2, height / 2, 400);
}

function draw() {
    if (frameCount % 60 === 0) {
        timer += 1;
    }

    // background(220);

    a.update(timer);
    a.draw();
}