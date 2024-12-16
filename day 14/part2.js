const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const data = []
const robots = str.split("\r\n").map((v, i) => {
    const a = v.match(/(?<=\=).?\d+/g).map(Number)
    const b = v.match(/(?<=,).?\d+/g).map(Number)
    if (!data[b[0]]) data[b[0]] = []
    if (!data[b[0]][a[0]]) data[b[0]][a[0]] = 1
    else data[b[0]][a[0]] = 1;
    return {
        px: a[0],
        py: b[0],
        vx: a[1],
        vy: b[1],
    }
})
let width = 101;
let height = 103;
let seconds = width*height;
// width = 11
// height = 7
let sec = 1;

for (; sec < seconds; sec++) {
    robots.forEach((v, i) => {
        data[v.py][v.px] = 0;
        v.px = (v.px + v.vx) % width;
        v.py = (v.py + v.vy) % height;
        if (v.px < 0) v.px += width;
        if (v.py < 0) v.py += height;
        if (!data[v.py]) data[v.py] = []
        if (!data[v.py][v.px]) data[v.py][v.px] = 1
        else data[v.py][v.px] = 1;
    })
    let pass = true;
    for (let i = 0; i < height; i++) {
        pass = true
        for (let j = 45; j < 60; j++) {
            if ((data[i] ?? [])[j] != 1) { pass = false; break }
        }
        if (pass) {
            break;
        }
    }
    if (pass) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if ((data[i] ?? [])[j]) process.stdout.write("1");
                else process.stdout.write("0");
            }
            process.stdout.write("\n");
        }
        console.log("WINNNER:" + sec)
        break;
    }
}