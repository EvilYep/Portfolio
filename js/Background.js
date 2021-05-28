import { speed, cW, cH } from './main.js';

export function BackGround(assets, ctx) {
    console.timeLog('answer time');
    console.log('Background Renderer® launched');
    this.imgs = assets; 
    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.scaling = cW / 0.5;
    let initH = 970;
    let bg = new Image();
    let bg2 = new Image();
    let bg3 = new Image();
    let bg4 = new Image();
    let bg5 = new Image();
    let road = new Image();

    this.render = function() {
        ctx.drawImage(this.imgs.bg1, 0, 0);
        ctx.drawImage(this.imgs.bg2, this.x4 -= (speed * 1.2 + 0.2), 0, this.scaling, 520);
        ctx.drawImage(this.imgs.bg3, this.x3 -= (speed * 2), cH - initH + 100, this.scaling, 520);
        ctx.drawImage(this.imgs.bg4, this.x2 -= (speed * 2.5), cH - initH + 170, this.scaling, 520);
        ctx.drawImage(this.imgs.bg5, this.x -= (speed * 3), cH - initH + 162, this.scaling * 1.1, 520);
        ctx.drawImage(this.imgs.road, this.xRoad -= (speed * 6), cH - initH + 655, cW * 7, 325);

        if(this.x4 <= -(this.scaling/3 - 1)) { this.x4 = 0; }
    }
}
