const fs = require("fs");

const str = fs.readFileSync("input.txt", "utf-8");
const inp = str.split("\r\n\r\n");
const programString = inp[1].split(":")[1].trim()
const program = programString.split(",").map(Number);
const registers = {};
inp[0].split("\r\n").forEach(v => {
    let res = v.split(":")
    registers[res[0][res[0].length - 1]] = Number(res[1])
})

function runProgram(a = '0', b = '0', c = '0', program = []) {
    a = 'a'
    let i = 0;
    let jump = false;
    let out = [];
    let f = 0;
    const operations = {
        0: (literal, combo) => a = `(uint64_t)(${a} / pow(2, ${combo}))`,
        1: (literal, combo) => b = `(${b} ^ ${literal})`,
        2: (literal, combo) => b = `(${combo} % 8)`,
        3: (literal, combo) => {
            if (out.length == program.length) {
                return
            }
            i = literal
            jump = true;
        },
        4: (literal, combo) => b = `(${b} ^ ${c})`,
        5: (literal, combo) => out.push(`(${combo} % 8)`),
        6: (literal, combo) => b = `(uint64_t)(${a} / pow(2,${combo}))`,
        7: (literal, combo) => c = `(uint64_t)(${a} / pow(2,${combo}))`,
    };

    for (; i < program.length - 1; jump ? null : i += 2) {
        jump = false;
        let combo = 0;
        let operand = program[i + 1];
        if (operand >= 0 && operand <= 3) combo = operand;
        else if (operand == 4) combo = a;
        else if (operand == 5) combo = b;
        else if (operand == 6) combo = c;
        operations[program[i]](operand, combo);
    }
    return out;
}

console.log(program)
console.log(registers)

let out = runProgram(registers.A.toString(), registers.B.toString(), registers.C.toString(), program);

out.forEach((v, i) => {
    console.log(`(${v}==${program[i]})&&`)

})
// console.log("Bruceforcing Calculations!")


// for (let i = 0; i < 10000000000; i++) {
//     let pass = true
//     if (eval(`let a = ${i};${out[0]}`) == program[0]) {
//         console
//             .log(i);
//     }
//     // for (let j = 0; j < program.length; j++) {
//     //     if (eval(`let a = ${i};${out[j]}`) != program[j]) {
//     //         pass = false
//     //         break;
//     //     }
//     // }
//     // if (pass) {
//     //     console.log("yasay !:" + i);
//     //     break;
//     // }
// }
// //






// // console.log(out.join(","))

// 2 == (((((a % 8) ^ 1) ^ 5) ^ (Math.floor(a / Math.pow(2, ((a % 8) ^ 1))))) % 8);
// (((a % 8) ^ 1) ^ 5) == (8n + 2) ^ floor(a / pow(2, ((a % 8) ^ 1)))


// a % 8 ^ 1=x