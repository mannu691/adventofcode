import { getInput } from "../lib/aoc.mjs";
const inputs = getInput(false).split("\n");
const graph = {};

inputs.forEach(v => {
    const [a, b] = v.split("-");
    graph[a] = graph[a] || [];
    graph[b] = graph[b] || [];
    graph[a].push(b);
    graph[b].push(a);
})
function intersect(...args) {
    let final = args[0];
    for (let i = 1; i < args.length; i++) {
        let temp = [];
        args[i].forEach(v => {
            if (final.includes(v)) temp.push(v);
        })
        final = temp;

    }
    return final;
}


//HACK'd together solution , do not ask me why it works :))
let pass = new Set();
let max = 0;
Object.entries(graph).forEach(([node, cons]) => {
    let set = [];
    set.push(node)
    if (node.startsWith("t"))
        cons.forEach((v) => {
            intersect(graph[v], cons).forEach(v => set.push(v))
        })
    if (max < set.length) {
        max = set.length
        pass.clear()
        pass = new Set(set.sort())
    }
});
console.log(Array(...pass).join());