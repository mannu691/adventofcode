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
        0: (literal, combo) => a = `(Math.floor(${a} / Math.pow(2, ${combo})))`,
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
        6: (literal, combo) => b = `(Math.floor(${a} / Math.pow(2,${combo})))`,
        7: (literal, combo) => c = `(Math.floor(${a} / Math.pow(2,${combo})))`,
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

// console.log(program)
// console.log(registers)
// let max = 128 * Math.pow(8, 15)
// console.log(max)
let out = runProgram(registers.A.toString(), registers.B.toString(), registers.C.toString(), program);

// function find(i = 0, pow = 15) {
//     const max = i + 128 * Math.pow(8, pow);
//     if (pow == 1) {
//         for (; i <= max; i++) {
//             for (let j = 0; j < program.length; j++) {
//                 if (eval(`let a = ${i};${out[j]}`) != program[j]) {
//                     return false;
//                 }
//             }
//         }
//     }
//     else {
//         const incr = 128 * Math.pow(8, pow - 1);
//         for (let i = 0; i <= max; i += incr) {
//             // console.log(i)
//             find(i, pow - 1);
//         }
//     }
// }

function find(offset = 0, pow = 1) {
    const incr = pow == 1 ? 1 : 128 * Math.pow(8, pow - 1);
    // console.log(incr)
    const max = offset + 128 * Math.pow(8, pow);
    let i = offset;
    for (; i <= max; i += incr) {
        if (eval(`let a = ${i};${out[pow - 1]}`) == program[pow - 1]) {
            return i;
        }
    }
    return -1;
}
let offset = 0
for (let i = 1; i <= 15; i++) {
    offset = find(offset, i);
    console.log(offset);
}
console.log(find(230, 3))
return;
// for (let k = 0; k < array.length; k++) {
//     const element = array[k];

// }

// find()
// return;
// console.log(out)



// out.forEach((v, i) => {
//     console.log(`(${v}==${program[i]})&&`)

// })
// console.log("Bruceforcing Calculations!")
for (let a = 8; a < 160; a++) {
    // console.log((a % 8) ^ 1)
    console.log(a, a % 8, eval(`let a=${a};${out[1]}`))

}
console.log(out[1])
return
// return;
let count = 0
const stream = fs.createWriteStream('someFile.txt', { flags: 'w' });
for (let a = 0; a < 999999; a++) {
    // let pass = true
    // let pass = true
    // if ((((((a % 8) ^ 1) ^ 5) ^ (Math.floor(a / Math.pow(2, ((a % 8) ^ 1))))) % 8) == program[0]) {
    // console.log(a);
    // process.stdout.write(count + ",")
    // count++;
    // stream.write(eval(`let a = ${a};${out[2]}`) + ",")
    if (eval(`let a = ${a};${out[1]}`) != program[1]) {
        console.log(out[1])
        console.log(a)
        break;
    }
    // stream.write((((((a % 8) ^ 1) ^ 5) ^ (Math.floor(a / Math.pow(2, ((a % 8) ^ 1))))) % 8) + ",")
    // }
    // for (let j = 0; j < program.length; j++) {
    //     if (eval(`let a = ${i};${out[j]}`) != program[j]) {
    //         pass = false
    //         break;
    //     }
    // }
    // if (pass) {
    //     console.log("yasay !:" + i);
    //     break;
    // }
}







// console.log(out.join(","))

// (((((a % 8) ^ 1) ^ 5) ^ (Math.floor(a / Math.pow(2,((a % 8) ^ 1))))) % 8) = 2