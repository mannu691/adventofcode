const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const data = str.split("\r\n").map(v => v.split(""))
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const start = [data.length - 2, 1];


const visited = {};
const path = new Set();
const backtrack = {};
function findPath(start, startDir) {
    const queue = [[...start, 0, startDir]];
    let lowest = Infinity;
    while (queue.length) {
        const [i, j, score, prevDir] = queue.shift();
        if ((visited[i] ?? [])[j] && visited[i][j] < score) {
            continue;
        }
        if (!visited[i]) visited[i] = {};
        visited[i][j] = score;

        if (data[i][j] === "E") {
            lowest = Math.min(lowest, score);
            continue;
        }
        for (const [idx, [di, dj]] of dirs.entries()) {
            const ni = i + di, nj = j + dj;
            const add = (idx === prevDir) ? 1 : 1001;
            if ((data[ni] ?? [])[nj] !== "#" && (!(visited[ni] ?? [])[nj] || (visited[ni][nj] >= score + add))) {
                queue.push([ni, nj, score + add, idx]);
                if (!backtrack[[ni, nj].toString()]) backtrack[[ni, nj].toString()] = [];
                if (visited[ni]?.[nj] > score + add) {
                    backtrack[[ni, nj].toString()] = [[i, j]];
                } else if (visited[ni]?.[nj] === undefined || visited[ni][nj] === score + add) {
                    // console.log(visited[ni]?.[nj])
                    backtrack[[ni, nj].toString()].push([i, j]);
                }
            }
        }
    }
    let stack = [[1, data[0].length - 2]];
    while (stack.length) {
        const ep = stack.pop().toString();
        path.add(ep);
        if (backtrack[ep]) {
            for (const org of backtrack[ep]) {
                if (!path.has(org.toString())) {
                    stack.push(org);
                }
            }
        }
    }
    return lowest === Infinity ? -1 : lowest;
}

let bestScore = findPath(start, 1)
console.log(bestScore)
console.log(path.size)
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        if (path.has(`${i},${j}`)) process.stdout.write("0");
        else process.stdout.write(data[i][j]);
    }
    process.stdout.write("\n");
}