/**
 * Team
 * Developed, Designed By
 * IENGROUND github.com/ienground
 * Jerry Park
 * Minki Jo
 */

let navy, orange, blue, sky;
let timer = 0;
let sharks = [];
let sharksJump = [];
let clouds = [];

let sound1;
let mic, fft, amp;
let shipup;
let shipMove = [];
let charMove = [];
let charSize = 0.33;
let boatReversed = false;

class Cloud {
    p = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
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

        if (this.x >= width + 100) {
            this.x = -100;
        }
    }
}

class Shark {
    anger = 0;
    count = 0;
    vcount = 1;
    ivx = 0;
    ivy = 0;
    i = 0;
    kx = 0;
    ky = 0;

    constructor(size, x, y, vx, vy, angle) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ivx = vx;
        this.ivy = vy;
        this.angle = angle;
    }

    setAnger(anger) {
        if (anger <= 100) {
            this.anger = anger;
            this.vx = this.ivx * (1 + anger / 10);
            this.vy = this.ivy * (1 + anger / 10);
        }
    }

    getAnger() {
        return this.anger;
    }

    draw() {
        angleMode(DEGREES);
        noStroke();

        translate(this.x, this.y);
        rotate(this.angle);

        let sharkColor = lerpColor(color('#888888'), color('#ff4141'), this.anger / 100);

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

        fill(sharkColor)
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
        fill(sharkColor)

        // rear leg
        triangle(px[5], py[5], px[5] - direction * this.size / level2, py[5] + this.size / 3, px[5] - direction * this.size / 4, py[5] - this.size / 4);
        triangle(px[1] - direction * this.size / 4, py[1] - this.size / 2, px[1] - direction * this.size / 2, py[1] + this.size / 3, px[1] + direction * this.size/ 2, py[1] + this.size / 3);

        // gray
        let gray_x = cx + 2 * direction * this.size * cos(43);
        let gray_y = cy + 2 * this.size * sin(43);
        quad(px[1], py[1], px[1] + direction * this.size / 4, (2 * py[1] + py[5]) / 3, px[1] + direction * this.size / 4, (py[1] + 2 * py[5]) / 3, px[5], py[5]);
        quad(px[1], py[1], px[3], py[3], gray_x, gray_y, px[1] + direction * this.size / 4, (py[1] + 2 * py[5]) / 3)

        fill(sharkColor)

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
        strokeWeight(this.size / 50);
        fill(255);
        for (let i = 0; i < 5; i++) {
            triangle(mx[0] - i * direction * this.size / 10, my[0], mx[0] - (i + 1) * direction * this.size / 10, my[0], mx[0] - (i + 0.5) * direction * this.size / 10, my[0] + this.size / 20);
            triangle(mx[1] - i * direction * this.size / 10, my[1], mx[1] - (i + 1) * direction * this.size / 10, my[1], mx[1] - (i + 0.5) * direction * this.size / 10, my[1] - this.size / 20);
        }
        fill(0);
        noStroke();
        // text(this.anger, 0, 0);
        rotate(-this.angle);
        translate(-this.x, -this.y);

    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.count += this.vcount;

        if (this.x < 0 || this.x > width) {
            this.vx = -this.vx;
        }

        if (this.y < height * 2 / 3 || this.y > height) {
            this.vy = -this.vy;
        }


        if (this.count > 100 || this.count < 0) {
            this.vcount = -this.vcount;
        }

        if (this.i === 0) {
            this.kx = this.x;
            this.ky = this.y;
        }
    }

    jump(px, py) {
        if (dist(px, py, this.kx, this.ky) <= this.size * 5) {
            print("fjump");

            if (this.i === 0) {
                this.kx = this.x;
                this.ky = this.y;
            }

            if (this.i <= 10) {
                let t = this.i / 10;

                // let x = bezierPoint(this.kx, (this.kx + px) * 0.6, (this.kx + px) * 0.6, px, t);
                // let y = bezierPoint(this.ky, abs(this.ky - py) / 2, abs(this.ky - py) / 2, py, t);

                let x = curvePoint(this.kx, this.kx, px, px, t);
                let y = curvePoint(this.ky + 200, this.ky, py, py + 200, t);

                this.x = x;
                this.y = y;

                this.i++;
            }

            if (this.i === 10) {
                boatReversed = true;
                charSize = 0.0001;
            }
            // dk
        }
    }
}

class Ship {
    constructor(shy, wave1, wave2, isReversed) {
        this.shy = shy;
        this.wave1 = wave1;
        this.wave2 = wave2;
        this.isReversed = isReversed;
    }

