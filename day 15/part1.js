const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
let robot = [0, 0];
const input = str.split("\r\n\r\n");
const map = input[0].split("\r\n").map((v, i) => {
    let res = v.split("");
    if (res.indexOf("@") != -1) robot = [i, res.indexOf("@")];
    return res
});
const moves = input[1].replaceAll("\n", '').split("")

function move([n, m], [dx, dy]) {
    const char = map[n + dx][m + dy];
    if (char == "#") return false;
    if (char == 'O') {
        if (move([n + dx, m + dy], [dx, dy])) {
            map[n + dx][m + dy] = map[n][m];
            map[n][m] = '.';
            return true;
        }
    }
    if (char == '.') {
        map[n + dx][m + dy] = map[n][m];
        map[n][m] = '.';
        return true;
    }
    return false;
}

for (let i = 0; i < moves.length; i++) {
    const char = moves[i];
    const [n, m] = robot;
    switch (char) {
        case "^":
            if (move([n, m], [-1, 0])) robot = [n - 1, m];
            break;
        case "v":
            if (move([n, m], [1, 0])) robot = [n + 1, m];
            break;
        case ">":
            if (move([n, m], [0, 1])) robot = [n, m + 1];
            break;
        case "<":
            if (move([n, m], [0, -1])) robot = [n, m - 1];
            break;
        default:
            break;
    }
}
console.log(map.map(v => v.join("")).join("\n"))
let sum = 0;
map.forEach((row, i) => {
    row.forEach((v, j) => {
        if (v == "O") {
            sum += 100 * i + j;
        }
    })
})
console.log(sum);