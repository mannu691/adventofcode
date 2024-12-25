const inputs = input.split("\n\n");
const operations = []
const wires = new Set();

inputs[0].split("\n").forEach(v => {
    wires.add(v.split(":")[0]);
})

inputs[1].split("\n").forEach(v => {
    const [a, opt, b, out] = v.replace("-> ", "").split(" ")
    operations.push([a, b, opt, out]);
    wires.add(a)
    wires.add(b)
    wires.add(out)
});
var cy = cytoscape({
    container: document.getElementById('cy') // container to render in
});
const elements = [];
let xw = 0;
let zw = 0;
let rw = -8000;

wires.forEach((k) => {
    if (k.startsWith("x") || k.startsWith("y")) {
        elements.push({ data: { id: k }, classes: ['xy-node'], })
    }
    else if (k.startsWith("z")) {
        elements.push({ data: { id: k }, classes: ['z-node'], })
    }
    else {
        elements.push({ data: { id: k } })
    }
})

let bw = 0;
operations.forEach(v => {
    const [a, b, opt, out] = v;
    const key = `${a}-${opt}-${b}`;
    let classes = ['opt-node'];
    if (opt == "XOR") classes = ['xor-node'];
    elements.push({ data: { id: key }, classes: classes })
    elements.push({ data: { id: `${a}>${key}`, source: a, target: key } })
    elements.push({ data: { id: `${b}>${key}`, source: b, target: key } })
    elements.push({ data: { id: `${key}>${out}`, source: key, target: out } })
    bw += 200;
})
cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: elements,
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },
        {
            selector: '.xy-node',
            style: {
                'background-color': 'red'
            }
        },
        {
            selector: '.z-node',
            style: {
                'background-color': 'blue'
            }
        },
        {
            selector: '.opt-node',
            style: {
                'background-color': 'green'
            }
        },
        {
            selector: '.xor-node',
            style: {
                'background-color': 'cyan'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ],

    layout: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 2,

    }
});