const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = [];
str.split("\r\n").forEach((v, i) => {
    data[i] = v.split("")
})
let checked = new Set();
function checkRegion([n, m], plots = new Set(), edges = []) {
    if (checked.has([n, m].toString())) return 0;
    plots.add([n, m].toString());
    checked.add([n, m].toString());
    const symbol = data[n][m];
    if ((data[n - 1] ?? [])[m] === symbol) checkRegion([n - 1, m], plots, edges);
    else edges.push([n - 1, m].toString())
    if ((data[n + 1] ?? [])[m] === symbol) checkRegion([n + 1, m], plots, edges);
    else edges.push([n + 1, m].toString())
    if ((data[n] ?? [])[m - 1] === symbol) checkRegion([n, m - 1], plots, edges);
    else edges.push([n, m - 1].toString())
    if ((data[n] ?? [])[m + 1] === symbol) checkRegion([n, m + 1], plots, edges);
    else edges.push([n, m + 1].toString())
    // console.log(plots);
    // console.log(edges);
    return plots.size * edges.length;
}
let sum = 0
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        const num = checkRegion([i, j]);
        if (num == 0) continue;
        // console.log(data[i][j], num);
        sum += num;
    }
}
console.log(sum)
