const fs = require("fs");
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let data = str.split("\r\n").map(row => row.split(""));
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] };
const dirKeys = Object.keys(dirs);

let start = [];
let look = ''
data.forEach((v, i) => {
    dirKeys.forEach((key) => {
        let ind = v.indexOf(key);
        if (ind !== -1) {
            start = [i, ind];
            look = key;
        }
    });
});

function isLooped(start, looking, block, memo) {
    let sim = start.slice();
    let simlook = looking;
    let visited = new Set();
    const blockKey = block.toString();
    while (true) {
        let simDir = dirs[simlook];
        let cur = [sim[0] + simDir[0], sim[1] + simDir[1]];
        let curKey = cur.toString() + simlook;

        if (memo.has(curKey + blockKey)) {
            return memo.get(curKey + blockKey);
        }

        let ahead = (data[cur[0]] ?? [])[cur[1]];
        if (!ahead) return false; // Out of bounds
        if (cur[0] === block[0] && cur[1] === block[1]) ahead = "#";

        if (ahead === "#") {
            let nextDir = (dirKeys.indexOf(simlook) + 1) % 4;
            simlook = dirKeys[nextDir];
        } else {
            sim = cur;
        }
        if (visited.has(curKey)) {
            memo.set(curKey + blockKey, true);
            return true;
        }
        visited.add(curKey);
    }
}

let count = 0;
let sim = start.slice();
let first = false;
let simlook = look;
let blocks = [];
const memo = new Map();

while (true) {
    let simDir = dirs[simlook];
    let cur = [sim[0] + simDir[0], sim[1] + simDir[1]]
    let ahead = (data[cur[0]] ?? [])[cur[1]];

    if (!ahead) break; // End of path

    if (ahead == "#") {
        let nextDir = (dirKeys.indexOf(simlook) + 1) % 4;
        simlook = dirKeys[nextDir];
    }
    else {
        if (first && isLooped(start, look, cur, memo)) {
            if (!blocks.some((v) => v[0] === cur[0] && v[1] === cur[1])) {
                count++;
                blocks.push(cur.slice());
            }
        }
        sim = cur.slice();
    }
    first = true;

}
console.log(count)