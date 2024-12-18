import fs from "fs"
import { Matrix } from "./utils.mjs";

export const getInput = (test = false) => {
    if (test) return fs.readFileSync("test.txt", "utf-8").replaceAll("\r\n", "\n");
    else return fs.readFileSync("input.txt", "utf-8").replaceAll("\r\n", "\n");
}

export const getInputMatrix = (test = false) => {
    return new Matrix(getInput(test).split("\n").map(v => v.split("")))
}

