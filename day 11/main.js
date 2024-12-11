const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let data = str.split(" ").map((v) => parseInt(v))
let memo = {};
function blink(num, i = 25) {
    if (memo[`${num}-${i}`]) return memo[`${num}-${i}`];
    if (i == 0) { return 1; }
    i--;
    let len = 0;
    const strLen = num.toString().length;
    if (num == 0) len += blink(1, i);
    else if (strLen % 2 == 0) {
        let mul = (Math.pow(10, (strLen / 2)));
        len += blink(Math.floor(num / mul), i)
        len += blink(Math.floor(num % mul), i)
    } else {
        len += blink(num * 2024, i);
    }
    memo[`${num}-${i + 1}`] = len;
    return len;
}

let count = 0
let count2 = 0
for (let i = 0; i < data.length; i++) {
    count += blink(data[i], 25);
    count2 += blink(data[i], 75);
}

console.log(count)
console.log(count2)
