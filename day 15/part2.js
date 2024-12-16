const fs = require("fs");
const debug = false;
const str = fs.readFileSync("input.txt", "utf-8");
let robot = [0, 0];
const input = str.split("\r\n\r\n");
const map = input[0].replaceAll("O", "[]").replaceAll(".", "..").replaceAll("#", "##").replace("@", "@.").split("\r\n").map((v, i) => {
    let res = v.split("")
    if (res.indexOf("@") != -1) robot = [i, res.indexOf("@")];
    return res
});
const moves = input[1].replaceAll("\n", '').split("")
function canMove([n, m], [di, dj]) {
    const char = map[n + di][m + dj];
    if (char == "#") return false;
    if (char == ']' || char == '[') {
        let move = true;
        if (dj == 0 && char == ']')
            move = canMove([n + di, m - 1], [di, dj]);
        else if (dj == 0 && char == '[')
            move = canMove([n + di, m + 1], [di, dj]);
        return move && canMove([n + di, m + dj], [di, dj]);
    }
    if (char == ".") return true;
}
function move([n, m], [di, dj], check = true) {
    const char = map[n + di][m + dj];
    if (check && !canMove([n, m], [di, dj])) return false;
    if (dj == 0) {
        if (char == ']') {
            move([n + di, m - 1], [di, dj], false);
        }
        else if (char == '[') {
            move([n + di, m + 1], [di, dj], false);
        }
    }
    if (char != ".") move([n + di, m + dj], [di, dj], false);
    map[n + di][m + dj] = map[n][m];
    map[n][m] = '.';
    return true;
}

for (let i = 0; i < moves.length; i++) {
    const char = moves[i];
    const [n, m] = robot;
    if (debug) console.log(i, char, [n, m]);
    if (debug) console.log(map.map(v => v.join("")).join("\n"))
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
if (debug) console.log(map.map(v => v.join("")).join("\n"))
let sum = 0;
map.forEach((row, i) => {
    row.forEach((v, j) => {
        if (v == "[") {
            sum += 100 * i + j;
        }
    })
})
console.log(sum);