const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .replace(/\n/, "")
    .split(/,/g)
    .map(a => parseInt(a));

class Amp {
    constructor(name, next) {
        this._name = name;
        this._next = next || null;
        this._input = 0;
        this._output = 0;
        this._setting;
        this._puzzle = [...input];
    }

    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value;
    }

    get output() {
        return this._output;
    }

    set output(value) {
        this._output = value;
    }

    get next() {
        return this._next;
    }

    set next(value) {
        this._next = value;
    }

    get setting() {
        return this._setting;
    }

    set setting(value) {
        this._setting = value;
    }

    get name() {
        return this._name;
    }

    findOutput(setting) {
        this.output = this.intCode(setting);
        if (this.next) this.next.input = this.output;
        return this.output;
    }

    intCode() {
        let copy = [...this._puzzle];
        let directions = 0, diagnostic = -1;
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
                if (directions === 0) copy[copy[i]] = this.setting;
                else copy[copy[i]] = this.input;
                directions++;
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
                if (a !== 0) i = b - 1;
            } else if (direction === 6) {
                i += 2;
                let a = param1 === 0 ? copy[copy[i - 1]] : copy[i - 1],
                    b = param2 === 0 ? copy[copy[i]] : copy[i];
                if (a === 0) i = b - 1;
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
}

function solvePart1() {
    const ampE = new Amp('E');
    const ampD = new Amp('D', ampE);
    const ampC = new Amp('C', ampD);
    const ampB = new Amp('B', ampC);
    const ampA = new Amp('A', ampB);

    let thrusterSignal = 0;

    let numbersUsed = [];
    for (let i = 0; i < 5; i++) {
        if (numbersUsed.includes(i)) continue;
        ampA.setting = i;
        ampA.findOutput(i);
        numbersUsed.push(i);
        for (let j = 0; j < 5; j++) {
            if (numbersUsed.includes(j)) continue;
            ampB.setting = j;
            ampB.findOutput(j);
            numbersUsed.push(j);
            for (let k = 0; k < 5; k++) {
                if (numbersUsed.includes(k)) continue;
                ampC.setting = k;
                ampC.findOutput(k);
                numbersUsed.push(k);
                for (let l = 0; l < 5; l++) {
                    if (numbersUsed.includes(l)) continue;
                    ampD.setting = l;
                    ampD.findOutput(l);
                    numbersUsed.push(l);
                    for (let m = 0; m < 5; m++) {
                        if (numbersUsed.includes(m)) continue;

                        numbersUsed.push(m);
                        ampE.setting = m;
                        let out = ampE.findOutput(m);

                        thrusterSignal = Math.max(out, thrusterSignal);
                        numbersUsed = numbersUsed.slice(0, -1)
                    }
                    numbersUsed = numbersUsed.slice(0, -1)
                }
                numbersUsed = numbersUsed.slice(0, -1)
            }
            numbersUsed = numbersUsed.slice(0, -1)
        }
        numbersUsed = numbersUsed.slice(0, -1)
    }

    return thrusterSignal;
}

function solvePart2() {
    function getPossibleSequence(from, to) {
        let numbersUsed = [], res = [];
        for (let i = from; i <= to; i++) {
            if (numbersUsed.includes(i)) continue;
            numbersUsed.push(i);
            for (let j = from; j <= to; j++) {
                if (numbersUsed.includes(j)) continue;
                numbersUsed.push(j);
                for (let k = from; k <= to; k++) {
                    if (numbersUsed.includes(k)) continue;
                    numbersUsed.push(k);
                    for (let l = from; l <= to; l++) {
                        if (numbersUsed.includes(l)) continue;
                        numbersUsed.push(l);
                        for (let m = from; m <= to; m++) {
                            if (numbersUsed.includes(m)) continue;
                            numbersUsed.push(m);
                            res.push(numbersUsed);
                            numbersUsed = numbersUsed.slice(0, -1)
                        }
                        numbersUsed = numbersUsed.slice(0, -1)
                    }
                    numbersUsed = numbersUsed.slice(0, -1)
                }
                numbersUsed = numbersUsed.slice(0, -1)
            }
            numbersUsed = numbersUsed.slice(0, -1)
        }
        return res;
    }

    /**
     * @param amp {Amp}
     */
    function getEOutput(amp) {
        if (amp.name === "A") return amp.input;
        else {
            const outputSignal = amp.findOutput();
            //console.log(amp.name, amp.setting,"Input", amp.input, "Output", outputSignal)
            const nextAmp = amp.next;

            amp.output = outputSignal;
            nextAmp.input = outputSignal;
            //console.log(amp.name, "-", amp.input, amp.output)

            return getEOutput(nextAmp);
        }
    }

    function executeProgram(amp) {
        let copy = [...amp._puzzle];
        let directions = 0, output = -1;
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
                if (directions === 0) copy[copy[i]] = amp.setting;
                else copy[copy[i]] = amp.input;
                directions++;
            } else if (direction === 4) {
                i++;
                //console.log("------")
                //console.log(amp.name, "-", amp.input, amp.output)
                output = param1 === 0 ? copy[copy[i]] : copy[i];
                amp.output = output;
                amp.next.input = output;
                //console.log(amp.name, amp.setting, "Input", amp.input, "Output", output)
                amp.input = getEOutput(amp.next);
                //console.log(amp.name, "-", amp.input, amp.output)
                //console.log("amp in", amp.input)
                // For debugging purposes. We need to check if all of them except
                // the last one are 0's
                // console.log(copy[copy[i]]);
            } else if (direction === 5) {
                i += 2;
                let a = param1 === 0 ? copy[copy[i - 1]] : copy[i - 1],
                    b = param2 === 0 ? copy[copy[i]] : copy[i];
                if (a !== 0) i = b - 1;
            } else if (direction === 6) {
                i += 2;
                let a = param1 === 0 ? copy[copy[i - 1]] : copy[i - 1],
                    b = param2 === 0 ? copy[copy[i]] : copy[i];
                if (a === 0) i = b - 1;
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

        return output;
    }

    const ampE = new Amp('E');
    const ampD = new Amp('D', ampE);
    const ampC = new Amp('C', ampD);
    const ampB = new Amp('B', ampC);
    const ampA = new Amp('A', ampB);
    ampE.next = ampA;

    let maxAmp = ampE;
    let maxInput = 0;
    const possibleSequence = getPossibleSequence(5, 9);
    for (let i = 0; i < possibleSequence.length; i++) {
        const sequence = possibleSequence[i];

        ampA.setting = sequence[0];
        ampB.setting = sequence[1];
        ampC.setting = sequence[2];
        ampD.setting = sequence[3];
        ampE.setting = sequence[4];

        executeProgram(ampA);
        if (maxAmp.output > maxInput) {
            maxAmp = ampE;
        }
        maxInput = Math.max(ampE.output, maxInput);

        ampA.input = 0;
    }

    return maxInput;
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is: ${solvePart2()}`);