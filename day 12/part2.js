const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = str.split("\r\n").map(v => v.split(""))
let checked = new Set();
const cornerPatterns = [
    [[-1, -1], [0, -1], [-1, 0]],//TL
    [[-1, 1], [0, 1], [-1, 0]],//TR
    [[1, -1], [0, -1], [1, 0]],//BL
    [[1, 1], [0, 1], [1, 0]],//BR        
]
const inverseCornerPatterns = [
    [[-1, -1], [[-1, 0], [0, -1]]],//TL
    [[-1, 1], [[-1, 0], [0, 1]]],//TR
    [[1, -1], [[1, 0], [0, -1]]],//BL 
    [[1, 1], [[1, 0], [0, 1]]],//BR
]
function countCorner([n, m]) {
    const symbol = data[n][m];
    let count = 0
    cornerPatterns.forEach(v => {
        if (v.every(v => (data[n + v[0]] ?? [])[m + v[1]] != symbol)) count++
    })
    inverseCornerPatterns.forEach(v => {
        if ((data[n + v[0][0]] ?? [])[m + v[0][1]] != symbol && v[1].every(v => (data[n + v[0]] ?? [])[m + v[1]] == symbol)) count++
    })
    return count;
}
function checkRegion([n, m], plots = new Set(), edges = [], rec = false) {
    if (checked.has([n, m].toString())) return 0;
    plots.add([n, m].toString());
    checked.add([n, m].toString());
    const symbol = data[n][m];
    let pass = false;
    if ((data[n - 1] ?? [])[m] === symbol) checkRegion([n - 1, m], plots, edges);
    else edges.push([n - 1, m])
    if ((data[n + 1] ?? [])[m] === symbol) checkRegion([n + 1, m], plots, edges);
    else edges.push([n + 1, m])
    if ((data[n] ?? [])[m - 1] === symbol) checkRegion([n, m - 1], plots, edges);
    else edges.push([n, m - 1])
    if ((data[n] ?? [])[m + 1] === symbol) checkRegion([n, m + 1], plots, edges);
    else edges.push([n, m + 1])

    if (!rec) {

        const corners = edges.reduce((prev, v) => prev += countCorner(v,symbol), 0)
        console.log(corners)
        return plots.size * corners;
    }
}


let sum = 0
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {

        const num = checkRegion([i, j]);
        if (num == 0) continue;
        sum += num;
        // break
    }
    // break
}
console.log(sum)
