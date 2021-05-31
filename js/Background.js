import { refreshSmoothies, speed, cW, cH } from './main.js';

export function BackGround(assets, ctx) {
    this.imgs = assets; 
    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.scaling = cW / 0.5;
    let initH = 970;

    this.render = function() {
        refreshSmoothies(ctx);
        ctx.drawImage(this.imgs.bg1, 0, 0);
        ctx.drawImage(this.imgs.bg2, this.x4 -= (speed * SPEED) / 5 + 0.2, 0, this.scaling, 520);
        ctx.drawImage(this.imgs.bg3, this.x3 -= (speed * SPEED) / 3, cH - initH + 100, this.imgs.bg3.width * 1.9, 520);
        ctx.drawImage(this.imgs.bg4, this.x2 -= (speed * SPEED) / 2.5, cH - initH + 170, this.imgs.bg4.width * 1.9, 520);
        ctx.drawImage(this.imgs.bg5, this.x -= (speed * SPEED) / 2, cH - initH + 162, this.imgs.bg5.width * 1.9, 520);
        ctx.drawImage(this.imgs.road, this.xRoad -= (speed * SPEED), cH - initH + 655, this.imgs.road.width, 325);

        if(this.x4 <= -(this.scaling/3 - 1)) { this.x4 = 0; }
    }

    console.timeLog('time');
    console.log('Background Renderer® launched');
}
