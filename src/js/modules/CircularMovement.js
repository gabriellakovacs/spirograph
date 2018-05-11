import Point from './Point.js';

export default class CircularMovement {
    constructor(center, context) {
        this.center = center;
        this.radius = Math.random() * 300 + 100;
        this.movingPoint = new Point(0, 0);
        this.currentStep = 0;
        this.step = Math.random() / 10;
        this.context = context;
    }

    move() {

        this.movingPoint.x = Math.cos(this.currentStep) * this.radius + this.center.x;
        this.movingPoint.y = Math.sin(this.currentStep) * this.radius + this.center.y;

        this.currentStep += this.step;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = 'white';
        this.context.arc(this.center.x, this.center.y, this.r, 0, 7);
        this.context.stroke();
        this.context.closePath();
    }
}
