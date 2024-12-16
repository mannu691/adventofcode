const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const data = str.split("\r\n").map(v => v.split(""))
const start = [data.length - 2, 1];
const paths = []
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

let lowest = Infinity;
function checkPath([i, j], [n, m] = [0, 0], checked = new Set(), score = 0) {
    if (score >= lowest) return score;
    if (data[i][j] == "E") return score;

    checked.add([i, j].toString());
    dirs.forEach(([di, dj]) => {
        if (!checked.has([i + di, j + dj].toString()) && (data[i + di] ?? [])[j + dj] != '#') {
            let add = ((n == di) && (m == dj)) ? 1 : 1001;

            const sc = checkPath([i + di, j + dj], [di, dj], new Set(checked), score + add);
            if (sc < lowest) {
                lowest = sc;
                console.log("NEW LOW : " + lowest)
            }
        }
    });


    return lowest;
}

console.log(checkPath(start, [0, 1]))