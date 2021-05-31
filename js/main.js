import { BackGround } from './Background.js';
import { ForeGround } from './Foreground.js';
import { Player } from './Player.js';
import * as Input from './Input.js';
import { drawDebugger } from './debug/Debugger.js';

export let gameWindow = document.getElementById('my-canvas');
let ctx = gameWindow.getContext('2d');
let buffer = document.createElement("canvas").getContext('2d');
let interactionMask = document.createElement("canvas").getContext('2d');
export let tileSize = LEVEL_TILE_SIZES.LG;
export let distance = INITIAL_DISTANCE;
let requestId;
export let bufferMaxSize = tileSize * COLS;
let lastRenderTime;
export let offset = distance - INITIAL_DISTANCE;
export let cW = document.documentElement.clientWidth;
export let cH = document.documentElement.clientHeight;
export let speed = 0;
//let levelMap = Array.from(Array(ROWS), () => new Array(COLS));
let player;

function resetCoords() {
    cW = document.documentElement.clientWidth;
    cH = document.documentElement.clientHeight;
    offset = distance - INITIAL_DISTANCE;
}

export function refreshSmoothies(ctx) {
    ctx.webkitImageSmoothingEnabled = false, ctx.msImageSmoothingEnabled = false, ctx.imageSmoothingEnabled = false;
}

export function getHitbox(sprite, frame, z, cx, cy, x, y, sx, sy, row) {
    let firstRow = sy, firstCol = sx, lastRow = 0, lastCol = 0;

    interactionMask.drawImage(sprite, frame, z, cx, cy, x, y, sx, sy);
    let imgData = interactionMask.getImageData(x, y, sx, sy);
    let pixels = imgData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        if(pixels[i+3] == 255) { // opaque pixel
            if(firstRow > Math.floor(Math.floor((i + 1) / 4) / sx)) {
                firstRow = Math.floor(Math.floor((i + 1) / 4) / sx);
            }
            if(firstCol > Math.floor((i + 1) / 4) % sx) {
                firstCol = Math.floor((i + 1) / 4) % sx;
            }
            if(lastRow < Math.floor(Math.floor(i + 1) / 4) / sx) {
                lastRow = Math.floor(Math.floor(i + 1) / 4) / sx;
            }
            if(lastCol < Math.floor((i + 1) / 4) % sx) {
                lastCol = Math.floor((i + 1) / 4) % sx;
            }
        }
    }
    let hitbox = {
        xMin: x + firstCol - offset,
        xMax: x + lastCol - offset,
        yMin: (cH - interactionMask.canvas.height + y + firstRow),
        yMax: (cH - interactionMask.canvas.height + y + lastRow)
    }
    return hitbox;
}

export function checkHover(hitbox) {
    if(Input.xMouse >= hitbox.xMin && Input.xMouse <= hitbox.xMax && Input.yMouse >= hitbox.yMin && Input.yMouse <= hitbox.yMax) {
        return true;
    }
    return false;
}

export function checkCollision(hitbox) {
    if(player.hitbox.top <= hitbox.yMax && 
        ((player.hitbox.left >= hitbox.xMin && player.hitbox.left <= hitbox.xMax) || (player.hitbox.right >= hitbox.xMin && player.hitbox.right <= hitbox.xMax) ||
        (player.hitbox.left <= hitbox.xMin && player.hitbox.right >= hitbox.xMax))) {
        return true;
    }
    return false;
}

function setPositions() {
    speed = player.speed;
    speed != 0 ? distance = distance + (Math.sign(player.speed) * SPEED) : distance;
    if(distance <= INITIAL_DISTANCE) {
        player.runAwayYouFools(RIGHT);
    }
    if(distance >= bufferMaxSize) {
        player.runAwayYouFools(LEFT);
    }
}

// Credits to this guy for this one ! https://github.com/shubhamjain/penguin-walk
function loadResources(assets, whenLoaded) {
	let imgs = {}, imgCounter = 0;
  	assets.IMGS.forEach(function(path){
		let img = document.createElement('img');
		img.src = path;
		let fileName = path.split(/[\./]/).slice(-2, -1)[0];
		img.onload = function(){
			imgs[fileName] = img;
			imgCounter++;
			assets.IMGS.length == imgCounter ? whenLoaded(imgs) : console.log('suspenseful loading time...');	
		};
	});
}

// MAIN LOOP FUNCTION

function initCanvas(assets) {
    console.log('assets loaded');
    let background = new BackGround(assets, ctx);
    let foreground = new ForeGround(assets, ctx, buffer, interactionMask);
    let gp;
    let gps;
    player = new Player(assets, ctx);
    Input.attachInputListeners(gameWindow, player);
    console.timeEnd('time');
    console.log('Nuts Portfolio® game initiated');

    function animateGlobal(currentTime) {
        requestId = window.requestAnimationFrame(animateGlobal);
        // hack around requestAnimationFrame to fix inconsistencies between browsers https://stackoverflow.com/questions/66323325/canvas-is-drawing-with-inconsistent-speed-requestanimationframe
        // https://mattperry.is/writing-code/browsers-may-throttle-requestanimationframe-to-30fps
        if ((currentTime - lastRenderTime) / 1000 < 1 / FPS) {
            return;
        }
        lastRenderTime = currentTime;

        Input.processGamepadInput(player);
        
        //ctx.save();
        //ctx.clearRect(0, 0, cW, cH);
        resetCoords();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        foreground.render();
        player.render();
        setPositions();

        drawDebugger(ctx, player);

        //ctx.restore();
    }

    animateGlobal();
}

window.onerror = (errorMsg, url, line, col, error) => {
    console.log({attention:'Cette eurrer n\'est pas une eurrer sur le cyclimse. Veuillez vous rapprocher de votre réparateur de sites', 
                 msg: errorMsg, 
                 url: url,
                 line: line,
                 error: error});
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    return true;
};

// LET's GOOOOOOO !

window.addEventListener('load', function(e) {
    console.time('time');
    loadResources(ASSETS, initCanvas);
});