import { refreshSmoothies, checkHover, checkCollision, getHitbox, tileSize, cW, cH, offset, speed, marginB } from './main.js';

export function ForeGround(resArray, ctx, spriteEngine, buffer, interactionMask) {
    console.timeLog('answer time');
    console.log('Foreground Renderer® catapulted');
    this.imgs = resArray; 
    this.offset = offset;
    
    this.render = function() {
        buffer.canvas.width = tileSize * COLS;
        buffer.canvas.height = tileSize * ROWS;
        interactionMask.canvas.width = buffer.canvas.width;
        interactionMask.canvas.height = buffer.canvas.height;
        this.offset = offset;
        
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                refreshSmoothies(buffer);
                refreshSmoothies(interactionMask);
                let value = levelLayout[i][j];
                let tileX = j * tileSize;
                let tileY = i * tileSize;

                if(value == '!') {
                    buffer.drawImage(this.imgs.Pointer1, 0, 0, 32, 32, tileX, tileY + 5, tileSize - 10, tileSize - 10);
                }
                if (value == '?') {
                    drawInteractable(this.imgs.Pointer2, 0, 0, 32, 32, tileX, tileY, tileSize, tileSize, i + 1, interactionMask);
                    //clickables['interrogationSign'] = [tileX, tileY];
                    //neededStuffIDontKnowHowToCall[i][j] = value;
                }
                if (value == '<') {
                    buffer.drawImage(this.imgs.Fence1, 0, 0, 32, 32, tileX, tileY, tileSize, tileSize);
                }
                if (value == 'T') {
                    buffer.drawImage(this.imgs.Fence2, 0, 0, 32, 32, tileX, tileY, tileSize, tileSize);
                }
                if (value == '>') {
                    buffer.drawImage(this.imgs.Fence3, 0, 0, 32, 32, tileX, tileY, tileSize, tileSize);
                }
                if (value == 'P') {
                    drawInteractable(this.imgs.Screen2, (spriteEngine.getFrame() % 4) * 32, 0, 32, 42, tileX, tileY - 5, tileSize - 40, tileSize, i + 1, interactionMask);
                }
                if (value == 'H') {
                    buffer.drawImage(this.imgs.Platform, (spriteEngine.getFrame() % 8) * 32, 0, 32, 32, tileX, tileY, tileSize - 20, tileSize - 20);
                }

                for (let i = 0; i < ROWS; i++) {
                    interactionMask.fillRect(0, tileY * i - 1, cW * 3, 3);
                }
                for (let i = 0; i < COLS; i++) {
                    interactionMask.fillRect(tileX * i -1, 0, 3, cH * 3);
                }
            }
        }        
        ctx.drawImage(buffer.canvas, this.offset-=(speed*6), buffer.canvas.height - cH, cW, cH, 0, -marginB, cW, cH);
        ctx.drawImage(interactionMask.canvas, this.offset-=(speed*6), buffer.canvas.height - cH, cW, cH, 0, -marginB, cW, cH);
        ctx.fillStyle = 'red';
        ctx.fillRect(INITIAL_DISTANCE - 2, 0, 4, cH);
    }
}

function drawInteractable(sprite, frame, z, cx, cy, x, y, sx, sy, row, ctx) {
    let offsetArr = [-1,-1,0,-1,1,-1,-1,0,1,0,-1,1,0,1,1,1];
    let hitbox = {}; 
    let thick = 2.5;
    ctx.fillStyle = 'lime';

    hitbox = getHitbox(sprite, frame, z, cx, cy, x, y, sx, sy, row);

    if(checkHover(hitbox) || checkCollision(hitbox)) {
        for(let i = 0; i < offsetArr.length; i += 2) {
            ctx.drawImage(sprite, frame, z, cx, cy, x - thick + offsetArr[i]*thick, y - thick + offsetArr[i+1] * thick, sx + thick * 2, sy + thick * 2 - 2);
        }
        
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillRect(x, y, sx + thick * 2, sy + thick * 2);
        ctx.globalCompositeOperation = "source-over";
    } 

    ctx.drawImage(sprite, frame, z, cx, cy, x, y, sx, sy);
}