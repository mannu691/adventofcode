const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const unitFix = 10000000000000;
const data = str.split("\r\n\r\n").map((v, i) => {
    const inp = v.split("\r\n");
    const a = inp[0].match(/(?<=\+)\d+/g).map(Number)
    const b = inp[1].match(/(?<=\+)\d+/g).map(Number)
    const prize = inp[2].match(/(?<=\=)\d+/g).map((v)=>Number(v)+unitFix)
    return {
        a: a,
        b: b,
        prize: prize,
    }
})

function solveLinearEquation([x1, y1], [x2, y2], [dx, dy]) {
    let det = x1 * y2 - x2 * y1;
    if (det == 0) return -1;
    let detx = (dx * y2 - dy * x2);
    let dety = (x1 * dy - y1 * dx);
    if (detx % det != 0 || dety % det != 0) return -1;
    return [detx / det, dety / det]
}
function winTheClawMachine({ a: [ax, ay], b: [bx, by], prize: [px, py] }) {
    const sol = solveLinearEquation([ax, ay], [bx, by], [px, py]);
    if (sol == -1) return 0;
    else return (sol[0] * 3) + sol[1];
}

let sum = 0;
for (let i = 0; i < data.length; i++) {
    const res = winTheClawMachine(data[i]);
    sum += res;
}

console.log(sum)