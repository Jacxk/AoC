/*
    Day 2: 1202 Program Alarm
    https://adventofcode.com/2019/day/2

    This file contains the first code I that came through my mind.
    There are better ways to do it, and I know some but if this
    is what I used to get the answer, then this is what I'll stick to.
 */

const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/,/g)
    .map(a => parseInt(a));
// This is the value we need to compare to in part 2
const OUTPUT = 19690720;

function solvePart1() {
    // Copy the array of inputs because we dont want to modify it
    let result = [...input];
    // Set position 1 = 12 and 2 = 2 (those were the directions)
    result[1] = 12;
    result[2] = 2;
    // Create a loop that starts at 4 and jumps 4 values
    for (let i = 4; i < result.length; i += 4) {
        const codes = [
            // Get the first entry code
            result[i - 4],
            // Get the second entry code
            result[i - 3],
            // Get the third entry code
            result[i - 2],
            // Get the fourth entry code
            result[i - 1],
        ];

        // Check if the first code is one of the instructional opcode
        if (codes[0] === 1) {
            // Since it's 1, add the second and third together, but
            // because they are pointers to values, we get the value
            // from the codes, so we can go to to that location in the
            // input array, and add them. Lastly we get the fourth code
            // and since the value is a pointer/location, we use it on
            // the input array to get the value, and set the result.
            result[codes[3]] = result[codes[1]] + result[codes[2]];
        } else if (codes[0] === 2) {
            // Same as above, but instead of add we multiply
            result[codes[3]] = result[codes[1]] * result[codes[2]];
        } else break;
    }
    return result[0];
}

function solvePart2() {
    // Here we need to check for nouns (position 1) and verbs (position 2)
    // when the result at position 0 is OUTPUT. We need to check from 0 to 99
    // (inclusive) on each noun and verb and stop when position 0 is OUTPUT.

    // Create a nested loop that goes from 0 to 99 (inclusive), but I used 100
    // because the condition i < 100 runs until i is 99
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            // Copy the array of inputs because we dont want to modify it
            // and we need a new one on every iteration.
            let result = [...input];
            // Set position 1 = i and 2 = j
            result[1] = i;
            result[2] = j;
            // Same as part 1
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
            // Check if position 0 is equals to OUTPUT then return
            // 100 * position 1 + position 2 which is the answer
            // else we continue with the loop.
            if (result[0] === OUTPUT) return 100 * result[1] + result[2];
        }
    }

    // Return 0 if the program fails.
    return 0;
}

// Display solutions
console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);