import { getInput } from "../lib/aoc.mjs";

const input = getInput(false).split("\n\n");
const available = input[0].split(",").map((v) => v.trim())
const patterns = input[1].split("\n");

function isPossible(pat) {
    const queue = [pat];
    const memo = new Set();
    while (queue.length) {
        const val = queue.pop();
        if (val.length == 0) return true;
        if (memo.has(val)) continue;
        memo.add(val);
        for (let ava of available) {
            if (val.startsWith(ava)) {
                queue.push(val.replace(ava, ""))
            }
        }
    }
    return false;
}

let count = 0
for (let pat of patterns) {
    if (isPossible(pat)) count++;
}
console.log(count);

