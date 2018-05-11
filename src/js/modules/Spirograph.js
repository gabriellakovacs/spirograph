import CircularMovement from './CircularMovement.js';
import Point from './Point.js';


export default class Spirograph {
    constructor(context, wheelListLength = 2, color = '#ff0000') {
        this.context = context;
        this.color = color;
        this.wheelListLength = wheelListLength;

        this.wheelList = [];

        for(var i = 0; i < this.wheelListLength; i++) {
            this.addWheel();
        }
        this.x = this.wheelList[this.wheelListLength - 1].x;
        this.y = this.wheelList[this.wheelListLength - 1].y;

        window.addEventListener('resize', () => {
            this.handleResize();
         })
    }

    handleResize() {
        for(var i = 0; i < this.wheelListLength; i++) {
            this.wheelList[i].center = new Point(window.innerWidth / 2, window.innerHeight / 2);
            this.wheelList[i].move();
            // this.wheelList[i].x = Math.cos(this.wheelList[i].currentStep) * this.wheelList[i].radius + this.wheelList[i].center.x;
            // this.wheelList[i].y = Math.sin(this.wheelList[i].currentStep) * this.wheelList[i].radius + this.wheelList[i].center.y;
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

        // this.moveSystem(this.wheelListLength);

        for(var i = 0; i < this.wheelListLength; i++) {

         this.wheelList[i].move();
        //this.wheelList[i].draw();
        }

        var next = this.wheelList[this.wheelListLength - 1];

        this.x = next.movingPoint.x;
        this.y = next.movingPoint.y;

    }

    draw() {
        if(!this.prev) {
            this.prev = new Point(0,0);
                this.prev.x = this.wheelList[this.wheelListLength - 1].x;
            this.prev.y = this.wheelList[this.wheelListLength - 1].y;
        }

        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.prev.x, this.prev.y);
        this.context.lineTo(this.x, this.y);
        this.context.closePath();
        this.context.stroke();

        this.prev.x = this.x;
        this.prev.y = this.y;

    }

    animate() {
        this.move();
        this.draw();
    }
}
