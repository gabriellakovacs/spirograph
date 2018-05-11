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
