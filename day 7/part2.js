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
    let pass = true;
    do {
        const map = {};
        let correct = true;
        for (let i = pages.length - 1; i >= 0; i--) {
            Object.entries(map).forEach((val) => {
                let ind = val[1].indexOf(pages[i])
                if (ind != -1) {
                    correct = false;
                    let tmp = pages[i];
                    pages[pages.indexOf(val[0])] = tmp;
                    pages[i] = val[0];
                };
            })
            if (!correct) break;
            if (!map[pages[i]] && order[pages[i]]) {
                map[pages[i]] = order[pages[i]];
            }
        }
        if (pass && correct) return;
        pass = correct;
    } while (!pass)
    sum += parseInt(pages[Math.floor(pages.length / 2)])

});
console.log(sum);