const data = input.split("\n\n");
const map = data[0].split("\n").map((v, i) => v.split(""));
const moves = data[1].replaceAll("\n", '').split("")
const HEIGHT = map.length;
const WIDTH = map[0].length;
const tileWidth = 15;
const imgs = {};
var robot = [0, 0];
var wait = 50;
var robotDir = "front";
var i = 0;
var shouldLoop = false;
function preload() {
    imgs.rock = loadImage('/day 15/visual/assets/rock.png');
    imgs.bolder = loadImage('/day 15/visual/assets/bolder.png');
    imgs.ground = loadImage('/day 15/visual/assets/ground.png');
    imgs.back = loadImage('/day 15/visual/assets/back.png');
    imgs.front = loadImage('/day 15/visual/assets/front.png');
    imgs.left = loadImage('/day 15/visual/assets/left.png');
    imgs.right = loadImage('/day 15/visual/assets/right.png');
}
function setup() {
    loop:
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (map[i][j] == "@") {
                robot = [i, j];
                break loop;
            }
        }
    }
    const canvas = createCanvas(WIDTH * tileWidth, HEIGHT * tileWidth);
    canvas.parent('sketch');
}
function draw() {
    noStroke()
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            const char = map[i][j]
            image(imgs.ground, tileWidth * j, tileWidth * i, tileWidth, tileWidth);
            if (char == "#") image(imgs.bolder, tileWidth * j, tileWidth * i, tileWidth, tileWidth);
            else if (char == "@") image(imgs[robotDir], tileWidth * j, tileWidth * i, tileWidth, tileWidth);
            else if (char == "O") image(imgs.rock, tileWidth * j, tileWidth * i, tileWidth, tileWidth);
        }
    }

}

function mouseClicked() {
    shouldLoop = !shouldLoop;
    if (shouldLoop) {
        progress()
        saveGif('bolder', 15);
    }
}

function move([n, m], [dx, dy]) {
    const char = map[n + dx][m + dy];
    if (char == "#") return false;
    if (char == 'O') {
        if (move([n + dx, m + dy], [dx, dy])) {
            map[n + dx][m + dy] = map[n][m];
            map[n][m] = '.';
            return true;
        }
    }
    if (char == '.') {
        map[n + dx][m + dy] = map[n][m];
        map[n][m] = '.';
        return true;
    }
    return false;
}
function progress() {
    if (i == moves.length) {
        shouldLoop = false;
        return;
    }
    const char = moves[i];
    const [n, m] = robot;
    switch (char) {
        case "^":
            robotDir = "back";
            if (move([n, m], [-1, 0])) robot = [n - 1, m];
            break;
        case "v":
            robotDir = "front";
            if (move([n, m], [1, 0])) robot = [n + 1, m];
            break;
        case ">":
            robotDir = "right";
            if (move([n, m], [0, 1])) robot = [n, m + 1];
            break;
        case "<":
            robotDir = "left";
            if (move([n, m], [0, -1])) robot = [n, m - 1];
            break;
        default:
            break;
    }
    i++;
    if (shouldLoop) setTimeout(progress, wait);
}