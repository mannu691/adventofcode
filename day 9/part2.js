const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let id = 0;
const data = [];
str.split("").forEach((v, i) => {
    let val = id.toString();
    if (i % 2 != 0) val = ".";
    else id++;
    data.push(val.repeat(parseInt(v)));
})

const ans = new Array();
let i = 0;
let j = data.length - 1;
while (i <= j) {
    if (!data[i].includes(".")) {
        ans.push(data[i]);
        i++;
    }
    else if (!data[j].includes(".") && data[i].length >= data[j].length) {
        ans.push(data[j]);
        if (data[i].length == data[j].length) {
            i++;
        } else {
            data[i] = '.'.repeat(data[i].length - data[j].length);
        }
        j--;
    }
    else {
        j--;
    }
}
let sum = 0;
for (let k = 0; k < ans.length; k++) {
    sum += ans[k] * k
}
console.log(ans.join(""))
console.log(sum)