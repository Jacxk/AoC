const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/,/g)
    .map(a => parseInt(a));
const OUTPUT = 19690720;

function solvePart1() {
    let result = [...input];
    result[1] = 12;
    result[2] = 2;
    for (let i = 4; i < result.length; i += 4) {
        const codes = [
            result[i - 4],
            result[i - 3],
            result[i - 2],
            result[i - 1],
        ];
        if (codes[0] === 1) {
            result[codes[3]] = result[codes[1]] + result[codes[2]];
        } else if (codes[0] === 2) {
            result[codes[3]] = result[codes[1]] * result[codes[2]];
        } else break;
    }
    return result[0];
}

function solvePart2() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let result = [...input];
            result[1] = i;
            result[2] = j;
            for (let k = 4; k < result.length; k += 4) {
                const codes = [
                    result[k - 4],
                    result[k - 3],
                    result[k - 2],
                    result[k - 1],
                ];
                if (codes[0] === 1) {
                    result[codes[3]] = result[codes[1]] + result[codes[2]];
                } else if (codes[0] === 2) {
                    result[codes[3]] = result[codes[1]] * result[codes[2]];
                } else break;
            }
            if (result[0] === OUTPUT) return 100 * result[1] + result[2];
        }
    }

    return 0;
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);