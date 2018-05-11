import Point from './Point.js';

export default class CanvasEnvironment {

    constructor(selector = 'canvas') {
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d', {
          alpha: false
        });
        this.center = new Point(0, 0);
        this.backgroundColor = 'black';
        this.isDrawing = false;
        this.animatableObjectList = [];
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.center = new Point(width / 2, height / 2);
    }

    clear() {
        this.context.beginPath();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.closePath();
    }

    setup() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();

        window.addEventListener('resize', () => {
            this.handleResize();
         })
    }

    handleResize() {
        this.resize(window.innerWidth, window.innerHeight);
        this.clear();
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
