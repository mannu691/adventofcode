import { getInput } from "../lib/aoc.mjs";
const inputs = getInput(false).split("\n");
const num_keypad = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [undefined, 0, 'A']];
const dir_keypad = [[undefined, "^", "A"], ["<", "v", ">"]];
const num_dict = {}
const dir_dict = {}
num_keypad.forEach((v, i) => v.forEach((v2, j) => num_dict[v2] = [i, j]));
dir_keypad.forEach((v, i) => v.forEach((v2, j) => dir_dict[v2] = [i, j]));
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] };

function bfs(grid, start, end) {
    const queue = [[...start, 0, ""]];
    const visited = {};
    let paths = [];
    let lowest = Infinity;
    while (queue.length) {
        const [i, j, cost, path] = queue.shift();
        if (i == end[0] && j == end[1]) {
            if (cost < lowest) {
                paths = [];
                lowest = cost;
            }
            if (cost == lowest) paths.push(path);
            continue
        }
        if (visited[[i, j]] < cost) continue
        visited[[i, j]] = cost;
        if (cost > lowest) continue;
        Object.entries(dirs).forEach(([k, [dy, dx]]) => {
            const ni = i + dy, nj = j + dx;
            if (grid[ni]?.[nj] != undefined) {
                queue.push([ni, nj, cost + 1, path + k]);
            }
        })
    }
    return paths
}

function useKeypad(inp, depth = 2, keypad = num_keypad, map = num_dict, memo = {}) {
    if (memo[`${inp}-${depth}`]) return memo[`${inp}-${depth}`];
    let start = map["A"];
    let len = 0;
    for (const char of inp) {
        const end = map[char];
        const paths = bfs(keypad, start, end);
        if (depth == 0) len += paths[0].length + 1;
        else len += Math.min(...paths.map(v => useKeypad(v + "A", depth - 1, dir_keypad, dir_dict, memo)))
        start = end;
    }
    memo[`${inp}-${depth}`] = len;
    return len;
}

const solve = (n = 2) => {
    let sum = 0;
    for (const inp of inputs) {
        sum += useKeypad(inp, n) * parseInt(inp.slice(0, inp.length - 1));
    }
    return sum;
}
console.log(solve(2))
console.log(solve(25));