// Refactored and Commented by ChatGPT, for public interest
const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("input.txt", "utf-8");

// Define patterns for matching
const multiplyPattern = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const doPattern = /do\(\)/g;
const dontPattern = /don't\(\)/g;

let totalSum = 0;

// Find matches and indices
const multiplyMatches = [...inputFile.matchAll(multiplyPattern)];
let doIndices = [...inputFile.matchAll(doPattern)].map(match => match.index).concat(0).sort((a, b) => b - a);
let dontIndices = [...inputFile.matchAll(dontPattern)].map(match => match.index).sort((a, b) => b - a);

// Process matches
multiplyMatches.forEach(match => {
    const currentIndex = match.index;
    const nearestDoIndex = doIndices.find(index => index <= currentIndex) ?? 0;
    const nearestDontIndex = dontIndices.find(index => index <= currentIndex) ?? 0;

    if (nearestDoIndex >= nearestDontIndex) {
        const numbers = match[0]
            .split("(")[1]
            .replace(")", "")
            .split(",")
            .map(Number);

        totalSum += numbers.reduce((product, num) => product * num, 1);
    }
});

// Output result
console.log(totalSum);
