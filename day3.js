const fs = require("fs");
const [wire1, wire2] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/);
const start = {x: 0, y: 0};
const RIGHT = "R", LEFT = "L", UP = "U", DOWN = "D";
const wire1Path = wire1.split(","),
    wire2Path = wire2.split(",");

function solvePart1() {
    const wire1Coor = [start], intercepts = [];

    function drawWirePath(wirePath, path1 = true) {
        const tail = {x: 0, y: 0};
        for (let i = 0; i < wirePath.length; i++) {
            const direction = wirePath[i].charAt(0),
                distance = parseInt(wirePath[i].slice(1));
            if (path1) {
                switch (direction) {
                    case RIGHT:
                        tail.x += distance;
                        break;
                    case LEFT:
                        tail.x -= distance;
                        break;
                    case UP:
                        tail.y += distance;
                        break;
                    case DOWN:
                        tail.y -= distance;
                        break;
                    default:
                        throw "Unknown direction found. Check your input?";
                }
                wire1Coor.push({x: tail.x, y: tail.y});
                continue;
            }
            for (let d = 1; d <= distance; d++) {
                switch (direction) {
                    case RIGHT:
                        tail.x++;
                        break;
                    case LEFT:
                        tail.x--;
                        break;
                    case UP:
                        tail.y++;
                        break;
                    case DOWN:
                        tail.y--;
                        break;
                    default:
                        throw "Unknown direction found. Check your input?";
                }
                for (let j = 1; j < wire1Coor.length; j++) {
                    const condition = coor => coor.x !== start.x && coor.y !== start.y
                        && coor.x <= wire1Coor[j - 1].x && coor.x >= wire1Coor[j].x
                        && coor.y <= wire1Coor[j - 1].y && coor.y >= wire1Coor[j].y;

                    if (condition(tail)) {
                        intercepts.push({x: tail.x, y: tail.y})
                    }
                }
            }
        }
    }

    drawWirePath(wire1Path);
    drawWirePath(wire2Path, false);

    return intercepts
        .map(i => Math.abs(i.x) + Math.abs(i.y))
        .reduce((a, b) => Math.min(a, b));
}

function solvePart2() {
    const wire1Coor = [start], wire2Coor = [start], intercepts = [];

    function drawWirePath(wirePath, wireCoor) {
        const tail = {x: 0, y: 0};
        let wireStep = 0;
        for (let i = 0; i < wirePath.length; i++) {
            const direction = wirePath[i].charAt(0),
                distance = parseInt(wirePath[i].slice(1));
            for (let d = 1; d <= distance; d++) {
                wireStep++;
                switch (direction) {
                    case RIGHT:
                        tail.x++;
                        break;
                    case LEFT:
                        tail.x--;
                        break;
                    case UP:
                        tail.y++;
                        break;
                    case DOWN:
                        tail.y--;
                        break;
                    default:
                        throw "Unknown direction found. Check your input?";
                }
                wireCoor.push({x: tail.x, y: tail.y, steps: wireStep})
            }
        }
    }

    drawWirePath(wire1Path, wire1Coor);
    drawWirePath(wire2Path, wire2Coor);

    for (let i = 0; i < wire1Coor.length; i++) {
        const filter = c => c.x !== start.x && c.y !== start.y &&
            c.x === wire1Coor[i].x && c.y === wire1Coor[i].y;
        wire2Coor.filter(filter).forEach(coor => {
            intercepts.push({
                x: coor.x,
                y: coor.y,
                steps: {wire1: wire1Coor[i].steps, wire2: coor.steps}
            });
        })
    }

    return intercepts
        .map(i => i.steps.wire1 + i.steps.wire2)
        .reduce((a, b) => Math.min(a, b));
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);