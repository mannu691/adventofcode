const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const data = str.split("\r\n").map(v => v.split(""))
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const start = [data.length - 2, 1];


function findPath(start, startDir) {
    const queue = [[...start, 0, startDir]];
    const visited = {};
    let lowest = Infinity;
    while (queue.length) {
        const [i, j, score, prevDir] = queue.shift();
        if ((visited[i] ?? [])[j] && (visited[i] ?? [])[j] <= score) continue;
        if (!visited[i]) visited[i] = {};
        visited[i][j] = score;
        if (data[i][j] === "E") {
            lowest = Math.min(lowest, score);
            continue;
        }
        for (const [idx, [di, dj]] of dirs.entries()) {
            const ni = i + di, nj = j + dj;
            const add = (idx === prevDir) ? 1 : 1001;            
            if ((data[ni] ?? [])[nj] !== "#" && (!(visited[ni] ?? [])[nj] || (visited[ni] ?? [])[nj] > score + add)) {
                queue.push([ni, nj, score + add, idx]);
            }
        }
    }
    return lowest === Infinity ? -1 : lowest;
}

console.log(findPath(start, 1))