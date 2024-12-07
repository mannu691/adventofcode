const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("input.txt", "utf-8");
const str = inputFile.toString();
const data = new Map()
str.split("\r\n").forEach((v) => {
    let val = v.split(":");
    data.set(val[0], val[1].trim().split(" ").map(Number));
})

function isPossbile(terms, ans) {
    const target = parseInt(ans);
    function evaluate(index, currentValue) {
        if (index === terms.length) {
            return currentValue === target;
        }
        const nextValue = terms[index];
        return (
            evaluate(index + 1, currentValue + nextValue) ||
            evaluate(index + 1, currentValue * nextValue)
            ||
            evaluate(index + 1, parseInt(`${currentValue}${nextValue}`))
        );
    }
    return evaluate(1, terms[0]);
}



if (isMainThread) {
    const workers = [];
    const chunkSize = 100;
    for (let i = 0; i < data.size; i += chunkSize) {
        const chunk = Array.from(data.entries()).slice(i, i + chunkSize);
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
        let sum = results.reduce((acc, curr) => acc + curr, 0);
        console.log(sum);
    });

} else {
    const chunk = workerData;
    let sum = 0;
    for (const [key, value] of chunk) {
        if (isPossbile(value, key)) sum += parseInt(key);
    }
    console.log(`Batch Sum : ${sum}`)
    parentPort.postMessage(sum);
}