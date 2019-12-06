const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n/g);

class Object {
    constructor(name, object) {
        this._name = name;
        this._object = object;
        this._orbitedBy = [];
    }

    get name() {
        return this._name.toString();
    }

    get object() {
        return this._object;
    }

    get orbitedBy() {
        return this._orbitedBy;
    }

    set object(value) {
        this._object = value;
    }

}

function solvePart1() {
    const objects = [];
    for (let i = 0; i < input.length; i++) {
        const objectsOrbit = input[i].split(/\)/);
        const orbitedBy = objectsOrbit[1],
            object = objectsOrbit[0];

        const objectClass = objects.find(o => o.name === object),
            orbitedByClass = objects.find(o => o.name === orbitedBy);

        if (!objectClass) {
            objects.push(new Object(object));
            i--;
            continue;
        } else if (!orbitedByClass) {
            i--;
            objects.push(new Object(orbitedBy));
            continue;
        }

        if (orbitedByClass) {
            orbitedByClass.object = objectClass;
        }
        objectClass.orbitedBy.push(orbitedByClass);
    }

    let orbits = -objects.length;
    for (let i = objects.length - 1; i >= 0; i--) {
        let object = objects[i];
        while (object) {
            orbits++;
            object = object.object;
        }
    }

    return orbits;
}

function solvePart2() {
    const objects = [];
    for (let i = 0; i < input.length; i++) {
        const objectsOrbit = input[i].split(/\)/);
        const orbitedBy = objectsOrbit[1],
            object = objectsOrbit[0];

        const objectClass = objects.find(o => o.name === object),
            orbitedByClass = objects.find(o => o.name === orbitedBy);

        if (!objectClass) {
            objects.push(new Object(object));
            i--;
            continue;
        } else if (!orbitedByClass) {
            i--;
            objects.push(new Object(orbitedBy));
            continue;
        }

        if (orbitedByClass) {
            orbitedByClass.object = objectClass;
        }
        objectClass.orbitedBy.push(orbitedByClass);
    }

    let orbits = 0;
    let you = objects.find(o => o.name === "YOU"),
        san = objects.find(o => o.name === "SAN");
    let sanObjects = [];

    while (san) {
        sanObjects.push(san.name);
        san = san.object;
    }

    while (you && !sanObjects.includes(you.name)) {
        you = you.object;
        orbits++;
    }

    for (let i = 0; i < sanObjects.length; i++){
        if (sanObjects[i] === you.name) break;
        orbits++;
    }

    return orbits - 2;
}


// Display solutions
console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);