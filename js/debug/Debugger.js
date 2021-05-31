import { keys, mouseDown } from '../Input.js'

let k ='';
let times = [];
let fps;

export function drawDebugger(ctx, player) {
    let now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);

    fps = times.length;

    ctx.fillStyle = 'orange';
    ctx.font = '50px AtariST';
    ctx.fillText('FPS : ' + Math.round(fps), 10, 50);
    ctx.fillText('Keys pressed : ' + getKeys(), 10, 100);
    ctx.fillText('Player status : ' + player.xStatus + ' ' + player.yStatus, 10, 150);
    ctx.fillText(mouseDown ? 'Mouse : down' : 'Mouse : up', 10, 200);
    ctx.fillText('yVelocity : ' + player.yVelocity, 10, 250);
}

function getKeys() {
  k= '';
  Object.entries(keys).forEach(e => {
    if(e[1]) {
      k += e[0] == ' ' ? ' space ' : ' ' + e[0] + ' ';
    }
  });
  return k;
}