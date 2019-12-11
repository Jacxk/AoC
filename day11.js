const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/,/g)
    .map(a => parseInt(a));

const BLACK = 0, WHITE = 1;

function solve(startingColor, part1) {
    function intCode() {
        const copy = [...input];
        const painted = [], colors = [], plate = [];
        let base = 0, diagnostic = -1;
        let robot = {x: 0, y: 0};
        let color = startingColor, facing = "U";
        let first = true;
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

                if (direction === 3) copy[c] = color;
                else {
                    diagnostic = (param1 === 0 ? copy[copy[i]] : param1 === 1 ? copy[i] : copy[copy[i] + base]) || 0;
                    if (first) {
                        if (!colors[robot.x]) colors[robot.x] = [];
                        colors[robot.x][robot.y] = diagnostic;
                        painted.push({x: robot.x, y: robot.y, color: diagnostic});

                        if (!part1) {
                            const black = ' ', white = '#';
                            if (!plate[robot.y]) plate[robot.y] = [];
                            plate[robot.y][robot.x] = diagnostic === BLACK ? black : white;
                        }

                        first = false;
                    } else {
                        switch (facing) {
                            case "U":
                                if (diagnostic === 0) {
                                    facing = "L";
                                    robot.x--;
                                } else {
                                    facing = "R";
                                    robot.x++;
                                }
                                break;
                            case "D":
                                if (diagnostic === 0) {
                                    facing = "R";
                                    robot.x++;
                                } else {
                                    facing = "L";
                                    robot.x--;
                                }
                                break;
                            case "R":
                                if (diagnostic === 0) {
                                    facing = "U";
                                    robot.y--;
                                } else {
                                    facing = "D";
                                    robot.y++;
                                }
                                break;
                            case "L":
                                if (diagnostic === 0) {
                                    facing = "D";
                                    robot.y++;
                                } else {
                                    facing = "U";
                                    robot.y--;
                                }
                                break;
                        }

                        color = colors[robot.x] ? colors[robot.x][robot.y] || startingColor : startingColor;
                        first = true;
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
        if (part1) return painted.filter((val, i) => painted.findIndex(p => p.x === val.x && p.y === val.y) === i);
        else return plate;
    }

    if (part1) {
        return intCode().length;
    } else {
        return intCode().map(val => val.join("")).join("\n")
    }
}

console.log(`Solution for part 1 is: ${solve(BLACK, true)}`);
console.log(`Solution for part 2 is:\n${solve(WHITE, false)}`);