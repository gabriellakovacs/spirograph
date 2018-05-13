/**
 * Creates a spirograph
 * with the specified number of wheels (default: 2)
 * the wheels are embedded in eachother, on every call to the move method
 * each wheel's center point is rotated around the previous wheel's center point
 *
 *
 * @param  {Object} context canvas context for drawing the movement of the spirograph
 * @param  {Number} wheelListLength number of wheels building up the spirograph
 * @param  {String} color hexadecimalcolor code, default: '#ff0000'
 *
**/

'use strict';

import CircularMovement from './CircularMovement.js';
import Point from './Point.js';


export default class Spirograph {
    constructor(context, wheelListLength = 2, color = '#ff0000') {
        this.context = context;
        this.color = color;
        this.wheelListLength = wheelListLength;
        this.wheelList = [];
        this.initWheels();
        this.position = new Point(this.wheelList[this.wheelListLength - 1].x, this.wheelList[this.wheelListLength - 1].y);
        this.previousPosition = new Point(this.position.x, this.position.y);
        window.addEventListener('resize', () => { this.handleResize(); })
    }

    handleResize() {
        this.wheelList[i].center = new Point(window.innerWidth / 2, window.innerHeight / 2);
        this.wheelList[i].move();
    }

    initWheels() {
        for(var i = 0; i < this.wheelListLength; i++) {
            this.addWheel();
        }
    }

    addWheel() {

        var currentWheelListLength = this.wheelList.length;

        if(currentWheelListLength === 0) {
            var wheel = new CircularMovement(new Point(window.innerWidth / 2, window.innerHeight / 2),  this.context);
        } else {
            var wheel = new CircularMovement(this.wheelList[currentWheelListLength - 1].movingPoint,  this.context);
        }

        this.wheelList.push(wheel);

        this.wheelListLength = Math.max(this.wheelListLength, this.wheelList.length);
    }

    move() {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;

        for(var i = 0; i < this.wheelListLength; i++) {
            this.wheelList[i].move();
        }

        this.position.x = this.wheelList[this.wheelListLength - 1].movingPoint.x;
        this.position.y = this.wheelList[this.wheelListLength - 1].movingPoint.y;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.previousPosition.x, this.previousPosition.y);
        this.context.lineTo(this.position.x, this.position.y);
        this.context.closePath();
        this.context.stroke();
    }

    animate() {
        this.move();
        this.draw();
    }
}
