const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

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

if (isMainThread) {
    const workers = [];
    const chunkSize = 100000000;
    const MAX = chunkSize * 40;
    let out = runProgram(registers.A.toString(), registers.B.toString(), registers.C.toString(), program);

    for (let i = 0; i < MAX; i += chunkSize) {
        const data = [[i, i + chunkSize], program, out];
        const worker = new Worker(__filename, { workerData: data });
        workers.push(worker);
    }
    const promises = []
    workers.forEach((worker) => {
        promises.push(new Promise((resolve, reject) => {
            worker.on('message', (message) => {
                resolve(message);
            });
            worker.on('error', (error) => {
                reject(error);
            });
        }));
    });
    Promise.any(promises).then((result) => {
        console.log("yasay !: " + result)
        workers.forEach(v => v.terminate())
    });

} else {
    const chunk = workerData[0];
    const program = workerData[1]
    const out = workerData[2];
    console.log(chunk)
    for (let i = chunk[0]; i <= chunk[1]; i++) {
        let pass = true
        for (let j = 0; j < program.length; j++) {
            if (eval(`let a = ${i};${out[j]}`) != program[j]) {
                pass = false
                break;
            }
        }
        if (pass) {
            // console.log("yasay !: " + i);
            parentPort.postMessage(i);
            return;
        }
    }

}