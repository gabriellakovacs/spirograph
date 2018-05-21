/**
 * Creates a point in the Cartesian coordinate system
 * with x, y cordinates.
 *
 * @param  {Number} x horizontal coordinate of the point
 * @param  {Number} y vertical coordinate of the point
**/

'use strict';

export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(canvas) {
        canvas.context.beginPath();
        canvas.context.fillStyle = '#ffffff';
        canvas.context.arc(this.x, this.y, 5, 0, 7);
        canvas.context.closePath();
        canvas.context.fill();
    }
}
