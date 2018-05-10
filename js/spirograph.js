window.onload = function() {

    var wheelListLength = 2;

    class Point {
        constructor(x, y, context, color = 'red') {
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

    class CircularMovement {
        constructor(center, context) {
            this.center = center;
            this.radius = Math.random() * 300 + 100;
            this.movingPoint = new Point(0, 0);
            this.currentStep = 0;
            this.step = Math.random() / 10;
            this.context = context;
        }

        move() {

            this.movingPoint.x = Math.cos(this.currentStep) * this.radius + this.center.x;
            this.movingPoint.y = Math.sin(this.currentStep) * this.radius + this.center.y;

            this.currentStep += this.step;
        }

        draw() {
            this.context.beginPath();
            this.context.strokeStyle = 'white';
            this.context.arc(this.center.x, this.center.y, this.r, 0, 7);
            this.context.stroke();
            this.context.closePath();
        }
    }

    class Spirograph {
        constructor(context, wheelListLength = 2, color = "#ff0000") {
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
    }

    class CanvasEnvironment {

        constructor(selector = 'canvas') {
            this.canvas = document.querySelector(selector);
            this.context = this.canvas.getContext('2d', {
              alpha: false
            });
            this.center = new Point(0, 0);
            this.backgroundColor = 'black';
            this.isDrawing = false;
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
            window.requestAnimationFrame(() => {
                this.draw();
            });
        }

        stopDrawing() {
            this.isDrawing = false;
        }

        draw() {

            if(this.isDrawing) {

                window.requestAnimationFrame(() => {
                    this.draw();
                });

                //this.clear();

                // for(let func of functionsList) {
                //
                //     func();
                // }
                animation();
            }

            // this.addEventListener('click', () => {
            // //     allThis();
            // // })

        }

    }

    var canvasEnvironment = new CanvasEnvironment();
    canvasEnvironment.setup();

    var spirograph = new Spirograph(canvasEnvironment.context, wheelListLength);

    addControllers();

    //TODO: this is not too elegant...
    function animation() {
        spirograph.move();
        spirograph.draw();
    }


    function addControllers() {
        var gui = new dat.GUI();
        gui.add(canvasEnvironment, 'startDrawing');
        gui.add(canvasEnvironment, 'stopDrawing');
        gui.add(canvasEnvironment, 'clear');

        gui.addColor(spirograph, 'color');

        var addWheelControllerButton = gui.add(spirograph, 'addWheel');
        var wheelControllerList = [];
        for(var i = 0; i < spirograph.wheelListLength; i++) {
            addWheelController();
        }

        addWheelControllerButton.onFinishChange(function(value) {
            addWheelController();
        });

        function addWheelController() {
            var f1 = gui.addFolder(`Wheel ${wheelControllerList.length}`);
            f1.add(spirograph.wheelList[i], 'step');
            f1.add(spirograph.wheelList[i], 'radius');
            f1.open();

            wheelControllerList.push(f1);
        }

    }

}
