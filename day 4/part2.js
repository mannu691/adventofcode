// Refactored and Commented by ChatGPT, for public interest
const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let count = 0;

function searchXMAS(lines, lineIndex, index, lineStep, indexStep) {
    let i = 0;
    let pass = false;
    let ind1 = (lineIndex - lineStep)
    while (i < 2 && (lineIndex - lineStep) >= 0 && (index - indexStep) >= 0 && (lineIndex - lineStep) < lines.length && (index - indexStep) < lines[0].length) {
        let line = lines[lineIndex - lineStep];
        let char = line[index - indexStep];
        pass = (i == 0 && char == "M") || (i == 1 && char == "S");
        if (!pass) return false;
        lineStep *= -1;
        indexStep *= -1;
        i++;
    }
    return i == 2 ? pass : false;

}

const lines = str.split("\n");
const steps = [
    [1, -1],
    [-1, 1],
]

const steps2 = [
    [1, 1],
    [-1, -1],
]

for (let l = 0; l < lines.length; l++) {
    for (let c = 0; c < lines[0].length; c++) {
        if (lines[l][c] != "A") continue;

        let valid = steps.reduce((p, v) => p || searchXMAS(lines, l, c, v[0], v[1]), false) && steps2.reduce((p, v) => p || searchXMAS(lines, l, c, v[0], v[1]), false)
        if (valid) count++

    }
}

console.log(count);

