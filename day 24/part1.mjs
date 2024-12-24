import { getInput } from "../utils/js/utils.mjs";
const inputs = getInput(24, false).split("\n\n");
const wires = {};
const operations = inputs[1].split("\n").map(v => v.replace("-> ", "").split(" "));

inputs[0].split("\n").forEach(v => {
    const [a, b] = v.split(":")
    wires[a] = parseInt(b);
})


const execute = ([a, opt, b, out]) => {
    if (wires[a] == undefined || wires[b] == undefined) return false;
    switch (opt) {
        case "AND":
            wires[out] = wires[a] & wires[b];
            break;
        case "OR":
            wires[out] = wires[a] | wires[b];
            break;
        case "XOR":
            wires[out] = wires[a] ^ wires[b];
            break;
        default:
            break;
    }
    return true;
}

let i = 0;
while (operations.length) {
    if (i >= operations.length) i = 0;
    if (execute(operations[i])) {
        operations.splice(i, 1);
    } else {
        i++;
    }
}
const binary = Object.entries(wires).filter(([k, v]) => k.startsWith("z")).sort().reverse().reduce((str,[k,v])=>str+=v.toString(),"");
console.log(parseInt(binary,2));