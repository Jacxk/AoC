/*
    Day 4: Secure Container
    https://adventofcode.com/2019/day/4

    This file contains the first code I that came through my mind.
    There are better ways to do it, and I know some but if this
    is what I used to get the answer, then this is what I'll stick to.
 */

const fs = require("fs");
const [from, to] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/-/)
    .map(i => parseInt(i));

function solvePart1() {
    // Since we need the number of passwords we create a variable to store
    // the number of passwords satisfying the condition to return it later.
    let passwords = 0;

    // Make a for loop starting from the part one of the range and ending
    // on the last part of the range of passwords.
    for (let i = from; i <= to; i++) {
        // Check if the current number is in ascending order and has
        // at least one pair of the same number, then add 1 to passwords.
        if (isAscending(i) && hasDouble(i)) passwords++;
    }

    // Check if number is in ascending order
    function isAscending(number) {
        // Split each number from provided number.
        const numbers = String(number).split("");

        // Loop through all the numbers and start counting from 1
        // because if we do `i - 1` ir gives us the first entry
        // and `i` the second and that way we wont get an entry
        // greater than N - 1 (N = array length).
        for (let i = 1; i < numbers.length; i++) {
            // Check if the first entry is greater than the second
            if (numbers[i - 1] > numbers[i]) return false;
        }
        // Returns true if no issues from loop found
        return true;
    }

    // Check if number has at least one pair of same number (ex: 12234)
    function hasDouble(number) {
        // Split each number from provided number.
        const numbers = String(number).split("");

        // Same loop as before. (Check isAscending())
        for (let i = 1; i < numbers.length; i++) {
            // If first entry and second are equals, return true
            // because we found it and we dont need to keep going.
            if (numbers[i - 1] === numbers[i]) return true;
        }

        // If no pair found, return false.
        return false;
    }

    // Return the amount of passwords found satisfying the condition
    return passwords;
}

function solvePart2() {
    let passwords = 0;

    // Same as part 1 - line: 21
    for (let i = from; i <= to; i++) {
        // This time we have to check if there are two groups
        // with at lest one have 2 of the same number
        if (isAscending(i) && isDoubleGroup(i)) passwords++;
    }

    // Same as part 1 - line: 29
    function isAscending(number) {
        const numbers = String(number).split("").map(i => parseInt(i));
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i - 1] > numbers[i]) return false;
        }
        return true;
    }

    // Check if there are at lest two groups with one having 2 of the same number
    function isDoubleGroup(number) {
        // Split each number from provided number.
        const numbers = String(number).split("").map(i => parseInt(i));

        // Create a variable to store the number used on last iteration.
        let numberBefore = -1;
        // Create an object to store how many times the number appears
        let double = {};
        // Loop through all the numbers
        for (let i = 0; i < numbers.length; i++) {
            // Check if current number and the one after are the same number
            const isNumberEquals = numbers[i] === numbers[i + 1];

            // If the current number is not found on the variable set the variable
            // equals to the object with key as the number and value as 1.
            if (!double[numbers[i]]) double = {[numbers[i]]: 1};
            // If it's found we add 1 to the value.
            else double[numbers[i]]++;

            // Check if the number before is equals to the number now.
            // Check if the number now is not equals to the number after.
            // Check if double found is a real double (AKA its value is 2)
            if (numberBefore === numbers[i] && !isNumberEquals && double[numbers[i]] === 2) {
                return true;
            }

            // Set the number before as the number now. Doing it at the end of loop
            // so the checks are correct.
            numberBefore = numbers[i];
        }
        return false;

    }

    // Return the amount of passwords found satisfying the condition
    return passwords;
}

// Display solutions
console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);