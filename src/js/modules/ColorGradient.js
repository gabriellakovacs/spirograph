/**
 * Creates color gradient starting with red and changing the 3 color chanels
 * (r, g, b propeties) on each step
 * Calling the next method changes the resulting color a bit according to the
 * following pattern:
 * step 0:  255,   0,   0
 * step 1:  255, 255,   0
 * step 2:    0, 255,   0
 * step 3:    0, 255, 255
 * step 4:    0,   0, 255
 * step 5:  255,   0, 255
 * 
**/

'use strict';

export default class colorGradient {
    constructor() {
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.step = 0;
    }

    next() {
        this.step++;
        switch(Math.floor(this.step / 255) ) {
            case 0:
                this.g++;
                break;

            case 1 :
                this.r--;
                break;

            case 2 :
                this.b++;
                break;

            case 3 :
                this.g--;
                break;

            case 4 :
                this.r++;
                break;

            case 5 :
                this.b--;
                break;
        }

        if(this.step >= 255 * 6) { this.step = 0; }

        return this;

    }


    rgbColor() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

}
