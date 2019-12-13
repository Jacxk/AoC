const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/g)

function solvePart1() {
    const moons = [...input].map((val, i) => {
        const position = val.match(/<x=(.*), y=(.*), z=(.*)>/);
        return {name: "ABCD".charAt(i), position: position.slice(1, 4).map(c => parseInt(c)), velocity: [0, 0, 0]}
    });

    function runSteps() {
        for (let steps = 0; steps < 1000; steps++) {
            for (let i = 0; i < moons.length; i++) {
                for (let j = 0; j < moons.length; j++) {
                    if (moons[j].name === moons[i].name) continue;

                    for (let k = 0; k < moons[j].position.length; k++) {
                        if (moons[i].position[k] > moons[j].position[k]) {
                            moons[i].velocity[k]--;
                            moons[j].velocity[k]++;
                        }
                    }
                }
            }
            for (let i = 0; i < moons.length; i++) {
                for (let k = 0; k < moons[i].position.length; k++) {
                    moons[i].position[k] += moons[i].velocity[k]
                }
            }
        }
        return moons;
    }

    runSteps();

    return moons.map(moon => {
        const potential = moon.position.map(c => Math.abs(c)).reduce((a, b) => a + b);
        const kinetic = moon.velocity.map(c => Math.abs(c)).reduce((a, b) => a + b);

        return potential * kinetic;
    }).reduce((a, b) => a + b);
}

function solvePart2() {
    const moons = [...input].map((val, i) => {
        const position = val.match(/<x=(.*), y=(.*), z=(.*)>/);
        return {name: "ABCD".charAt(i), position: position.slice(1, 4).map(c => parseInt(c)), velocity: [0, 0, 0]}
    });
    const original = moons.map(val => {
        return {name: val.name, position: Array.from(val.position), velocity: Array.from(val.velocity)}
    });

    function positionEquals(moon1, moon2, val) {
        for (let i = 0; i < moon1.length; i++) {
            if (
                moon1[i].position[val] !== moon2[i].position[val] &&
                moon1[i].velocity[val] !== moon2[i].velocity[val]
            ) return false;
        }
        return true;
    }

    function getPrimeFactors(number) {
        let absNumber = Math.abs(number);

        const primeFactorsMap = new Map();

        for (let factor = 2; factor <= absNumber; factor++) {
            while (absNumber % factor === 0) {
                let power = primeFactorsMap.get(factor);
                if (power == null) power = 0;
                primeFactorsMap.set(factor, power + 1);
                absNumber /= factor;
            }
        }

        return primeFactorsMap;
    }

    function lcm(x, y, z) {
        if (x === 0 || y === 0 || z === 0) return 0;

        const primeFactorsX = getPrimeFactors(x);
        const primeFactorsY = getPrimeFactors(y);
        const primeFactorsZ = getPrimeFactors(z);

        const allPrimeFactors = [];

        function unite(map) {
            for (const entry of map.keys()) {
                allPrimeFactors.push(entry)
            }
        }

        unite(primeFactorsX);
        unite(primeFactorsY);
        unite(primeFactorsZ);

        let lcm = 1;

        const most = new Map();
        for (const primeFactor of allPrimeFactors) {
            most.set(primeFactor, Math.max(
                primeFactorsX.get(primeFactor) || 0,
                primeFactorsY.get(primeFactor) || 0,
                primeFactorsZ.get(primeFactor) || 0,
            ));
        }

        for (const key of most.keys()) {
            lcm *= Math.pow(key, most.get(key));
        }
        return lcm;
    }

    function findStepsFor(val) {
        let steps = 0, found = false;
        while (!found) {
            for (let i = 0; i < moons.length; i++) {
                for (let j = 0; j < moons.length; j++) {
                    if (moons[j].name === moons[i].name) continue;
                    if (moons[i].position[val] > moons[j].position[val]) {
                        moons[i].velocity[val]--;
                        moons[j].velocity[val]++;
                    }
                }
            }
            for (let i = 0; i < moons.length; i++) {
                moons[i].position[val] += moons[i].velocity[val];
            }
            steps++;
            if (positionEquals(original, moons, val)) found = true;
        }
        return steps;
    }

    return lcm(findStepsFor(0), findStepsFor(1), findStepsFor(2)) * 2;
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);