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


function runProgram(a = 0, b = 0, c = 0, program = []) {
    let i = 0;
    let jump = false;
    let out = [];

    const operations = {
        0: (literal, combo) => a = Math.floor(a / Math.pow(2, combo)),
        1: (literal, combo) => b = b ^ literal,
        2: (literal, combo) => b = combo % 8,
        3: (literal, combo) => {
            if (a != 0) {
                i = literal
                jump = true;
            }
        },
        4: (literal, combo) => b = b ^ c,
        5: (literal, combo) => out.push(combo % 8),
        6: (literal, combo) => b = Math.floor(a / Math.pow(2, combo)),
        7: (literal, combo) => c = Math.floor(a / Math.pow(2, combo)),
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
    const chunkSize = 100000000000;
    const MAX = chunkSize;
    for (let i = 0; i < MAX; i += chunkSize) {
        const chunk = [i, i + chunkSize];
        const worker = new Worker(__filename, { workerData: chunk });
        workers.push(worker);
    }
    const promises = workers.map((worker) => {
        return new Promise((resolve, reject) => {
            worker.on('message', (message) => {
                resolve(message);
            });
            worker.on('error', (error) => {
                reject(error);
            });
        });
    });
    Promise.all(promises).then((results) => {
        // console.log("Finished with : " + results.filter(v => v != -1))
    });

} else {
    const chunk = workerData;
    for (let a = chunk[0]; a <= chunk[1]; a++) {
        // let out = runProgram(i, registers.b, registers.c, program);
        // console.log(i)
        if (((((((a % 8) ^ 1) ^ 5) ^ (Math.floor(a / Math.pow(2,((a % 8) ^ 1))))) % 8)==2)&&
        (((((((Math.floor(a / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2,(((Math.floor(a / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==4)&&
        (((((((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==1)&&
        (((((((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==1)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==7)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==5)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==1)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==5)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==4)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==3)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==0)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==3)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==5)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==5)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==3)&&
        (((((((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1) ^ 5) ^ (Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2,(((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor((Math.floor(a / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) / Math.pow(2, 3))) % 8) ^ 1))))) % 8)==0)) {
            console.log("A : " + a);
            parentPort.postMessage(a);
            return;
        }
    }
    console.log(chunk)
    // parentPort.postMessage(-1);
}