/**
 * Creates a point in the Cartesian coordinate system
 * with x, y cordinates.
 *
 * @param  {Number} x horizontal coordinate of the point
 * @param  {Number} y vertical coordinate of the point
 * @param  {Object} context canvas context for drawing the point
 * @param  {String} color hexadecimalcolor code
**/

'use strict';

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
