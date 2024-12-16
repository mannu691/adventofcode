const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const robots = str.split("\r\n").map((v, i) => {
    const a = v.match(/(?<=\=).?\d+/g).map(Number)
    const b = v.match(/(?<=,).?\d+/g).map(Number)
    return {
        px: a[0],
        py: b[0],
        vx: a[1],
        vy: b[1],
    }
})
const seconds = 100;
let width = 101;
let height = 103;
// width = 11
// height = 7
let xaxis = Math.floor(width / 2)
let yaxis = Math.floor(height / 2)
let q1 = 0;
let q2 = 0;
let q3 = 0;
let q4 = 0;
console.log(robots)
robots.forEach((v, i) => {
    v.px = (v.px + (v.vx * seconds)) % width;
    v.py = (v.py + (v.vy * seconds)) % height;
    if (v.px < 0) v.px += width;
    if (v.py < 0) v.py += height;

    if (v.px < xaxis && v.py < yaxis) q1++;
    else if (v.px > xaxis && v.py < yaxis) q2++;
    else if (v.px < xaxis && v.py > yaxis) q3++;
    else if (v.px > xaxis && v.py > yaxis) q4++;
})

console.log(q1 * q2 * q3 * q4)