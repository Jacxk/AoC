const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/g)
    .map(a => a.split(""));

function solvePart1() {
    const inputCopy = [...input];

    function getCoordinates() {
        const asteroids = [];
        for (let y = 0; y < inputCopy.length; y++) {
            for (let x = 0; x < inputCopy[y].length; x++) {
                if (inputCopy[y][x] === "#") asteroids.push({x, y})
            }
        }
        return asteroids;
    }

    function getAngles() {
        const coordinates = getCoordinates();
        const angles = [];
        for (let c = 0; c < coordinates.length; c++) {
            const asteroid = coordinates[c];
            const array = [];
            for (let i = 0; i < coordinates.length; i++) {
                const otherAsteroid = coordinates[i];
                const angle = Math.atan2(otherAsteroid.y - asteroid.y, otherAsteroid.x - asteroid.x) * 180 / Math.PI;
                array.push({point: asteroid, angle})
            }
            angles.push(array);
        }

        return angles;
    }

    const angles = getAngles();
    const uniqueAngles = [];
    for (let i = 0; i < angles.length; i++) {
        uniqueAngles.push(angles[i].filter((val, index) => angles[i].indexOf(val) === index))
    }

    return uniqueAngles.map(a => a.length).reduce((a, b) => Math.max(a, b));
}

console.log(`Solution for part 1 is: ${solvePart1()}`);