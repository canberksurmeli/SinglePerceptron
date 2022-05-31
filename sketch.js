let perceptron;
let points = [];
let iteration = 0;
function setup() {
    createCanvas(800, 800);
    perceptron = new Perceptron();

    for (let i = 0; i < 100; i++) {
        points[i] = new Point();
    }

    const inputs = [-1, 0.5];
    const guess = perceptron.guess(inputs);
    console.log(guess);
}

function draw() {
    background(255);
    textSize(32);

    stroke(0);
    strokeWeight(1);
    line(0, 0, width, height);
    for (const point of points) {
        point.draw();
    }
    for (const point of points) {
        const inputs = [point.x, point.y];
        const guess = perceptron.guess(inputs);
        if (guess === point.label) {
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        noStroke();
        ellipse(point.x, point.y, 16, 16);
    }
    fill(0);
    if (point) {
        fill(0, 0, 255);
        ellipse(point.x, point.y, 16, 16);
    }
    text(`iteration = ${iteration}`, width - 500, 30);
    text(`weight x = ${perceptron.weights[0]}`, width - 500, 80);
    text(`weight y = ${perceptron.weights[1]}`, width - 500, 130);
}

let index = 0;
let point;
const interval = setInterval(() => {
    if (iteration === 100) {
        clearInterval(interval);
        return;
    }
    point = points[index];

    const inputs = [point.x, point.y];
    perceptron.train(inputs, point.label);
    index++;
    index = index >= points.length ? 0 : index;
    iteration++;
}, 200);

class Perceptron {
    weights = [];
    learningRate = 0.1;
    constructor() {
        for (let i = 0; i < 2; i++) {
            this.weights.push(randomBetween(-1, 1));
        }
    }

    guess(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return sign(sum);
    }

    //Tune weights
    train(inputs, target) {
        const guess = this.guess(inputs);
        const error = target - guess;
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * this.learningRate;
        }
    }
}

//activation function
const sign = (number) => {
    return number >= 0 ? 1 : -1;
};

const randomBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};
