import { getInput } from "../lib/aoc.mjs";
const inputs = getInput(true).split("\n");
const num_keypad = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [undefined, 0, 'A']];
const dir_keypad = [[undefined, "^", "A"], ["<", "v", ">"]];
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] };
const manhattan = ([i, j], [i2, j2]) => Math.abs(i - i2) + Math.abs(j - j2);
//BFS with priority to previous direction
function bfs(grid, start, end) {
    const queue = [[...start, 0, ""]];
    const visited = {};
    let bestPath = ""
    let lowest = Infinity;
    while (queue.length) {
        const [i, j, score, path] = queue.shift();
        if (i == end[0] && j == end[1]) {
            if (score < lowest) {
                bestPath = path;
                console.log(path.length)
            }
            continue;
        }
        Object.entries(dirs).forEach(([k, [dy, dx]]) => {
            const ni = i + dy, nj = j + dx;
            const newScore = score + path.length > 0 ? manhattan(findInGrid(dir_keypad, path[path.length - 1]), findInGrid(dir_keypad, k)) : 1;
            if (grid[ni]?.[nj] != undefined && !visited[[ni, nj]]) {
                queue.push([ni, nj, newScore, path + k]);
                visited[[ni, nj]] = true;
            }
        })
    }
    return bestPath;
}

function findInGrid(grid, ch) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == ch) return [i, j];
        }
    }
}

function useDirectionalKeypad(inp) {
    let start = [0, 2];
    let path = ''
    for (let i = 0; i < inp.length; i++) {
        let end = findInGrid(dir_keypad, inp[i])
        path += bfs(dir_keypad, start, end) + "A";
        start = end;
    }
    return path;
}

function useNumericKeypad(inp) {
    let start = [3, 2];
    let path = ''
    for (let i = 0; i < inp.length; i++) {
        let end = findInGrid(num_keypad, inp[i])
        path += bfs(num_keypad, start, end) + "A";
        start = end;
    }
    return path;
}

let sum = 0;
for (let i = 0; i < inputs.length; i++) {
    const inp = inputs[i];
    const seq = useNumericKeypad(inp);
    // console.log(seq)
    console.log(seq, seq.length)
    const seq2 = useDirectionalKeypad(seq);
    console.log(seq2, seq2.length)
    // console.log(seq2)
    const seq3 = useDirectionalKeypad(seq2);
    console.log(seq3, seq3.length)
    sum += seq3.length * parseInt(inp.slice(0, inp.length - 1));
    break;
}
console.log(sum)

