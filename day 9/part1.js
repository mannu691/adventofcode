const fs = require("fs");

const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
let id = 0;
const data = [];
str.split("").forEach((v, i) => {
    let val = id.toString();
    if (i % 2 != 0) val = ".";
    else id++;
    for (let i = 0; i < parseInt(v); i++) {
        data.push(val);
    }
})
console.log(data)
const ans = new Array();
let i = 0;
let j = data.length - 1;
while (i <= j) {
    if (data[i] != ".") {
        ans.push(data[i]);
        i++;
    }
    else if (data[j] != ".") {
        ans.push(data[j]);
        j--;
        i++;
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