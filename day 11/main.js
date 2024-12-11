import { part1 } from "./part1.js";
import { part2 } from "./part2.js";
Deno.bench("part-1", part1)
Deno.bench("part-2", part2)

console.log("PART 1: ", await part1())
console.log("PART 2: ", await part2())