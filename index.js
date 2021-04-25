/**
 * Team
 * Developed, Designed By
 * IENGROUND github.com/ienground
 * Jaewoo Park
 * Minki Jo
 */

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
        translate(0, 0);
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

class Bubble {
    p = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        // translate(this.x, this.y);

        stroke(255);
        strokeWeight(1);
        fill(255);
        ellipse(this.x, this.y, 32, 12);
        ellipse(this.x + 10, this.y + 5, 24, 15);
        ellipse(this.x + 30, this.y + 5, 24, 15);
        ellipse(this.x + 30, this.y - 5, 24, 10);
        ellipse(this.x + 20, this.y - 5, 24, 15);
        ellipse(this.x + 40, this.y, 32, 14);
    }

    move() {
        this.p += 0.01;
        const nr = 0.5 - noise(this.p);
        this.x += 1;
        this.y += nr;

        if (this.x >= width) {
            this.x = -20;
        }
    }
}

let navy, orange, blue, sky;
let timer = 0;
let sharks = [];
let clouds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    navy = color('#070728');
    orange = color('#EA8B16')
    blue = color('#1E78F0')
    sky = color('#7DCDf5')

    for (let i = 0; i < 4; i++) {
        clouds.push(new Bubble(random(0, width), random(0, height / 4)));
    }
}

function draw() {
    // Background Settings
    if (frameCount % 6 === 0) { // 1초에 한 번. -> 0.1초로.
        timer++;
    }

    setBackground();
    setCloud();

}

function setBackground() {
    let startColor;
    if (timer % 400 > 0 && timer % 400 < 50) {
        startColor = lerpColor(blue, navy, (timer % 400) / 50);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(startColor, orange, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 51 && timer % 400 < 100) {
        startColor = lerpColor(orange, navy, (timer % 400) / 50 - 1);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(navy, startColor, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 101 && timer % 400 < 150) {
        for (let y = 0; y < height; y++) {
            stroke(navy);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 151 && timer % 400 < 200) {
        startColor = lerpColor(navy, blue, (timer % 400) / 50 - 3);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(navy, startColor, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 201 && timer % 400 < 250) {
        startColor = lerpColor(navy, blue, (timer % 400) / 50 - 4);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(startColor, blue, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 251 && timer % 400 < 300) {
        startColor = lerpColor(blue, orange, (timer % 400) / 50 - 5);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(blue, startColor, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 301 && timer % 400 < 350) {
        startColor = lerpColor(orange, sky, (timer % 400) / 50 - 6);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(blue, startColor, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    } else if (timer % 400 >= 351 && timer % 400 < 400) {
        startColor = lerpColor(sky, orange, (timer % 400) / 50 - 7);
        for (let y = 0; y < height; y++) {
            let color = lerpColor(blue, startColor, y / height);
            stroke(color);
            line(0, y, width, y);
        }
    }
}

function setCloud() {
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].move();
        clouds[i].display();
    }
}