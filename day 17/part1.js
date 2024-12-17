const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const inp = str.split("\r\n\r\n");
const program = inp[1].split(":")[1].split(",").map(Number);
const registers = {};
inp[0].split("\r\n").forEach(v => {
    let res = v.split(":")
    registers[res[0][res[0].length - 1]] = Number(res[1])
})
let i = 0;
let jump = false;
let out = [];
const operations = {
    0: (literal, combo) => registers.A = Math.floor(registers.A / Math.pow(2, combo)),
    1: (literal, combo) => registers.B = registers.B ^ literal,
    2: (literal, combo) => registers.B = combo % 8,
    3: (literal, combo) => {
        if (registers.A != 0) {
            i = literal
            jump = true;
        }
    },
    4: (literal, combo) => registers.B = registers.B ^ registers.C,
    5: (literal, combo) => out.push(combo % 8),
    6: (literal, combo) => registers.B = Math.floor(registers.A / Math.pow(2, combo)),
    7: (literal, combo) => registers.C = Math.floor(registers.A / Math.pow(2, combo)),

};
console.log(program)
console.log(registers)
for (; i < program.length - 1; jump ? null : i += 2) {
    jump = false;
    let combo = 0;
    let operand = program[i + 1];
    if (operand >= 0 && operand <= 3) combo = operand;
    else if (operand == 4) combo = registers.A;
    else if (operand == 5) combo = registers.B;
    else if (operand == 6) combo = registers.C;
    operations[program[i]](operand, combo);
}

console.log(out.join(","));