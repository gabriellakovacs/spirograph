export default class Point {
    constructor(x, y, context, color = '#ff0000') {
        this.x = x;
        this.y = y;
        this.context = context;
        this.color = color;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, 5, 0, 7);
        this.context.closePath();
        this.context.fill();
    }

}
