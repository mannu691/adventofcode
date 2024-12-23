import { getInput } from "../../utils/js/utils.mjs";
const inputs = getInput(1,false).split("\n");
const left = []
const right = []
const frequency = {};
inputs.forEach(v => {
    const nums = v.split("  ").map(Number);
    left.push(nums[0]);
    right.push(nums[1]);
    frequency[nums[1]] = (frequency[nums[1]] + 1) || 1;
})
left.sort()
right.sort()
let sum = 0
let sim = 0;
for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
    sim += left[i] * (frequency[left[i]] ?? 0);
}
console.log("Part 1 : ", sum);
console.log("Part 2 : ", sim);