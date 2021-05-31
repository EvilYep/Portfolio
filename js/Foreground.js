import { refreshSmoothies, checkHover, checkCollision, getHitbox, tileSize, cW, cH, offset, speed } from './main.js';
import { SpriteEngine } from './SpriteEngine.js';

export let highlight = 'bla';
let lastHighlighted = 'bla';

export function ForeGround(assets, ctx, buffer, interactionMask) {
    this.imgs = assets; 
    this.offset = offset;
    this.spriteEngine = new SpriteEngine();

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
                    drawInteractable(this.imgs.Newspaper, 0, 0, 55, 30, tileX, tileY + 110, 55*2, 30*2, i + 1, interactionMask);
                }
                if(value == '!') {
                    buffer.drawImage(this.imgs.Pointer1, 0, 0, 32, 32, tileX, tileY + 80, tileSize / 1.5 - 10, tileSize / 1.5 - 10);
                }
                if (value == '?') {
                    drawInteractable(this.imgs.Pointer2, 0, 0, 32, 32, tileX, tileY + 45, tileSize / 1.5, tileSize / 1.5, i + 1, interactionMask);
                    //clickables['interrogationSign'] = [tileX, tileY];
                    //neededStuffIDontKnowHowToCall[i][j] = value;
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
                if (value == 'C') {
                    tempImg = this.imgs.Cyborg_idle;
                    if(lastHighlighted.includes('Cyborg') && INITIAL_DISTANCE < tileX - offset) {
                        tempImg = this.imgs.Cyborg_idle_L;
                    }
                    drawInteractable(tempImg, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 48, tileX, tileY-30, 105, 210, i + 1, interactionMask);
                }
                if (value == 'P') {
                    tempImg = this.imgs.Punk_idle;
                    if(lastHighlighted.includes('Punk') && INITIAL_DISTANCE < tileX - offset) {
                        tempImg = this.imgs.Punk_idle_L;
                    }
                    drawInteractable(tempImg, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 48, tileX, tileY-30, 105, 210, i + 1, interactionMask);
                }
                if (value == 'Y') {
                    drawInteractable(this.imgs.Screen2, (this.spriteEngine.getFrame() % 4) * 32, 0, 32, 42, tileX, tileY - 5, tileSize - 40, tileSize, i + 1, interactionMask);
                }
                if (value == 'H') {
                    buffer.drawImage(this.imgs.Platform, (this.spriteEngine.getFrame() % 8) * 32, 0, 32, 32, tileX, tileY, tileSize / 2, tileSize / 2);
                }

                //uncomment to see grid
                //for (let i = 0; i < ROWS; i++) {
                //    buffer.fillRect(0, tileY * i - 1, cW * 3, 3);
                //}
                //for (let i = 0; i < COLS; i++) {
                //    buffer.fillRect(tileX * i -1, 0, 3, cH * 3);
                //}
            }
        }        
        ctx.drawImage(buffer.canvas, this.offset-=(speed * SPEED), buffer.canvas.height - cH, cW, cH, 0, 0, cW, cH);
        ctx.drawImage(interactionMask.canvas, this.offset-=(speed * SPEED), interactionMask.canvas.height - cH, cW, cH, 0, 0, cW, cH);
        // uncommment to see INITIAL_DISTANCE
        /* ctx.fillStyle = 'red';       
        ctx.fillRect(INITIAL_DISTANCE - 2, 0, 4, cH); */
    }

    console.timeLog('time');
    console.log('Foreground Renderer® catapulted');
}

function drawInteractable(sprite, frame, z, cx, cy, x, y, sx, sy, row, ctx) {
    let offsetArr = [-1,-1,0,-1,1,-1,-1,0,1,0,-1,1,0,1,1,1];
    let hitbox = {}; 
    let thick = 2;
    ctx.fillStyle = 'lime';

    hitbox = getHitbox(sprite, frame, z, cx, cy, x, y, sx, sy, row);
    highlight = 'bla';

    if(checkHover(hitbox) || checkCollision(hitbox)) {
        highlight = sprite.src.split(/[\./]/).slice(-2, -1)[0];
        lastHighlighted = sprite.src.split(/[\./]/).slice(-2, -1)[0];
        for(let i = 0; i < offsetArr.length; i += 2) {
            ctx.drawImage(sprite, frame, z, cx, cy, x - thick + offsetArr[i]*thick, y - thick + offsetArr[i+1] * thick, sx + thick * 2, sy + thick * 2 - 2);
        }
        
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillRect(x, y, sx + thick * 2, sy + thick * 2);
        ctx.globalCompositeOperation = "source-over";
    } 
    // un comment to see hitboxes
    //ctx.fillRect(hitbox.xMin + offset, y + hitbox.firstRow, hitbox.xMax - hitbox.xMin, hitbox.yMax - hitbox.yMin);

    ctx.drawImage(sprite, frame, z, cx, cy, x, y, sx, sy);
}