import { speed, cW, cH } from './main.js';

export function BackGround(assets, ctx) {
    console.timeLog('answer time');
    console.log('Background Renderer® launched');
    let bg = new Image();
    let bg2 = new Image();
    let bg3 = new Image();
    let bg4 = new Image();
    let bg5 = new Image();
    let road = new Image();

    bg.src = "./assets/bg/5.png";
    bg2.src = "./assets/bg/4.png";
    bg3.src = "./assets/bg/3.png";
    bg4.src = "./assets/bg/2.png";
    bg5.src = "./assets/bg/1.png";
    road.src = "./assets/bg/road.png";

    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.scaling = cW / 0.5;

    this.render = function() {
        ctx.drawImage(bg5, 0, 0);
        ctx.drawImage(bg4, this.x4 -= (speed * 1.2 + 0.2), 0, this.scaling, cH / 1.85);
        ctx.drawImage(bg3, this.x3 -= (speed * 2), cH / 12, this.scaling, cH / 1.85);
        ctx.drawImage(bg2, this.x2 -= (speed * 2.5), cH / 8, this.scaling, cH / 1.85);
        ctx.drawImage(bg, this.x -= (speed * 3), cH / 6.3, this.scaling * 1.1, cH / 1.85);
        ctx.drawImage(road, this.xRoad -= (speed * 6), cH / 1.48, cW * 7, cH / 3);

        if(this.x4 <= -(this.scaling/3 - 1)) { this.x4 = 0; }
    }
}
