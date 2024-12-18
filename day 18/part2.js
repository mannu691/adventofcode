const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const inp = str.split("\r\n").map((v) => v.split(",").map(Number));
const data = [];
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const size = 70;
// const size = 6;
const start = [0, 0];
const end = [size, size];

function findPath(start, startDir) {
    const queue = [[...start, 0, startDir]];
    const visited = {};
    let lowest = Infinity;
    while (queue.length) {
        const [i, j, score, prevDir] = queue.shift();
        if ((visited[i] ?? [])[j] && (visited[i] ?? [])[j] <= score) continue;
        if (!visited[i]) visited[i] = {};
        visited[i][j] = score;
        if (i == end[0] && j == end[1]) {
            lowest = Math.min(lowest, score);
            continue;
        }
        for (const [idx, [di, dj]] of dirs.entries()) {
            const ni = i + di, nj = j + dj;
            const add = 1;
            if (ni >= 0 && nj >= 0 && ni <= size && nj <= size && (data[ni] ?? [])[nj] !== "#" && (!(visited[ni] ?? [])[nj] || (visited[ni] ?? [])[nj] > score + add)) {
                queue.push([ni, nj, score + add, idx]);
            }
        }
    }
    return lowest === Infinity ? -1 : lowest;
}

for (let i = 0; i < inp.length; i++) {
    let [x, y] = inp[i];
    if (!data[y]) data[y] = []
    data[y][x] = "#";
    if (findPath(start, 1) == -1) {
        console.log([x, y]);
        break;
    }
}