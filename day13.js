const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/,/g)
    .map(a => parseInt(a));

function solvePart1() {
    function intCode() {
        const copy = [...input];

        let base = 0, answer = 0;
        let diagnostic = -1, outputTimes = 0;
        for (let i = 0; copy.length; i++) {
            let code = copy[i], codeString = String(code);
            let param1 = 0, param2 = 0, param3 = 0, direction = code;
            if (codeString.length > 2) {
                let paramModes = codeString
                    .substring(0, codeString.length - 2)
                    .split("")
                    .map(i => parseInt(i));
                direction = parseInt(codeString.slice(-1));

                if (paramModes.length > 0) {
                    param1 = paramModes[paramModes.length - 1] || 0;
                    param2 = paramModes[paramModes.length - 2] || 0;
                    param3 = paramModes[paramModes.length - 3] || 0;
                }
            }

            if (direction === 1 || direction === 2) {
                i += 3;
                let a = (param1 === 0 ? copy[copy[i - 2]] : param1 === 1 ? copy[i - 2] : copy[copy[i - 2] + base]) || 0,
                    b = (param2 === 0 ? copy[copy[i - 1]] : param2 === 1 ? copy[i - 1] : copy[copy[i - 1] + base]) || 0,
                    c = (param3 === 0 ? copy[i] : param3 === 1 ? i : copy[i] + base) || 0;

                if (direction === 1) copy[c] = a + b;
                else copy[c] = a * b;
            } else if (direction === 3 || direction === 4) {
                i++;
                let c = (param1 === 0 ? copy[i] : param1 === 1 ? i : copy[i] + base) || 0;

                if (direction === 3) {
                    copy[c] = 0;
                } else {
                    diagnostic = (param1 === 0 ? copy[copy[i]] : param1 === 1 ? copy[i] : copy[copy[i] + base]) || 0;
                    outputTimes++;
                    if (outputTimes === 3) {
                        outputTimes = 0;
                        if (diagnostic === 2) answer++;
                    }
                }
            } else if (direction === 5 || direction === 6) {
                i += 2;
                let a = (param1 === 0 ? copy[copy[i - 1]] : param1 === 1 ? copy[i - 1] : copy[copy[i - 1] + base]) || 0,
                    b = (param2 === 0 ? copy[copy[i]] : param2 === 1 ? copy[i] : copy[copy[i] + base]) || 0;

                if (direction === 5 && a !== 0) i = b - 1;
                else if (direction === 6 && a === 0) i = b - 1;
            } else if (direction === 7 || direction === 8) {
                i += 3;
                let a = (param1 === 0 ? copy[copy[i - 2]] : param1 === 1 ? copy[i - 2] : copy[copy[i - 2] + base]) || 0,
                    b = (param2 === 0 ? copy[copy[i - 1]] : param2 === 1 ? copy[i - 1] : copy[copy[i - 1] + base]) || 0,
                    c = (param3 === 0 ? copy[i] : param3 === 1 ? i : copy[i] + base) || 0;

                if (direction === 7) copy[c] = a < b ? 1 : 0;
                else copy[c] = a === b ? 1 : 0;
            } else if (direction === 9) {
                i++;
                base += (param1 === 0 ? copy[copy[i]] : param1 === 1 ? copy[i] : copy[copy[i] + base]) || 0;
            } else if (direction === 99) break;
        }
        return answer;
    }

    return intCode();
}

console.log(`Solution for part 1 is: ${solvePart1()}`);