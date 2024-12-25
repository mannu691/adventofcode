import { getInput } from "../utils/js/utils.mjs";
const inputs = getInput(25, false).split("\n\n");
const keys = [];
const locks = [];

inputs.forEach(v => {
    const grid = v.split("\n");
    let heights = [];
    for (let i = 1; i < grid.length - 1; i++) {
        grid[i].split("").forEach((v, i) => {
            heights[i] = (heights[i] || 0)
            if (v == "#") heights[i]++;
        })
    }
    if (grid[0][0] == "#") locks.push(heights);
    else keys.push(heights)
})
let count = 0;
locks.forEach(lock => {
    keys.forEach(key => {
        if (key.every((v, i) => (5 - v) >= lock[i])) count++;
    })
})
console.log(count)


