
let navy, orange, blue, sky;
let timer = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);

    navy = color('#070728');
    orange = color('#EA8B16')
    blue = color('#1E78F0')
    sky = color('#7DCDf5')
}

function draw() {
    // Background Settings
    if (frameCount % 6 === 0) { // 1초에 한 번. -> 0.1초로.
        timer++;
    }

    setBackground();
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