const fs = require("fs");
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();

let id = 0;
let diskMap = [];
str.split("").forEach((v, i) => {
    if (i % 2 != 0) {
        diskMap.push(...'.'.repeat(v).split(""));
    }
    else {
        for (let i = 0; i < parseInt(v); i++) {
            diskMap.push(id.toString());
        }
        id++;
    }
})
let j = diskMap.length - 1;
let prev = j;
let count = 0;
while (j > 0) {
    if (diskMap[j] == '.') { j--; continue; };
    if (diskMap[j] != diskMap[prev] && count != 0) {
        let spaceCount = 0;
        for (let i = 0; i < prev; i++) {
            if (diskMap[i] == ".") spaceCount++;
            else spaceCount = 0;
            if (spaceCount == count) {
                for (let k = i; k > i - count; k--) {
                    diskMap[k] = diskMap[prev];
                }

                for (let k = prev; k < prev + count; k++) {
                    diskMap[k] = ".";
                }
                break;
            }
        }
        count = 1;
    }
    else {
        count++;
    }
    prev = j;
    j--;
}
let sum = 0;
for (let i = 0; i < diskMap.length; i++) {
    if (diskMap[i] == '.') continue;
    sum += parseInt(diskMap[i]) * i;
}
console.log(sum)