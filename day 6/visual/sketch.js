const data = input.split("\n").map(row => row.split(""));
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] }

const W = data.length * 5;
const SIZE = data.length;
const tileWidth = W / SIZE;
let grid = [];
let guard;
let look;
let shouldLoop = true;
let blockHit = 0;
block = [59,0];
function setup() {
    data.forEach((v, i) => {
        Object.entries(dirs).forEach((val) => {
            let ind = v.indexOf(val[0])
            if (ind != -1) {
                guard = [i, ind];
                look = val[0];
            }

        })
    })

    data[block[0]][block[1]] = "0"
    createCanvas(W, W);
}

function draw() {
    background(200);
    noStroke()
    for (let j = 0; j < SIZE; j++) {
        for (let i = 0; i < SIZE; i++) {
            let char = data[j][i];
            if (char == ".")
                fill(50);
            else if (char == "#")
                fill(0);
            else if (char == "X")
                fill(100);
            else if (char == "0")
                fill(255, 0, 0);
            else if (Object.keys(dirs).includes(char))
                fill(255);
            rect(tileWidth * i, tileWidth * j, tileWidth, tileWidth);
        }
    }
    if (shouldLoop) progress()
}
function progress() {
    let simDir = dirs[look];
    let cur = [guard[0] + simDir[0], guard[1] + simDir[1]]
    let ahead = (data[cur[0]] ?? [])[cur[1]];
    if (ahead == undefined) {
        shouldLoop = false;
    }
    if (cur[0] == block[0] && cur[1] == block[1]) { ahead = "#"; blockHit++ }
    if (ahead == "#") {
        let nextDir = (Object.keys(dirs).indexOf(look) + 1) % 4
        look = Object.keys(dirs).at(nextDir);
    }
    else {
        data[guard[0]][guard[1]] = "X";
        guard = cur;
        data[cur[0]][cur[1]] = look;
    }
    if (blockHit > 1) {
        shouldLoop = false;
        console.log("WINNNNER")
    }

}