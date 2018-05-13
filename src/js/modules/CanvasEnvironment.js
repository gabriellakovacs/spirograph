/**
 * Creates a canvas environment
 * keeps track of the center of the canvas
 * all objects that need to be animated should be passed in the animatableObjectList.
 * They should all have a method called animate.
 *
 * @param  {String} selector query Selector for the canvas elment, default: 'canvas'
 * @param  {String} backgroundColor hexadecimalcolor code, default: '#000000'
 *
**/

'use strict';

import Point from './Point.js';

export default class CanvasEnvironment {

    constructor(selector = 'canvas', backgroundColor = '#000000') {
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d', {
          alpha: false
        });
        this.center;
        this.backgroundColor = backgroundColor;
        this.isDrawing = false;
        this.animatableObjectList = [];
        window.addEventListener('resize', () => { this.handleResize(); });
    }

    setup() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.center = new Point(width / 2, height / 2);
    }

    handleResize() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();
    }

    clear() {
        this.context.beginPath();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.closePath();
    }

    startDrawing() {
        this.isDrawing = true;
        this.draw();
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    draw() {

        if(this.isDrawing) {
            window.requestAnimationFrame(() => {
                this.draw();
            });

            for(let i = 0; i < this.animatableObjectList.length; i++) {
                this.animatableObjectList[i].animate();
            }
        }
    }

}
