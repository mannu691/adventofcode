import { getInput } from "../lib/aoc.mjs";

const input = getInput(false);
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] };
let start, end;
const grid = input.split("\n").map((v, i) => {
    if (v.includes("S")) start = [i, v.indexOf("S")];
    if (v.includes("E")) end = [i, v.indexOf("E")];
    return v.split("");
});


function findBestPath(start, end) {
    const queue = [[...start, []]];
    const visited = {};
    while (queue.length) {
        const [i, j, path] = queue.shift();
        path.push([i, j]);
        if (i === end[0] && j === end[1]) return path;
        Object.values(dirs).forEach(([dx, dy]) => {
            const ni = i + dx, nj = j + dy;
            if (grid[ni]?.[nj] && grid[ni][nj] !== "#" && !visited[[ni, nj]]) {
                queue.push([ni, nj, path.slice()])
                visited[[ni, nj]] = true;
            }
        });
    }
    return [];
}
function findBestScore(start, end) {
    const queue = [[...start, 0]];
    const visited = {};
    while (queue.length) {
        const [i, j, score] = queue.shift();
        if (i === end[0] && j === end[1]) return score;
        Object.values(dirs).forEach(([dx, dy]) => {
            const ni = i + dx, nj = j + dy;
            if (grid[ni]?.[nj] && grid[ni][nj] !== "#" && !visited[[ni, nj]]) {
                queue.push([ni, nj, score + 1])
                visited[[ni, nj]] = true;
            }
        });
    }
    return -1;
}

const bestPath = findBestPath(start, end);
const bestScore = bestPath.length - 1;
const cheats = {};
for (let p = 0; p < bestPath.length - 1; p++) {
    const [i, j] = bestPath[p];
    Object.values(dirs).forEach(([dy, dx]) => {
        const ni = i + dx, nj = j + dy;
        if (grid[ni]?.[nj] == "#" && !cheats[[ni, nj]]) {
            cheats[[ni, nj]] = Math.min(cheats[[ni, nj]] ?? Infinity, p + findBestScore([ni, nj], end));
        }
    })
    console.clear()
    console.log("Best Score : %d , Brute Forcing : %f%%",bestScore,(p*100/bestScore).toPrecision(2));
}
console.clear()
console.log(Object.values(cheats).filter((v) => bestScore - v >= 100).length)

