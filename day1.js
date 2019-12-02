const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/);

function solvePart1() {
    const answer = input
        .map(value => Math.floor(value / 3) - 2)
        .reduce((a, b) => a + b);
    return answer.toString();
}

function solvePart2() {
    function findAnswer(number) {
        const res = Math.floor(number / 3) - 2;
        if (res < 1) return 0;
        else return res + findAnswer(res);
    }

    const answer = input
        .map(findAnswer)
        .reduce((a, b) => a + b);
    return answer.toString();
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);