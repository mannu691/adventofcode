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

let set = new Set();
Object.entries(graph).forEach(([node, cons]) => {

    if (node.startsWith("t"))
        cons.forEach((v) => {
            intersect(graph[v], cons).forEach(v2 => {

                set.add([node, v, v2].sort().toString());
            })

        })
});
console.log(set.size);