/**
 * Creates a circle shaped trajectory initiated with
 * random step size and
 * random radius
 * starts at angle 0 (currentStep)
 *
 * drawMechanics - draws the circle of the trajectory and the moving point on it
 * drawMovement - draws the line between the last position of the moving pointand
 * the current position ofthe moving point
 *
 * @param  {Object} center a Point Object
 *
**/

'use strict';

import Point from './Point.js';

export default class CircularMovement {
    constructor(center) {
        this.center = center;
        this.radius = Math.random() * 300 + 100;
        this.currentStep = 0;
        this.step = Math.random() / 10;
        this.movingPoint = new Point(Math.cos(this.currentStep) * this.radius + this.center.x, Math.sin(this.currentStep) * this.radius + this.center.y);
        this.previousPosition = new Point(this.movingPoint.x, this.movingPoint.y);
    }

    move() {
        this.previousPosition.x = this.movingPoint.x;
        this.previousPosition.y = this.movingPoint.y;

        this.movingPoint.x = Math.cos(this.currentStep) * this.radius + this.center.x;
        this.movingPoint.y = Math.sin(this.currentStep) * this.radius + this.center.y;
        this.currentStep += this.step;
    }

    drawMechanics(CanvasEnvironment) {
        CanvasEnvironment.context.beginPath();
        CanvasEnvironment.context.strokeStyle = '#ffffff';
        CanvasEnvironment.context.arc(this.center.x, this.center.y, this.radius, 0, 7);
        CanvasEnvironment.context.stroke();
        CanvasEnvironment.context.closePath();

        this.movingPoint.draw(CanvasEnvironment);
    }

    drawMovement(CanvasEnvironment, color) {
        CanvasEnvironment.context.beginPath();
        CanvasEnvironment.context.strokeStyle = color;
        CanvasEnvironment.context.moveTo(this.previousPosition.x, this.previousPosition.y);
        CanvasEnvironment.context.lineTo(this.movingPoint.x, this.movingPoint.y);
        CanvasEnvironment.context.closePath();
        CanvasEnvironment.context.stroke();
    }
}
