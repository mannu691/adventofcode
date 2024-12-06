const fs = require("fs");
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let data = str.split("\r\n").map(row => row.split(""));
let guard = [];
let look = '';
const dirs = { "^": [-1, 0], ">": [0, 1], "v": [1, 0], "<": [0, -1] };
const dirKeys = Object.keys(dirs);

data.forEach((row, i) => {
    dirKeys.forEach((key) => {
        let ind = row.indexOf(key);
        if (ind !== -1) {
            guard = [i, ind];
            look = key;
        }
    });
});


let count = 0;

while (true) {
    let dir = dirs[look];
    let cur = [guard[0] + dir[0], guard[1] + dir[1]];
    let ahead = (data[cur[0]] ?? [])[cur[1]];

    if (!ahead) { // Out of bounds
        data[guard[0]][guard[1]] = "X";
        break;
    } else if (ahead === "#") { // Turn right
        let dirInd = (dirKeys.indexOf(look) + 1) % 4;
        look = dirKeys[dirInd];
        dir = dirs[look];
        cur = [guard[0] + dir[0], guard[1] + dir[1]];
    }
    data[guard[0]][guard[1]] = "X";
    guard = cur;
    data[guard[0]][guard[1]] = look;
}
count = data.flat().filter((cell) => cell === "X").length;
console.log(count);
