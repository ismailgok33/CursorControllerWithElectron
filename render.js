// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
    robot.setMouseDelay(2);

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const xCoord = document.getElementById('x-coord');
    const yCoord = document.getElementById('y-coord');
    const timeRange = document.getElementById('timeRange');
    const sliderValueDisp = document.getElementById('sliderValueDisp');

    sliderValueDisp.innerHTML = 120;

    let waitingPeriod = 5000;

    timeRange.onchange = e => {
        sliderValueDisp.innerHTML = timeRange.value;
        waitingPeriod = timeRange.value * 1000;
        console.log('bekleme süresi: ' + waitingPeriod);
    }

    setInterval(function () {
        let mousePos = robot.getMousePos();
        document.getElementById('mousePos').innerText = 'x. ' + mousePos.x + 'y: ' + mousePos.y;
        // console.log("mousePos alındı");
    }, 100)



    let intervalID = 0;
    startBtn.onclick = e => {
        intervalID = setInterval(function () {
            let x = xCoord.value;
            let y = yCoord.value;
            robot.moveMouseSmooth(x, y);
            robot.mouseClick();
            console.log('Tıklamaya başlandı...');
            console.log(x + ' ' + y + ' ' + 'tıklandı.');
        }, waitingPeriod)
    }

    stopBtn.onclick = e => {
        clearInterval(intervalID);
        console.log('Tıklama sona erdi.');
    }

    document.addEventListener('keyup', (e) => {
        if (e.code === "KeyQ" || e.code === "Escape") {
            clearInterval(intervalID);
            console.log('Tıklama sona erdi.');
        }
    });

})