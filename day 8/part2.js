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
            let mul = 1;
            let d1 = [(x - x2) + x, (y - y2) + y];
            let d2 = [(x2 - x) + x2, (y2 - y) + y2]

            while (d1[0] >= 0 && d1[0] < data.length && d1[1] >= 0 && d1[1] < data[0].length) {
                antiNodes.add(d1.toString())
                mul++;
                d1 = [(x - x2) * mul + x, (y - y2) * mul + y];
            }
            mul = 1
            while (d2[0] >= 0 && d2[0] < data.length && d2[1] >= 0 && d2[1] < data[0].length) {
                antiNodes.add(d2.toString())
                mul++;
                d2 = [(x2 - x) * mul + x2, (y2 - y) * mul + y2]
            }
            antiNodes.add([x, y].toString())
            antiNodes.add([x2, y2].toString())
        }
    }
}
antiNodes.forEach((v) => {
    const [x, y] = v.split(",").map(Number);
    data[x][y] = "#"

})

console.log(antiNodes.size);
//Most shit solution of the year goes to me