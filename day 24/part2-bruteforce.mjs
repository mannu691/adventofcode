/**
 * This is just some helpfull output for part 2,
 * actual solution was done manually lol
 * 
 * with the help of this post : https://www.reddit.com/r/adventofcode/comments/1hlu4ht/2024_day_24_solutions/
 
 */

import { getInput } from "../utils/js/utils.mjs";
const inputs = getInput(24, false).split("\n\n");
const operations = []
const wires = {};
let x = "";
let y = "";
let z = [];

inputs[0].split("\n").forEach(v => {
    const [a, b] = v.split(":")
    wires[a] = parseInt(b);
    if (a.startsWith("x")) x += b.trim()
    else if (a.startsWith("y")) y += b.trim()
})
inputs[1].split("\n").forEach(v => {
    const [a, opt, b, out] = v.replace("-> ", "").split(" ")
    operations.push([a, b, opt, out]);
});

const ans = (parseInt(x.split("").reverse().join(""), 2)+parseInt(y.split("").reverse().join(""), 2)).toString(2).split("").map(Number).reverse()

const execute = ([a, b, opt, out]) => {
    if (wires[a] == undefined || wires[b] == undefined) return false;
    switch (opt) {
        case "AND":
            wires[out] = wires[a] & wires[b];
            break;
        case "OR":
            wires[out] = wires[a] | wires[b];
            break;
        case "XOR":
            wires[out] = wires[a] ^ wires[b];
            break;
        default:
            break;
    }
    if (out.startsWith("z")) z[parseInt(out.slice(1))] = wires[out];

    let line = `${a}(${wires[a]}) ${opt} ${b}(${wires[b]}) --> ${out}(${wires[out]}) `;

    if (out.startsWith("z")) line += `: ${ans[parseInt(z.slice(1))]}`;
    if (a.startsWith("x") || b.startsWith("x") || a.startsWith("y") || b.startsWith("y")) line = "[ " + line + " ]";
    console.log(line)
    return true;
}
const calculate = () => {
    const count = operations.length;
    let i = 0;
    let finished = [];
    while (count > finished.length) {
        if (i >= count) i = 0;
        if (!finished.includes(i) && execute(operations[i])) {
            finished.push(i);
        }
        i++;
    }
}
calculate();
let sus = [];
for (const opt of operations) {
    const [a, b, op, out] = opt;
    if (out.startsWith("z")) {
        if (op != "XOR") sus.push(opt);
    } else {
        if (!a.startsWith("x") && !a.startsWith("y")) {
            if (op == "XOR") sus.push(opt)
        }
    }
}

console.log(sus)
// console.log(susMap)
console.log(parseInt(z.reverse().join(""), 2),z.reverse().join(""))
console.log(parseInt(ans.reverse().join(""), 2),ans.reverse().join(""))
console.log((parseInt(ans.reverse().join(""), 2) ^ parseInt(z.reverse().join(""), 2)).toString(2))
