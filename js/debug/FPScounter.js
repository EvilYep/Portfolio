let lastCalledTime;
let fps, delta;

export function drawFPScounter(ctx) {
    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
    }
    delta = (Date.now() - lastCalledTime)/1000;
    lastCalledTime = Date.now();
    fps = 1/delta;
    ctx.font = '30px Arial';
    ctx.fillText('FPS : ' + Math.round(fps * 100) / 100, 10, 50);
}