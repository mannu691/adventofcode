import { getInput } from "../lib/aoc.mjs";

const input = getInput(false).split("\n\n");
const available = input[0].split(",").map((v) => v.trim())
const patterns = input[1].split("\n");

function allPossiblePatterns(pat) {
    const n = pat.length;
    const possbilities = Array(n + 1).fill(0);
    possbilities[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let ava of available) {
            const len = ava.length;
            if (i >= len && pat.slice(i - len, i) === ava) {
                possbilities[i] += possbilities[i - len];
            }
        }
    }
    return possbilities[n];
}

let count = 0
for (let pat of patterns) {
    count += allPossiblePatterns(pat)
}
console.log(count);

