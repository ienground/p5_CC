let s;
let navy;
let orange;
let blue;
let sky;
let timer = 1

function setup() {
    createCanvas(windowWidth, windowHeight);
    let s = second();
}

function draw() {
    background(220);

    navy = color(7, 7, 40);
    orange = color(234, 140, 22);
    blue = color(30, 120, 240);
    sky = color(125, 205, 245);

    if (frameCount % 60 === 0 && timer < 120) {
        timer += 1;
    }

    if (timer > 0 && timer < 6) {
        let c = lerpColor(blue, navy, timer / 5)
        for (let y = 0; y < height; y++) {
            let linecolor = lerpColor(c, orange, y / height);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 6 && timer < 11) {

        let d = lerpColor(orange, navy, (timer / 5) - 1)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(navy, d, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 11 && timer < 16) {
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = navy;
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 16 && timer < 21) {
        let e = lerpColor(navy, blue, (timer / 5) - 3)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(navy, e, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 21 && timer < 26) {
        let e = lerpColor(navy, blue, (timer / 5) - 4)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(e, blue, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 26 && timer < 31) {
        let e = lerpColor(blue, orange, (timer / 5) - 5)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(blue, e, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 31 && timer < 36) {
        let e = lerpColor(orange, sky, (timer / 5) - 6)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(blue, e, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    } else if (timer >= 36 && timer < 41) {
        let e = lerpColor(sky, orange, (timer / 5) - 7)
        for (let y = 0; y < windowHeight; y++) {
            let linecolor = lerpColor(blue, e, y / windowHeight);
            stroke(linecolor);
            line(0, y, width, y)
        }
    }
}