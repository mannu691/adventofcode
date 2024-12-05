// Refactored and Commented by ChatGPT, for public interest
const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = str.split("\r\n")
const order = {}
let sum = 0;
data.slice(0, data.indexOf("")).forEach((v) => {
    const s = v.split("|");
    if (!order[s[0]]) order[s[0]] = [s[1]];
    else order[s[0]].push(s[1])
});
data.slice(data.indexOf("") + 1, data.length).forEach((v) => {
    const pages = v.split(",");
    const arr = [];
    for (let i = pages.length - 1; i >= 0; i--) {
        if (arr.includes(pages[i])) return;
        arr.push(...(order[pages[i]] ?? []));
    }

    sum += parseInt(pages[Math.floor(pages.length / 2)])
});
console.log(sum);