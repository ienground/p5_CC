class Shark {
    anger = 0;
    count = 0;
    vcount = 1;

    constructor(size, x, y, vx, vy, angle) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.angle = angle;
    }

    setAnger(anger) {
        this.anger = anger;
    }

    getAnger() {
        return this.anger;
    }

    draw() {
        angleMode(DEGREES);
        noStroke();

        translate(this.x, this.y);
        rotate(this.angle);

        fill('#FFFFFF');

        let direction;
        if (this.vx >= 0) direction = 1;
        else direction = -1;

        let t = tan(15) + tan(20);
        let cx = direction * this.size * cos(10) - direction * this.size * sin(10) + 2 * direction * this.size * sin(10);
        let cy = -this.size * tan(15) / t + this.size * sin(10) + this.size * cos(10) - 2 * this.size * cos(10);

        let px = [
            - direction * this.size / t,
            0,
            direction * this.size * cos(10),
            cx + 2 * direction * this.size * cos(40),
            direction * this.size * cos(10) - direction * this.size * sin(10),
            0
        ];

        let py = [
            0,
            -this.size * tan(15) / t,
            -this.size * tan(15) / t + this.size * sin(10),
            cy + 2 * this.size * sin(40),
            -this.size * tan(15) / t + this.size * sin(10) + this.size * cos(10),
            this.size * tan(20) / t
        ]

        fill('#888888')
        triangle(px[0], py[0], px[1], py[1], px[5], py[5]); // 1
        fill('#FFFFFF')
        quad(px[1], py[1], px[2], py[2], px[4], py[4], px[5], py[5]);

        triangle(px[2], py[2], px[3], py[3], px[4], py[4]);
        if (this.vx < 0) {
            arc(cx, cy, this.size * 4, this.size * 4, 80, 140, CHORD);
        } else {
            arc(cx, cy, this.size * 4, this.size * 4, 40, 100, CHORD);
        }

        // fin

        // front leg
        let level = map(this.count, 0, 100, 1, 2);
        let level2 = map(this.count, 0, 100, 1, 1.3);
        triangle(px[4], py[4], px[4] - direction * this.size / 2, py[4] - this.size / 2, px[4] - direction * this.size / level, py[4] + this.size / 2.5);
        fill('#888888')
        // rear leg
        triangle(px[5], py[5], px[5] - direction * this.size / level2, py[5] + this.size / 3, px[5] - direction * this.size / 4, py[5] - this.size / 4);
        triangle(px[1] - direction * this.size / 4, py[1] - this.size / 2, px[1] - direction * this.size / 2, py[1] + this.size / 3, px[1] + direction * this.size/ 2, py[1] + this.size / 3);

        // gray
        let gray_x = cx + 2 * direction * this.size * cos(43);
        let gray_y = cy + 2 * this.size * sin(43);
        quad(px[1], py[1], px[1] + direction * this.size / 4, (2 * py[1] + py[5]) / 3, px[1] + direction * this.size / 4, (py[1] + 2 * py[5]) / 3, px[5], py[5]);
        quad(px[1], py[1], px[3], py[3], gray_x, gray_y, px[1] + direction * this.size / 4, (py[1] + 2 * py[5]) / 3)

        fill('#FF0000');
        circle(px[4] - direction * this.size / level, py[4] + this.size / 2.5, 10);

        fill('#888888')

        // tail
        triangle(px[0] + direction * this.size / 3, py[0] + this.size / 10, px[0] - direction * this.size / 1.5, py[0] - this.size, px[0] - direction * this.size / 2.5, py[0] - this.size / 5);
        triangle(px[0] + direction * this.size / 3, py[0] + this.size / 10, px[0] - direction * this.size / 1.5, py[0] + this.size / 1.5, px[0] - direction * this.size / 2.5, py[0] - this.size / 5);

        // eye
        fill('#4E4F51');
        triangle(px[3] - direction * this.size / 1.5, py[3], px[3] - direction * this.size / 1.3, py[3] - this.size / 10, px[3] - direction * this.size / 2.5, py[5] - this.size / 2);

        // mouth
        fill('#FF0000');
        if (this.vx >= 0) {
            arc(cx, cy, this.size * 4, this.size * 4, 50, 60, CHORD);
        } else {
            arc(cx, cy, this.size * 4, this.size * 4, 120, 130, CHORD);
        }

        let mx = [cx + 2 * direction * this.size * cos(50), cx + 2 * direction * this.size * cos(60)]
        let my = [cy + 2 * this.size * sin(50), cy + 2 * this.size * sin(60)];

        quad(mx[0], my[0], mx[0] - direction * this.size / 2, my[0], mx[1] - direction * this.size / 2, my[1], mx[1], my[1]);

        stroke(0);
        fill(255);
        for (let i = 0; i < 5; i++) {
            triangle(mx[0] - i * direction * this.size / 10, my[0], mx[0] - (i + 1) * direction * this.size / 10, my[0], mx[0] - (i + 0.5) * direction * this.size / 10, my[0] + this.size / 20);
            triangle(mx[1] - i * direction * this.size / 10, my[1], mx[1] - (i + 1) * direction * this.size / 10, my[1], mx[1] - (i + 0.5) * direction * this.size / 10, my[1] - this.size / 20);
        }
        noStroke();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.count += this.vcount;
        if (this.x < 0 || this.x > windowWidth) {
            this.vx = -this.vx;
        }

        if (this.y < 0 || this.y > windowHeight) {
            this.vy = -this.vy;
        }

        if (this.count > 100 || this.count < 0) {
            this.vcount = -this.vcount;
        }
    }
}

let sharks = [];
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