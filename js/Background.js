import { refreshSmoothies, speed, cW, cH } from './main.js';
import { SpriteEngine } from './SpriteEngine.js';

export function BackGround(assets, ctx) {
    this.spriteEngine = new SpriteEngine(false);
    this.spriteEngine.setSpeed(50);
    this.imgs = assets; 
    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.scaling = cW / 0.5;
    let initH = 970;
    let offsets = [310, 1068, 1867, 3318, 2358, 3592, 1814];

    this.flipBuffer = document.createElement("canvas").getContext('2d');
    this.flipBuffer.canvas.width = 96 * 2;
    this.flipBuffer.canvas.height = 96 * 2;
    //this.flipBuffer.rotate(45 * Math.PI / 180);
    

    this.render = function() {
        refreshSmoothies(ctx);
        
        //Sky
        ctx.drawImage(this.imgs.bg1, 0, 0);
        //Clouds
        ctx.drawImage(this.imgs.bg2, this.x4 -= (speed * SPEED) / 5 + 0.2, 0, this.scaling, 520);
        // Buildings and their FX
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 14) % 29) * 64, 0, 64, 64, offsets[2] -= (speed * SPEED) / 3, cH - 660, 64, 64);
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 7) % 29) * 64, 0, 64, 64, offsets[3] -= (speed * SPEED) / 3, cH - 692, 64, 64);
        ctx.drawImage(this.imgs.bg3, this.x3 -= (speed * SPEED) / 3, cH - initH + 100, this.imgs.bg3.width * 1.9, 520);
            // 2d layer
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 10) % 29) * 64, 0, 64, 64, offsets[1] -= (speed * SPEED) / 2.5, cH - 790, 192, 192);
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 23) % 29) * 64, 0, 64, 64, offsets[4] -= (speed * SPEED) / 2.5, cH - 683, 150, 150);
        ctx.drawImage(this.drawRotated(this.imgs.TornadoStatic_96x96, 90), 0, 0, 96 * 2, 96 * 2, offsets[6] -= (speed * SPEED) / 2.5, cH - 606, 144, 144);
        ctx.drawImage(this.imgs.bg4, this.x2 -= (speed * SPEED) / 2.5, cH - initH + 170, this.imgs.bg4.width * 1.9, 520);
            //3rd layer
        ctx.drawImage(this.imgs.FireBurst_64x64, (this.spriteEngine.getFrame() % 29) * 64, 0, 64, 64, offsets[0] -= (speed * SPEED) / 2, cH - 616, 128, 128);
        ctx.drawImage(this.imgs.FireBurst_64x64, (this.spriteEngine.getFrame() % 29) * 64, 0, 64, 64, offsets[5] -= (speed * SPEED) / 2, cH - 616, 128, 128);
        ctx.drawImage(this.imgs.bg5, this.x -= (speed * SPEED) / 2, cH - initH + 162, this.imgs.bg5.width * 1.9, 520);
        //Road
        ctx.drawImage(this.imgs.road, this.xRoad -= (speed * SPEED), cH - initH + 655, this.imgs.road.width, 325);

        if(this.x4 <= -(this.scaling/3 - 1)) { this.x4 = 0; }
    }

    this.drawRotated = function(sprite, degrees){  
        this.flipBuffer.clearRect(0, 0, this.flipBuffer.canvas.width, this.flipBuffer.canvas.height);
        this.flipBuffer.save();
        this.flipBuffer.translate(this.flipBuffer.canvas.width / 2, this.flipBuffer.canvas.height / 2);
        this.flipBuffer.rotate(degrees * Math.PI / 180);
        this.flipBuffer.drawImage(sprite, (this.spriteEngine.getFrame() % 89) * 96, 0, 96, 96, 0, 0, 96, 96);
        this.flipBuffer.restore();
        return this.flipBuffer.canvas;
    }

    console.timeLog('time');
    console.log('Background Renderer® launched');
}
