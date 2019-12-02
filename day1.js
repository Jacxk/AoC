/*
    Day 1: The Tyranny of the Rocket Equation
    https://adventofcode.com/2019/day/1

    This file contains the first code I that came through my mind.
    There are better ways to do it, and I know some but if this
    is what I used to get the answer, then this is what I'll stick to.
 */

const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/);

function solvePart1() {
    const answer = input
        // Set every value by dividing by 3 and subtracting 2
        .map(value => Math.floor(value / 3) - 2)
        // Adds every value that was mapped
        .reduce((a, b) => a + b);
    return answer.toString();
}

function solvePart2() {
    // Create a recursive function to get the (value / 3 - 2)
    function findAnswer(number) {
        const res = Math.floor(number / 3) - 2;
        // If the result of the division and subtraction is 0
        // or lower, we return 0.
        if (res < 1) return 0;
        // Return res + the result of the function recursively
        // and it'll give us res + res(of res) + ...
        else return res + findAnswer(res);
    }

    const answer = input
        // Set all the values to the value returned by the
        // recursive function
        .map(findAnswer)
        // Adds every value that was mapped.
        .reduce((a, b) => a + b);
    return answer.toString();
}

// Display solutions
console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);