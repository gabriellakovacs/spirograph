/**
 * Animation
 * all objects that need to be animated should be passed in the animatableObjectList.
 * They should all have a method called animate.
 *
 *
**/

'use strict';

export default class CanvasEnvironment {

    constructor() {
        this.isPlaying = false;
        this.animatableObjectList = [];
    }

    start() {
        this.isPlaying = true;
        this.draw();
    }

    stop() {
        this.isPlaying = false;
    }

    draw() {

        if(this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw();
            });

            for(let i = 0; i < this.animatableObjectList.length; i++) {
                this.animatableObjectList[i].animate();
            }

        }
    }

}
