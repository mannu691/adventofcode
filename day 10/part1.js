const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = [];
const heads = [];
str.split("\r\n").forEach((v, i) => {
    data[i] = v.split("").map(Number);
    data[i].forEach((v, j) => {
        if (v == 0) heads.push([i, j])
    })
})
function checkTrail([i, j], [n, m] = [0, 0], peaks = new Set()) {
    if (data[i][j] == 9) peaks.add([i, j].toString());
    if (n != -1 && i < data.length - 1 && data[i + 1][j] - 1 == data[i][j]) checkTrail([i + 1, j], [1, 0], peaks);
    if (n != 1 && i > 0 && data[i - 1][j] - 1 == data[i][j]) checkTrail([i - 1, j], [-1, 0], peaks);
    if (m != -1 && j < data[0].length - 1 && data[i][j + 1] - 1 == data[i][j]) checkTrail([i, j + 1], [0, 1], peaks);
    if (m != 1 && j > 0 && data[i][j - 1] - 1 == data[i][j]) checkTrail([i, j - 1], [0, -1], peaks)
    return peaks;
}
let sum = 0;
for (let i = 0; i < heads.length; i++) {
    const peaks = checkTrail(heads[i])
    sum += peaks.size;
}
console.log(sum)