import { keys, mouseDown } from '../Input.js';
import { distance, offset, paused, collided, collected } from '../main.js';

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
    ctx.fillText('WORK IN PROGRESS', 700, 55);
    ctx.font = '30px AtariST';
    let debugs = [
        'FPS : ' + Math.round(fps) + ' / ' + FPS + ' max',
        'Player hitbox  L:' + player.hitbox.left + ' R:' + player.hitbox.right +  ' T:' + player.hitbox.top +  ' B:' + player.hitbox.bottom + '-' + player.y,
        'Distance : ' + distance + ' -  Offset : ' +  offset,
        'yVelocity : ' + player.yVelocity,
        'Player status : ' + player.xStatus + ' ' + player.yStatus,
        'Last collision with : ' + collided,
        'Keys pressed : ' + getKeys(),
        mouseDown ? 'Mouse : down' : 'Mouse : up',
        paused ? 'Paused' : 'Unpaused',
        'collected : ' + collected,
    ];
    let i = 30;
    debugs.forEach((d) => {
        ctx.fillText(d, 10, i);
        i += 30;
    })
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