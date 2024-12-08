const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = str.split("\r\n").map((v) => v.split(""));

const antiNodes = new Set();
const antennas = {};

for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
        const char = row[j];
        if (char != ".") {
            if (!antennas[char]) antennas[char] = [];
            antennas[char].push([i, j]);
        }
    }
}
for (const antenna in antennas) {
    const coords = antennas[antenna];
    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            const [x, y] = coords[i];
            const [x2, y2] = coords[j];
            const d1 = [(x - x2) + x, (y - y2) + y];
            const d2 = [(x2 - x) + x2, (y2 - y) + y2]
            if (d1[0] >= 0 && d1[0] < data.length && d1[1] >= 0 && d1[1] < data[0].length) {
                antiNodes.add(d1.toString())
            }
            if (d2[0] >= 0 && d2[0] < data.length && d2[1] >= 0 && d2[1] < data[0].length) {
                antiNodes.add(d2.toString())
            }

        }
    }
}
console.log(antiNodes.size);
