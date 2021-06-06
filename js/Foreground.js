import { refreshSmoothies, checkHover, checkCollision, tileSize, cW, cH, offset, direction, collected } from './main.js';
import { SpriteEngine } from './SpriteEngine.js';

export let lastHighlighted = '';
let offsetArr = [-1,-1,0,-1,1,-1,-1,0,1,0,-1,1,0,1,1,1];

export function ForeGround(assets, ctx, interactionMask) {
    this.imgs = assets; 
    this.offset = offset;
    this.spriteEngine = new SpriteEngine(false);
    let buffer = document.createElement("canvas").getContext('2d');
    this.ponctualAnim = null;

    this.render = function() {
        buffer.canvas.width = tileSize * COLS;
        buffer.canvas.height = tileSize * ROWS + 40;
        interactionMask.canvas.width = buffer.canvas.width;
        interactionMask.canvas.height = buffer.canvas.height;
        this.offset = offset;
        
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                refreshSmoothies(buffer);
                refreshSmoothies(interactionMask);
                let value = LEVEL_LAYOUT[i][j];
                let tileX = j * tileSize;
                let tileY = i * tileSize;
                let tempImg;

                if(value == 1) {
                    buffer.drawImage(this.imgs.Barrel1, 0, 0, 18, 26, tileX, tileY + 90, 18*3.5, 26*3.5);
                }
                if(value == 2) {
                    buffer.drawImage(this.imgs.Barrel2, 0, 0, 18, 26, tileX, tileY + 90, 18*3.5, 26*3.5);
                }
                if(value == 3) {
                    buffer.drawImage(this.imgs.Barrel3, 0, 0, 18, 26, tileX, tileY + 90, 18*3.5, 26*3.5);
                }
                if(value == 4) {
                    buffer.drawImage(this.imgs.Barrel4, 0, 0, 18, 26, tileX, tileY + 90, 18*3.5, 26*3.5);
                }
                if(value == 'N') {
                    this.drawInteractable(this.imgs.Newspaper, 0, 0, 53, 28, tileX, tileY + 110, 53*2, 28*2, interactionMask);
                }
                if(value == '!') {
                    buffer.drawImage(this.imgs.Pointer1, 0, 0, 32, 32, tileX, tileY + 80, tileSize / 1.5 - 10, tileSize / 1.5 - 10);
                }
                if (value == '?') {
                    this.drawInteractable(this.imgs.Pointer2, 0, 0, 15, 26, tileX, tileY + 65, 15 * 4, 26 * 4, interactionMask);
                }
                if (value == '<') {
                    buffer.drawImage(this.imgs.Fence1, 0, 0, 32, 32, tileX, tileY + 30, tileSize, tileSize);
                }
                if (value == 'T') {
                    buffer.drawImage(this.imgs.Fence2, 0, 0, 32, 32, tileX, tileY + 30, tileSize, tileSize);
                }
                if (value == '>') {
                    buffer.drawImage(this.imgs.Fence3, 0, 0, 32, 32, tileX, tileY + 30, tileSize, tileSize);
                }
                if (value == 'b') {
                    buffer.drawImage(this.imgs.Bottle1, 0, 0, 49, 16, tileX, tileY + 150, 49*2, 16*2);
                }
                if (value == 'L') {
                    buffer.drawImage(this.imgs.Ladder, 0, 0, 32, 44, tileX, tileY + 140, 32*5, 44*5);
                }
                if (value == '$' && !collected.includes('Money')) {
                    this.drawInteractable(this.imgs.Money, (this.spriteEngine.getFrame() % 6) * 20, 0, 20, 16, tileX, tileY + 30, 20 * 4, 16 * 4, interactionMask);
                }
                if (value == 'C') {
                    tempImg = this.imgs.Cyborg_idle;
                    if(lastHighlighted.includes('Cyborg') && INITIAL_DISTANCE < tileX - offset) {
                        tempImg = this.imgs.Cyborg_idle_L;
                    }
                    this.drawInteractable(tempImg, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 35, tileX, tileY + 30, 105, 153.125, interactionMask);
                }
                if (value == 'P') {
                    tempImg = this.imgs.Punk_idle;
                    if(lastHighlighted.includes('Punk') && INITIAL_DISTANCE < tileX - offset) {
                        tempImg = this.imgs.Punk_idle_L;
                    }
                    this.drawInteractable(tempImg, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 34, tileX, tileY + 30, 105, 148.75, interactionMask);
                }
                if (value == 'Y') {
                    this.drawInteractable(this.imgs.Screen2, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 34, tileX, tileY + 30, 72, 136, interactionMask);
                }
                if (value == 'H') {
                    buffer.drawImage(this.imgs.Platform, (this.spriteEngine.getFrame() % 8) * 32, 0, 32, 32, tileX, tileY, tileSize / 2, tileSize / 2);
                }

                //uncomment to see grid
                //ctx.fillStyle = 'orange';
                //for (let i = 0; i < ROWS + 1; i++) {
                //   buffer.fillRect(0, tileY * i - 1, cW * 3, 3);
                //}
                //for (let i = 0; i < COLS; i++) {
                //    buffer.fillRect(tileX * i -1, 0, 3, cH * 3);
                //}
            }
        }        
        
        if (this.ponctualAnim) {
            buffer.drawImage(this.imgs.MagicBarrier_64x64, (this.spriteEngine.getFrame() % this.ponctualAnim.fr) * 64, 0, 64, 64, 
                tileSize * 7 - 25, 0, 128, 128);
            if(this.spriteEngine.getFrame() >= this.ponctualAnim.fr - 1) {
                this.spriteEngine.setSpeed(150);
                this.ponctualAnim = null;
            }
        }

        ctx.drawImage(buffer.canvas, this.offset-=(direction * SPEED), buffer.canvas.height - cH, cW, cH, 0, 0, cW, cH);
        ctx.drawImage(interactionMask.canvas, this.offset-=(direction * SPEED), interactionMask.canvas.height - cH, cW, cH, 0, 0, cW, cH);
        // uncommment to see INITIAL_DISTANCE
        //ctx.fillStyle = 'red';       
        //ctx.fillRect(INITIAL_DISTANCE - 2, 0, 4, cH);
    }

    this.drawInteractable = function(sprite, frame, z, cx, cy, x, y, sx, sy, ctx) {
        let hitbox = {}; 
        let thick = 2;
        ctx.fillStyle = 'lime';

        hitbox = this.getHitbox(x, y, sx, sy, ctx);

        if(checkHover(hitbox) || checkCollision(hitbox, sprite.src)) {
            lastHighlighted = sprite.src.split(/[\./]/).slice(-2, -1)[0];
            for(let i = 0; i < offsetArr.length; i += 2) {
                ctx.drawImage(sprite, frame, z, cx, cy, x - thick + offsetArr[i]*thick, y - thick + offsetArr[i+1] * thick, sx + thick * 2, sy + thick * 2 - 2);
            }
            
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillRect(x - 4, y - 4, sx + thick * 2 + 4, sy + thick * 2 + 4);
            ctx.globalCompositeOperation = "source-over";
        }

        ctx.drawImage(sprite, frame, z, cx, cy, x, y, sx, sy);
    }

    this.getHitbox = function(x, y, sx, sy, ctx) {
        let hitbox = {
            xMin: x - offset,
            xMax: x - offset + sx,
            yMin: cH - ctx.canvas.height + y,
            yMax: cH - ctx.canvas.height + y + sy
        }
        // un comment to see hitboxes
        //interactionMask.fillRect(offset + hitbox.xMin, y + firstRow, hitbox.xMax - hitbox.xMin, hitbox.yMax - hitbox.yMin);
        return hitbox;
    } 

    this.triggerAnim = function(object, hitbox, frames) {
        this.ponctualAnim = {ob: object, hb: hitbox, fr: frames};
        this.spriteEngine.setSpeed(15);
        this.spriteEngine.resetFrame();
    }

    console.timeLog('time', ' - Foreground Renderer® unbridled');
}

