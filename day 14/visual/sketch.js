let grid = [];
const robots = input.split("\n").map((v, i) => {
    const a = v.match(/(?<=\=).?\d+/g).map(Number)
    const b = v.match(/(?<=,).?\d+/g).map(Number)
    if (!grid[b[0]]) grid[b[0]] = []
    if (!grid[b[0]][a[0]]) grid[b[0]][a[0]] = 1
    else grid[b[0]][a[0]] = 1;
    return {
        px: a[0],
        py: b[0],
        vx: a[1],
        vy: b[1],
    }
})
const HEIGHT = 103;
const WIDTH = 101;
const SIMX = 0;
const tileWidth = 6;
let seconds = 0;
let wait = 200;
let shouldLoop = false;
function setup() {
    const canvas = createCanvas(WIDTH * tileWidth, HEIGHT * tileWidth);
    canvas.parent('sketch');

}
function draw() {
    background(50);
    noStroke()
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if ((grid[i] ?? [])[j]) fill(255);
            else fill(50);
            rect(tileWidth * j, tileWidth * i, tileWidth, tileWidth);
        }
    }
    if (shouldLoop) progress()
}
function mouseClicked() {
    shouldLoop = !shouldLoop;
    if (shouldLoop) {
        progress()
    }
    // saveGif('mySketch', 60);
    // }
}
function progress() {
    robots.forEach((v, i) => {
        grid[v.py][v.px] = 0;
        v.px = (v.px + (v.vx)) % WIDTH;
        v.py = (v.py + (v.vy)) % HEIGHT;
        if (v.px < 0) v.px += WIDTH;
        if (v.py < 0) v.py += HEIGHT;
        if (!grid[v.py]) grid[v.py] = []
        if (!grid[v.py][v.px]) grid[v.py][v.px] = 1
        else grid[v.py][v.px] = 1;
    })
    seconds++;
    let pass = true;
    document.getElementById("seconds").innerHTML = seconds
    for (let i = 0; i < HEIGHT; i++) {
        pass = true
        for (let j = 45; j < 60; j++) {
            if ((grid[i] ?? [])[j] != 1) { pass = false; break }
        }
        if (pass) {
            break;
        }
    }
    if (pass) {
        shouldLoop = false
    }
    if (shouldLoop) {
        progress()
    }
}