const data = input.split("\n").map(v => v.split(""))
const corners = {};
const H = data.length;
const W = data[0].length;
const tileWidth = 6;
let checked = new Set();
let grid = [];
let shouldLoop = true;
let sum = 0;
function setup() {

    createCanvas(W * tileWidth, H * tileWidth);
}


function draw() {
    background(100);
    strokeWeight(.2)
    // scale(3)
    stroke(255)
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            let char = ((data[i][j].charCodeAt(0) - 65) / 25);
            let crn = corners[[i, j].toString()]

            if (checked.has([i, j].toString())) fill(255 - char * 255, char * 255, 128 + char * 127);
            else fill(char * 255);
            rect(tileWidth * j, tileWidth * i, tileWidth, tileWidth);
            if (crn) {
                fill(255, 0, 0);
                if (crn.includes(0)) {
                    rect(tileWidth * j, tileWidth * i, 2, 2);
                }
                if (crn.includes(1)) {
                    rect(tileWidth * j + tileWidth - 2, tileWidth * i, 2, 2);
                }
                if (crn.includes(2)) {
                    rect(tileWidth * j, tileWidth * i + tileWidth - 2, 2, 2);
                }
                if (crn.includes(3)) {
                    rect(tileWidth * j + tileWidth - 2, tileWidth * i + tileWidth - 2, 2, 2);
                }
            }
            if (shouldLoop) progress(i, j)
        }
    }
}
const cornerPatterns = [
    [[-1, -1], [0, -1], [-1, 0]],//TL
    [[-1, 1], [0, 1], [-1, 0]],//TR
    [[1, -1], [0, -1], [1, 0]],//BL
    [[1, 1], [0, 1], [1, 0]],//BR        
]
const sidePatterns = [
    [[0, -1], [-1, 0], [1, 0]],//L
    [[0, 1], [-1, 0], [1, 0]],//R
    [[1, 0], [0, -1], [0, 1]],//T
    [[-1, 0], [0, -1], [0, 1]],//B

]
const inverseCornerPatterns = [
    [[-1, -1], [[-1, 0], [0, -1]]],//TL
    [[-1, 1], [[-1, 0], [0, 1]]],//TR
    [[1, -1], [[1, 0], [0, -1]]],//BL 
    [[1, 1], [[1, 0], [0, 1]]],//BR
]
function countCorner([n, m], symbol) {

    let count = 0
    if (!corners[[n, m].toString()]) corners[[n, m].toString()] = []
    if ((data[n] ?? [])[m] != symbol) sidePatterns.forEach((v, i) => {
        if (v.every(v => (data[n + v[0]] ?? [])[m + v[1]] == symbol)) {
            corners[[n, m].toString()].push((i))
            count++
        }
    })
    inverseCornerPatterns.forEach((v, i) => {
        // console.log(n, m, (data[n + v[0][0]] ?? [])[m + v[0][1]] != symbol)
        if ((data[n + v[0][0]] ?? [])[m + v[0][1]] == symbol && v[1].every(v => (data[n + v[0]] ?? [])[m + v[1]] != symbol)) {
            corners[[n, m].toString()].push(i)
            count++
        }
    })
    return count;
}
function checkRegion([n, m], plots = new Set(), edges = new Set(), rec = false) {
    if (checked.has([n, m].toString())) {
        const symbol = data[n][m];
        if ((data[n - 1] ?? [])[m] != symbol) { edges.add([n - 1, m - 1].toString()); edges.add([n - 1, m].toString()); edges.add([n - 1, m + 1].toString()) }
        if ((data[n + 1] ?? [])[m] != symbol) { edges.add([n + 1, m - 1].toString()); edges.add([n + 1, m].toString()); edges.add([n + 1, m + 1].toString()) }
        if ((data[n] ?? [])[m - 1] != symbol) { edges.add([n - 1, m - 1].toString()); edges.add([n, m - 1].toString()); edges.add([n + 1, m - 1].toString()) }
        if ((data[n] ?? [])[m + 1] != symbol) { edges.add([n - 1, m + 1].toString()); edges.add([n, m + 1].toString()); edges.add([n + 1, m + 1].toString()) }
        return 0;
    }
    plots.add([n, m].toString());
    checked.add([n, m].toString());
    const symbol = data[n][m];
    let pass = false;
    if ((data[n - 1] ?? [])[m] === symbol) checkRegion([n - 1, m], plots, edges);
    else { edges.add([n - 1, m - 1].toString()); edges.add([n - 1, m].toString()); edges.add([n - 1, m + 1].toString()) }
    if ((data[n + 1] ?? [])[m] === symbol) checkRegion([n + 1, m], plots, edges);
    else { edges.add([n + 1, m - 1].toString()); edges.add([n + 1, m].toString()); edges.add([n + 1, m + 1].toString()) }
    if ((data[n] ?? [])[m - 1] === symbol) checkRegion([n, m - 1], plots, edges);
    else { edges.add([n - 1, m - 1].toString()); edges.add([n, m - 1].toString()); edges.add([n + 1, m - 1].toString()) }
    if ((data[n] ?? [])[m + 1] === symbol) checkRegion([n, m + 1], plots, edges);
    else { edges.add([n - 1, m + 1].toString()); edges.add([n, m + 1].toString()); edges.add([n + 1, m + 1].toString()) }

    if (!rec) {
        const corners = Array.from(edges).reduce((prev, v) => prev += countCorner(v.split(",").map(Number), symbol), 0)
        return plots.size * corners;
    }
}
function progress(i, j) {
    // if (j == 80) shouldLoop = false;
    // console.log(data[7][16], countCorner([7, 16]))
    sum += checkRegion([i, j])
    // console.log(data[7][16], checkRegion([7, 16]))
    // console.log(corners)
    // shouldLoop = false
    if (i == data.length - 1 && j == data[0].length - 1) {
        shouldLoop = false;
        console.log(sum)
    }

}