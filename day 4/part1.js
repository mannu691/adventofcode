// Refactored and Commented by ChatGPT, for public interest
const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let count = 0;

function searchXMAS(lines, lineIndex, index, lineStep, indexStep) {
    let i = 0;
    let pass = false;
    while (i < 4 && lineIndex >= 0 && index >= 0 && lineIndex < lines.length && index < lines[0].length) {
        let line = lines[lineIndex];
        let char = line[index];
        pass = (i == 0 && char == "X") || (i == 1 && char == "M") || (i == 2 && char == "A") || (i == 3 && char == "S");
        if (!pass) return false;
        lineIndex += lineStep;
        index += indexStep;
        i++;
    }

    return i == 4 ? pass : false;

}

const lines = str.split("\n");
const steps = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
]

for (let l = 0; l < lines.length; l++) {
    for (let c = 0; c < lines[0].length; c++) {
        steps.forEach((v) => {
            if (searchXMAS(lines, l, c, v[0], v[1])) count++;
        })
    }
}

console.log(count);

