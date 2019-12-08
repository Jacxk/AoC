const fs = require("fs");
const [...input] = fs
    .readFileSync("./input.txt", "utf-8")
    .replace(/\n/g, "")
    .split("")
    .map(a => parseInt(a));

class Layer {
    constructor() {
        this._rows = [];
        this._pixels = [];
    }

    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get pixels() {
        return this._pixels;
    }

    set pixels(value) {
        this._pixels = value;
    }

    addPixels(pixels) {
        this.rows.push(pixels);
        this.pixels = this.pixels.concat(pixels);
    }
}

function solvePart1() {
    let pixels = [...input];

    function fillLayers(width = 25, height = 6) {
        const layers = [];

        let layer = new Layer();
        let rowCount = 0, pixelCount = pixels.length;
        for (let i = 0; i <= pixelCount; i += width) {
            layer.addPixels(pixels.slice(0, width));
            pixels = pixels.slice(width);
            rowCount++;
            if (rowCount === height) {
                layers.push(layer);
                layer = new Layer();
                rowCount = 0;
            }
        }
        return layers;
    }

    function getFewerDigitLayer(digit = 0) {
        const layers = fillLayers();
        let fewerDigitLayer = layers[0];
        layers.forEach(layer => {
            const layerDigCount = layer.pixels.filter(p => p === digit).length;
            const currentFewerCount = fewerDigitLayer.pixels.filter(p => p === digit).length;
            if (layerDigCount < currentFewerCount) fewerDigitLayer = layer;
        });
        return fewerDigitLayer;
    }

    function getMultiplicationOfDigits(digit1, digit2) {
        const layer = getFewerDigitLayer();
        const layerDigit1Count = layer.pixels.filter(p => p === digit1).length;
        const layerDigit2Count = layer.pixels.filter(p => p === digit2).length;

        return layerDigit1Count * layerDigit2Count;
    }

    return getMultiplicationOfDigits(1, 2);
}

function solvePart2() {
    const pixelStyle = "#";
    let pixels = [...input];

    function fillLayers(width = 25, height = 6) {
        const layers = [];

        let layer = new Layer();
        let rowCount = 0, pixelCount = pixels.length;
        for (let i = 0; i <= pixelCount; i += width) {
            layer.addPixels(pixels.slice(0, width));
            pixels = pixels.slice(width);
            rowCount++;
            if (rowCount === height) {
                layers.push(layer);
                layer = new Layer();
                rowCount = 0;
            }
        }
        return layers;
    }

    function renderImage() {
        const imageRender = [];
        const layers = fillLayers();

        let count = -1;
        for (let i = 0; i < layers.length; i++) {
            for (let j = 0; j < layers[i].rows.length; j++) {
                if (imageRender.length <= j) imageRender.push([]);
                for (let k = 0; k < layers[i].rows[j].length; k++) {
                    switch (layers[i].rows[j][k]) {
                        case 0:
                            if ((count - 1) < 0 || ![0, 1].includes(imageRender[count - 1][k])) {
                                imageRender[j][k] = 0;
                            }
                            break;
                        case 1:
                            if ((count - 1) < 0 || ![0, 1].includes(imageRender[count - 1][k])) {
                                imageRender[j][k] = 1;
                            }
                            break;
                        case 2:
                            if ((count - 1) < 0 || ![0, 1].includes(imageRender[count - 1][k])) {
                                imageRender[j][k] = 2;
                            }
                            break;
                    }
                }
                count++;
            }
            count = 1;
        }

        let image = [];
        for (let i = 0; i < imageRender.length; i++) {
            for (let j = 0; j < imageRender[i].length; j++) {
                switch (imageRender[i][j]) {
                    case 0:
                        image.push(" ");
                        break;
                    case 1:
                        image.push(pixelStyle);
                        break;
                    case 2:
                        image.push(".");
                        break;
                }
            }
            image.push("\n")
        }
        return image.join("");
    }

    return renderImage();
}

console.log(`Solution for part 1 is: ${solvePart1()}`);
console.log(`Solution for part 2 is:\n${solvePart2()}`);
