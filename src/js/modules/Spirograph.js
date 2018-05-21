/**
 * Creates a spirograph
 * with the specified number of wheels (default: 2)
 * the wheels are embedded in eachother, on every call to the move method
 * each wheel's center point is rotated around the previous wheel's center point
 *
 *
 * @param  {Object} canvasForMovement canvas context for drawing the movement of the spirograph
 * @param  {Object} contextForMechanics canvas context for drawing the mechanics of the spirograph
 * @param  {Number} wheelListLength number of wheels building up the spirograph
 * @param  {String} color hexadecimalcolor code, default: '#ff0000'
 *
**/

'use strict';

import CircularMovement from './CircularMovement.js';
import Point from './Point.js';
import ColorGradient from './ColorGradient.js';

export default class Spirograph {
    constructor(canvasForMovement, canvasForMechanics, wheelListLength = 2, color = '#ff0000') {
        this.canvasForMovement = canvasForMovement;
        this.canvasForMechanics = canvasForMechanics;
        this.color = color;
        this.wheelListLength = wheelListLength;
        this.wheelList = [];
        this.initWheels();
        this.position = this.wheelList[this.wheelListLength - 1];
        this.isRainbowMode = false;
        this.isMechanicsMode = false;
        this.colorGradient = new ColorGradient();
        window.addEventListener('resize', () => { this.handleResize(); });
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
            var wheel = new CircularMovement(new Point(window.innerWidth / 2, window.innerHeight / 2));
        } else {
            var wheel = new CircularMovement(this.wheelList[currentWheelListLength - 1].movingPoint);
        }

        this.wheelList.push(wheel);

        this.wheelListLength = Math.max(this.wheelListLength, this.wheelList.length);
        this.position = this.wheelList[this.wheelListLength - 1];
    }

    move() {

        for(var i = 0; i < this.wheelListLength; i++) {
            this.wheelList[i].move();
        }

    }

    drawMovement() {

        if(this.isRainbowMode) { this.color = this.colorGradient.next().rgbColor(); }
        this.position.drawMovement(this.canvasForMovement, this.color);

    }

    drawMechanics() {
        for(var i = 0; i < this.wheelListLength; i++) {
            this.wheelList[i].drawMechanics(this.canvasForMechanics);
        }
    }

    animate() {
        this.move();
        this.drawMovement();

        this.canvasForMechanics.clear();

        if(this.isMechanicsMode) {
            this.drawMechanics();
        }

    }
}