    render() {
        push();
        translate(width / 2, height / 1.9);
        angleMode(RADIANS);
        if (this.wave1 > this.wave2) {
            rotate(this.wave2 - this.wave1);
        } else {
            rotate(this.wave1 - this.wave2);
        }
        angleMode(DEGREES);

        noStroke();
        fill('#663A32A8');

        beginShape();
        if (!this.isReversed) {
            vertex(-100, 90 + this.shy * 2);
            vertex(100, 90 + this.shy * 2);
            vertex(130, 30 + this.shy * 2);
            vertex(-130, 30 + this.shy * 2);
        } else {
            vertex(-100, 30 + this.shy * 2);
            vertex(100, 30 + this.shy * 2);
            vertex(130, 90 + this.shy * 2);
            vertex(-130, 90 + this.shy * 2);
        }
        endShape();

        translate(-width / 2, -height / 2);
        if (this.wave1 <= this.wave2) {
            rotate(this.wave2 - this.wave1);
        } else {
            rotate(this.wave1 - this.wave2);
        }

        pop();
    }
}

class Simpson {
    constructor(x, y, size, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
    }

    setSize(size) {
        this.size = size;
    }

    render() {
        translate(this.x, this.y)

        strokeWeight(5);
        stroke(0);
        fill(255, 255, 0)

        scale(this.size);
        rotate(this.angle);

        beginShape();
        curveVertex(120, -390); //hair
        curveVertex(90, -380);
        curveVertex(85, -395);
        curveVertex(80, -380);
        curveVertex(70, -395);
        curveVertex(60, -380);
        curveVertex(40, -395);
        curveVertex(31, -380);
        curveVertex(20, -395);
        curveVertex(10, -380);
        curveVertex(-5, -395);
        curveVertex(-20, -365);
        curveVertex(-30, -380);
        curveVertex(-40, -350);
        curveVertex(-50, -370);
        curveVertex(-60, -350);
        curveVertex(-70, -360);

        curveVertex(-50, -170); //ear
        curveVertex(-30, -160);
        curveVertex(-50, -170);
        curveVertex(-60, -150);
        curveVertex(-30, -160);
        curveVertex(-40, -160);

        curveVertex(-40, -70); //neck
        curveVertex(-20, -40);
        curveVertex(40, -45);
        curveVertex(45, -85);

        curveVertex(45, -80);//mouth
        curveVertex(50, -85);
        curveVertex(60, -90);
        curveVertex(0, -100);
        curveVertex(60, -90);
        curveVertex(140, -110);

        curveVertex(130, -140); //front
        curveVertex(128, -170);
        curveVertex(120, -240);
        curveVertex(120, -390);

        endShape();

        beginShape();
        fill(255, 255, 0); //nose
        stroke(0);
        strokeWeight(5);

        curveVertex(80, -170);
        curveVertex(90, -168);
        curveVertex(100, -170);
        curveVertex(115, -172);
        curveVertex(120, -175);
        curveVertex(128, -172);
        curveVertex(135, -165);
        curveVertex(138, -160);
        curveVertex(138, -154);
        curveVertex(130, -140);
        curveVertex(110, -135);
        curveVertex(100, -135);
        curveVertex(90, -135);
        endShape();

        //eye bigger
        fill(255)
        ellipse(110, -210, 80, 80);
        ellipse(40, -210, 80, 80);

        //eye smaller
        fill(0);
        ellipse(40, -210, 10, 10);
        ellipse(110, -210, 10, 10);

        beginShape();
        curveVertex(-65, 6);
        curveVertex(-35, 6);
        curveVertex(-32, 41);
        curveVertex(-30, 90);
        curveVertex(-50, 90);
        curveVertex(-65, 6);
        endShape();

        beginShape();
        fill(235, 155, 0);// 목이 시작되는 지점
        curveVertex(-89, 90);
        curveVertex(-90, 90);
        curveVertex(-80, 45);
        curveVertex(-65, 6);
        curveVertex(-51, -40);
        curveVertex(-50, -60);
        curveVertex(-40, -69);
        curveVertex(-20, -40);
        curveVertex(40, -45);
        curveVertex(35, -30);
        curveVertex(50, -20);
        curveVertex(60, 15);
        curveVertex(70, 49);
        curveVertex(76, 90);
        curveVertex(50, 90);
        curveVertex(-88, 90);
        curveVertex(-89, 90);
        endShape();

        beginShape();//왼쪽 옷
        fill(235, 155, 0);
        curveVertex(-78, 5);
        curveVertex(-80, 5);
        curveVertex(-68, -38);
        curveVertex(-50, -38);
        curveVertex(-50, -60);
        curveVertex(-30, -30);
        curveVertex(-19, -15);
        curveVertex(-15, -2);
        curveVertex(-35, 5);
        curveVertex(-77, 5);
        curveVertex(-78, 5);
        endShape();


        beginShape();//노랑 오른쪽팔
        fill(255, 255, 0);
        curveVertex(70, 0);
        curveVertex(70, 1);
        curveVertex(70, 2);
        curveVertex(70, 49);
        curveVertex(60, 10);
        curveVertex(70, 0);
        endShape();

        beginShape();//노랑 왼쪽팔
        fill(255, 255, 0);
        curveVertex(-63, 6);
        curveVertex(-65, 6);
        curveVertex(-70, 90);
        curveVertex(-30, 90);
        curveVertex(-34, 5);
        curveVertex(-64, 6);
        curveVertex(-63, 6);
        endShape();

        beginShape();//오른쪽팔
        fill(235, 155, 0);
        curveVertex(70, 0);
        curveVertex(70, 1);
        curveVertex(65, 10);
        curveVertex(60, 15);
        curveVertex(50, -10);
        curveVertex(70, -1);
        curveVertex(70, 0);
        endShape();

        rotate(-this.angle);
        scale(1 / this.size);
        translate(-this.x, -this.y);

    }
}

