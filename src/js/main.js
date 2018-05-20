'use strict';

import CanvasEnvironment from './modules/CanvasEnvironment.js';
import Spirograph from './modules/Spirograph.js';

window.onload = function() {
    var wheelListLength = 2;

    var canvasEnvironment = new CanvasEnvironment();
    canvasEnvironment.setup();

    var spirograph = new Spirograph(canvasEnvironment.context, wheelListLength);
    canvasEnvironment.animatableObjectList.push(spirograph);

    addControllers();

    function addControllers() {
        var gui = new dat.GUI();
        gui.add(canvasEnvironment, 'startDrawing');
        gui.add(canvasEnvironment, 'stopDrawing');
        gui.add(canvasEnvironment, 'clear');

        gui.addColor(spirograph, 'color');
        gui.add(spirograph, 'switchRainbowMode');

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
