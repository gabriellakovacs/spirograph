'use strict';

import CanvasEnvironment from './modules/CanvasEnvironment.js';
import Animation from './modules/Animation.js';
import Spirograph from './modules/Spirograph.js';

window.onload = function() {
    var wheelListLength = 2;

    var canvasForMechanics = new CanvasEnvironment();
    canvasForMechanics.setup();

    var canvasForMovement = new CanvasEnvironment('rgba(0, 0, 0, 0)', true);
    canvasForMovement.setup();

    var spirograph = new Spirograph(canvasForMovement, canvasForMechanics, wheelListLength);

    var animation = new Animation();
    animation.animatableObjectList.push(spirograph);

    addControllers();

    function addControllers() {
        var gui = new dat.GUI();
        gui.add(animation, 'start');
        gui.add(animation, 'stop');
        var clear = gui.add(canvasForMechanics, 'clear');
        clear.onFinishChange(function() { canvasForMovement.clear(); });

        gui.addColor(canvasForMechanics, 'backgroundColor');

        gui.addColor(spirograph, 'color');
        gui.add(spirograph, 'isRainbowMode');
        gui.add(spirograph, 'isMechanicsMode');

        var addWheelControllerButton = gui.add(spirograph, 'addWheel');
        var wheelControllerList = [];
        for(var i = 0; i < spirograph.wheelListLength; i++) {
            addWheelController();
        }

        addWheelControllerButton.onFinishChange(function(value) {
            addWheelController();
        });

        function addWheelController() {
            var wheelControlFolder = gui.addFolder(`Wheel ${wheelControllerList.length}`);
            wheelControlFolder.add(spirograph.wheelList[i], 'step');
            wheelControlFolder.add(spirograph.wheelList[i], 'radius');
            wheelControlFolder.open();

            wheelControllerList.push(wheelControlFolder);
        }
    }
}