function preload() {
    sound1 = loadSound('./src/ttan.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    navy = color('#070728');
    orange = color('#EA8B16')
    blue = color('#1E78F0')
    sky = color('#7DCDf5')

    for (let i = 0; i < 25; i++) {
        clouds.push(new Cloud(random(-100, width + 100), random(0, height / 4)));
    }

    for (let i = 0; i < 3; i++) {
        sharks.push(new Shark(35, 0, height / 2 + height / 4, random(-10, 10), random(-10, 10), 0));
        sharksJump.push(false);
    }

    // Sound Setting
    mic = new p5.AudioIn();
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);

    amp = new p5.Amplitude();
    amp.setInput(mic);
}

function draw() {
    // Background Settings
    if (frameCount % 6 === 0) { // 1초에 한 번. -> 0.1초로.
        timer++;
    }

    // set background and environment
    setBackground();
    fill('#13285a');
    noStroke();
    rect(0, height / 2 + height / 8, width, height / 2);
    setCloud();

    // wave and boat

    let waveform = fft.waveform();
    let wave1 = waveform[500];
    let wave2 = waveform[530];

    shipup = map(wave1 * 3, -1, 1, -70, 80);

    // let down = width / 1024;
    // let wave1_down = down * 511;
    // let wave2_down = down * 513;

    let maxShipup = -1;
    let minShipup = 9999999;

    for (let i = 0; i < 10; i++) {
        shipMove[i] = new Ship(2 * shipup, wave1, wave2, boatReversed);
        charMove[i] = new Simpson(width / 2, 370 / 658 * height + 2 * shipup, charSize, 0);
        fill(0);
        // text(shipup, width / 2 - 200, height / 2);

        if (shipup >= maxShipup) {
            maxShipup = shipup;
        }

        if (shipup <= minShipup) {
            minShipup = shipup;
        }
    }

    for (let char of charMove) {
        char.render()
    }

    for (let ship of shipMove) {
        ship.render()
    }

    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, -25, width + 25);
        let y = map(waveform[i] * 3, -1, 1, height / 4 * 3, height / 2);
        let h = map(waveform[i], -1, 1, 150, 290);

        noStroke();
        fill('#00AAFF0D');
        rect(x, y, 10, height / 2, 20);
    }

    let charX = 0, charY = 0;
    let volume = fft.analyze()[10];
    fill(255);
    textSize(24);
    textAlign(CENTER);

    for (let char of charMove) {
        charX = char.x;
        charY = char.y;
    }

    text(volume, charX, charY + 40);

    for (let i = 0; i < sharksJump.length; i++) {
        sharksJump[i] = volume <= 150 && dist(charX, charY, sharks[i].kx, sharks[i].ky) <= sharks[i].size * 5 || sharks[i].i !== 0;
    }

    // sharks
    for (let i = 0; i < sharks.length; i++) {
        if (volume >= 200) {
            sharks[i].setAnger(sharks[i].getAnger() + 1);
        }
        if (!sharksJump[i]) {
            sharks[i].move();
        } else {
            sharks[i].jump(charX, charY);
        }

        sharks[i].draw();
    }

    // die
    if (volume >= 600) {
        charSize = 0.0001;
        boatReversed = true;
    }

    // if (maxS)

}

function setBackground() {
    colorMode(RGB, 255);
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

    let angle = (timer % 400) * 360 / 400;

    let x1 = width / 2 + cos( 90 - 125 * 360 / 400 + angle) * width / 3;
    let y1 = height / 2 + height / 8 + sin( 90 - 125 * 360 / 400 + angle) * width / 3;
    let x2 = width / 2 + cos( 270 - 125 * 360 / 400 + angle) * width / 3;
    let y2 = height / 2 + height / 8 + sin( 270 - 125 * 360 / 400 + angle) * width / 3;

    noStroke();
    fill(255, 165, 0, 50);
    circle(x1, y1, 100);

    fill(255, 100, 0, 100);
    circle(x1, y1, 70);

    fill(255, 255, 255, 50);
    circle(x2, y2, 100);

    fill(255, 255, 255, 100);
    circle(x2, y2, 70);
}

function setCloud() {
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].move();
        clouds[i].display();
    }
}