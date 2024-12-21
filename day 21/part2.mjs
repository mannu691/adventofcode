import { getInput } from "../lib/aoc.mjs";

const input = getInput(false);
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let start, end;
const grid = input.split("\n").map((v, i) => {
    if (v.includes("S")) start = [i, v.indexOf("S")];
    if (v.includes("E")) end = [i, v.indexOf("E")];
    return v.split("");
});
const manhattan = ([i, j], [i2, j2]) => Math.abs(i - i2) + Math.abs(j - j2);

function findBestPath(start, end) {
    const queue = [start];
    const came_from = {};
    came_from[start] = null
    while (queue.length) {
        const [i, j] = queue.shift();
        if (i == end[0] && j == end[1]) break;
        dirs.forEach(([dx, dy]) => {
            const ni = i + dx, nj = j + dy;
            if (grid[ni]?.[nj] && grid[ni][nj] !== "#" && !came_from[[ni, nj]]) {
                queue.push([ni, nj])
                came_from[[ni, nj]] = [i, j];
            }
        });
    }
    const path = [end];
    let curr = came_from[end];
    while (curr[0] != start[0] || curr[1] != start[1]) {
        path.push(curr);
        curr = came_from[curr];
    }
    path.push(start);
    return path.reverse();
}

const bestPath = findBestPath(start, end);
let count = 0
for (let i = 0; i < bestPath.length; i++) {
    for (let j = i + 100; j < bestPath.length; j++) {
        let d = manhattan(bestPath[i], bestPath[j])
        if (d <= 20 && 100 <= j - i - d) {
            count++;
        }
    }
}
console.log(count)

