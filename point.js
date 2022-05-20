class Point {
    x;
    y;
    label;
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.label = this.x >= this.y ? 1 : -1;
    }
    draw() {
        stroke(0);
        if (this.label > 0) {
            fill(255);
        } else {
            fill(0);
        }
        ellipse(this.x, this.y, 32, 32);
    }
}
