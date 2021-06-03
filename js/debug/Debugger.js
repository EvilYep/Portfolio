import { keys, mouseDown } from '../Input.js'
import { distance, paused } from '../main.js'

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
    ctx.font = '30px AtariST';
    ctx.fillText('FPS : ' + Math.round(fps), 10, 30);
    ctx.fillText('Keys pressed : ' + getKeys(), 10, 60);
    ctx.fillText('Player status : ' + player.xStatus + ' ' + player.yStatus, 10, 90);
    ctx.fillText(mouseDown ? 'Mouse : down' : 'Mouse : up', 10, 120);
    ctx.fillText('yVelocity : ' + player.yVelocity, 10, 150);
    ctx.fillText(paused ? 'Paused' : 'Unpaused', 10, 180);
    ctx.fillText('Distance ' + distance, 10, 210);
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