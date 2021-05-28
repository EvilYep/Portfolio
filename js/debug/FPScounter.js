var times = [];
let fps;

export function drawFPScounter(ctx) {
    let now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    ctx.font = '30px Arial';
    ctx.fillText('FPS : ' + Math.round(fps), 10, 50);
}