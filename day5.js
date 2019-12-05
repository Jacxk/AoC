const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/,/g)
    .map(a => parseInt(a));

const inputPart1 = 1;
const inputPart2 = 5;

function solvePart1() {
    const copy = [...input];
    let diagnostic = -1;
    for (let i = 0; copy.length; i++) {
        let code = copy[i], codeString = String(code);
        let param1 = 0, param2 = 0, direction = code;
        if (codeString.length > 2) {
            let paramModes = codeString
                .substring(0, codeString.length - 2)
                .split("")
                .map(i => parseInt(i));
            direction = parseInt(codeString.slice(-1));

            if (paramModes.length > 0) {
                param1 = paramModes[paramModes.length - 1] || 0;
                param2 = paramModes[paramModes.length - 2] || 0;
            }
        }

        if (direction === 1) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a + b;
        } else if (direction === 2) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a * b;
        } else if (direction === 3) {
            i++;
            copy[copy[i]] = inputPart1;
        } else if (direction === 4) {
            i++;
            diagnostic = param1 === 0 ? copy[copy[i]] : copy[i];
            // For debugging purposes. We need to check if all of them except
            // the last one are 0's
            // console.log(copy[copy[i]]);
        } else if (direction === 99) break;
    }
    return diagnostic;
}

function solvePart2() {
    const copy = [...input];
    let diagnostic = -1;
    for (let i = 0; copy.length; i++) {
        let code = copy[i], codeString = String(code);
        let param1 = 0, param2 = 0, direction = code;
        if (codeString.length > 2) {
            let paramModes = codeString
                .substring(0, codeString.length - 2)
                .split("")
                .map(i => parseInt(i));
            direction = parseInt(codeString.slice(-1));

            if (paramModes.length > 0) {
                param1 = paramModes[paramModes.length - 1] || 0;
                param2 = paramModes[paramModes.length - 2] || 0;
            }
        }

        if (direction === 1) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a + b;
        } else if (direction === 2) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a * b;
        } else if (direction === 3) {
            i++;
            copy[copy[i]] = inputPart2;
        } else if (direction === 4) {
            i++;
            diagnostic = param1 === 0 ? copy[copy[i]] : copy[i];
            // For debugging purposes. We need to check if all of them except
            // the last one are 0's
            // console.log(copy[copy[i]]);
        } else if (direction === 5) {
            i += 2;
            let a = param1 === 0 ? copy[copy[i - 1]] : copy[i - 1],
                b = param2 === 0 ? copy[copy[i]] : copy[i];
            if (a !== 0) i = b-1;
        } else if (direction === 6) {
            i += 2;
            let a = param1 === 0 ? copy[copy[i - 1]] : copy[i - 1],
                b = param2 === 0 ? copy[copy[i]] : copy[i];
            if (a === 0) i = b-1;
        } else if (direction === 7) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a < b ? 1 : 0;
        } else if (direction === 8) {
            i += 3;
            let a = param1 === 0 ? copy[copy[i - 2]] : copy[i - 2],
                b = param2 === 0 ? copy[copy[i - 1]] : copy[i - 1];

            copy[copy[i]] = a === b ? 1 : 0;

        } else if (direction === 99) break;
    }
    return diagnostic;
}

// Display solutions
console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);