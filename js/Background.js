import { refreshSmoothies, direction, cW, cH } from './main.js';
import { SpriteEngine } from './SpriteEngine.js';

export function BackGround(assets, ctx) {
    this.spriteEngine = new SpriteEngine(false);
    this.spriteEngine.setSpeed(50);
    this.imgs = assets; 
    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.xDelorean = 3600, this.xD1 = 3507, this.xD2 = 3605; 
    this.scaling = cW * 2;
    let initH = 970;
    let offsets = [310, 1068, 1867, 3318, 2358, 3592, 1814, 864, 2822, 1617, 2502];

    this.flipBuffer = document.createElement("canvas").getContext('2d');
    this.flipBuffer.canvas.width = 96 * 2;
    this.flipBuffer.canvas.height = 96 * 2;
    
    this.render = function() {
        refreshSmoothies(ctx);
        
        //Sky
        ctx.drawImage(this.imgs.bg1, 0, 0);
        //Clouds
        ctx.drawImage(this.imgs.bg2, this.x4 -= (direction * SPEED) / 5 + 0.2, 0, this.scaling, 520);
        // Buildings and their FX
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 14) % 29) * 64, 0, 64, 64, offsets[2] -= (direction * SPEED) / 3, cH - 660, 64, 64);
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 7) % 29) * 64, 0, 64, 64, offsets[3] -= (direction * SPEED) / 3, cH - 692, 64, 64);
        ctx.drawImage(this.imgs.bg3, this.x3 -= (direction * SPEED) / 3, cH - initH + 101, this.imgs.bg3.width * 1.9, 520);
            // 2d layer
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 10) % 29) * 64, 0, 64, 64, offsets[1] -= (direction * SPEED) / 2.5, cH - 790, 192, 192);
        ctx.drawImage(this.imgs.FireBurst_64x64, ((this.spriteEngine.getFrame() + 23) % 29) * 64, 0, 64, 64, offsets[4] -= (direction * SPEED) / 2.5, cH - 683, 150, 150);
        ctx.drawImage(this.drawRotated(this.imgs.TornadoStatic_96x96, 90, 89, 96), 0, 0, 96 * 2, 96 * 2, offsets[6] -= (direction * SPEED) / 2.5, cH - 606, 144, 144);
        ctx.drawImage(this.drawRotated(this.imgs.IcePick_64x64, 90, 30, 64), 0, 0, 96 * 2, 96 * 2, offsets[7] -= (direction * SPEED) / 2.5, cH - 657, 256, 256);
        ctx.drawImage(this.drawRotated(this.imgs.IcePick_64x64, 90, 30, 64), 0, 0, 96 * 2, 96 * 2, offsets[8] -= (direction * SPEED) / 2.5, cH - 727, 256, 256);
        ctx.drawImage(this.imgs.FireBall_64x64, ((this.spriteEngine.getFrame() + 23) % 45) * 64, 0, 64, 64, offsets[10] -= (direction * SPEED) / 2.5, cH - 491, 32, 32);
        ctx.drawImage(this.imgs.bg4, this.x2 -= (direction * SPEED) / 2.5, cH - initH + 170, this.imgs.bg4.width * 1.9, 520);
            //Delorean
        ctx.drawImage(this.drawRotated(this.imgs.Hover_64x64, -90, 45, 64), 0, 0, 64 * 3, 64 * 3, this.xD1-= (direction * SPEED) / 2.75 + 1, cH - 500, 64 * 3, 64 * 2);
        ctx.drawImage(this.drawRotated(this.imgs.Hover_64x64, -90, 45, 64), 0, 0, 64 * 3, 64 * 3, this.xD2-= (direction * SPEED) / 2.75 + 1, cH - 500, 64 * 3, 64 * 2);
        ctx.drawImage(this.imgs.delorean, this.xDelorean -= (direction * SPEED) / 2.75 + 1, cH - 500, 68 * 2.5, 20 * 2.5);
            //3rd layer
        ctx.drawImage(this.imgs.FireBurst_64x64, (this.spriteEngine.getFrame() % 29) * 64, 0, 64, 64, offsets[0] -= (direction * SPEED) / 2, cH - 616, 128, 128);
        ctx.drawImage(this.imgs.FireBurst_64x64, (this.spriteEngine.getFrame() % 29) * 64, 0, 64, 64, offsets[5] -= (direction * SPEED) / 2, cH - 616, 128, 128);
        ctx.drawImage(this.drawRotated(this.imgs.FireBall_64x64, 105, 45, 64), 0, 0, 96 * 2, 96 * 2, offsets[9] -= (direction * SPEED) / 2, cH - 428, 128, 128);
        ctx.drawImage(this.imgs.bg5, this.x -= (direction * SPEED) / 2, cH - initH + 162, this.imgs.bg5.width * 1.9, 520);
        
        //Road
        ctx.drawImage(this.imgs.road, this.xRoad -= (direction * SPEED), cH - initH + 655, this.imgs.road.width, 325);

        if(this.x4 <= -(this.scaling/2 - 1)) { this.x4 = 0; }
        if(this.xDelorean <= -2000) { this.xDelorean = 3600; this.xD1 = 3507; this.xD2 = 3605;  }
    }

    this.drawRotated = function(sprite, degrees, frames, size){  
        this.flipBuffer.clearRect(0, 0, this.flipBuffer.canvas.width, this.flipBuffer.canvas.height);
        this.flipBuffer.save();
        this.flipBuffer.translate(this.flipBuffer.canvas.width / 2, this.flipBuffer.canvas.height / 2);
        this.flipBuffer.rotate(degrees * Math.PI / 180);
        this.flipBuffer.drawImage(sprite, (this.spriteEngine.getFrame() % frames) * size, 0, size, size, 0, 0, size, size);
        this.flipBuffer.restore();
        return this.flipBuffer.canvas;
    }

    console.timeLog('time', ' - Background Renderer® launched');
}
