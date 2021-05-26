import { SpriteEngine } from './SpriteEngine.js';
import { BackGround } from './Background.js';
import { ForeGround } from './Foreground.js';
import * as Player from './Player.js';

let gameWindow = document.getElementById('my-canvas');
let ctx = gameWindow.getContext('2d');
let buffer = document.createElement("canvas").getContext('2d');
let interactionMask = document.createElement("canvas").getContext('2d');
export let tileSize = LEVEL_TILE_SIZES.LG;
let distance = INITIAL_DISTANCE;
let requestId;
let xMouse = 0, yMouse = 0;
let bufferMaxSize = tileSize * COLS;
export let middleOfTheRoad = 0;
export let offset = distance - INITIAL_DISTANCE;
export let marginB = 0;
export let cW = document.documentElement.clientWidth;
export let cH = document.documentElement.clientHeight;
export let speed = 0;
//let levelMap = Array.from(Array(ROWS), () => new Array(COLS));

function checkUndesirableResizes() {
    tileSize = cH < 700 ? LEVEL_TILE_SIZES.SM : LEVEL_TILE_SIZES.LG;
}

function resetCoords() {
    cW = document.documentElement.clientWidth;
    cH = document.documentElement.clientHeight;
    marginB = 2/100 * cH;
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
        yMin: cH - marginB - tileSize * (4 - row) + firstRow,
        yMax: cH - marginB - tileSize * (4 - row) + lastRow
    }
    return hitbox;
}

export function checkHover(hitbox) {
    if(xMouse >= hitbox.xMin && xMouse <= hitbox.xMax && yMouse >= hitbox.yMin && yMouse <= hitbox.yMax) {
        return true;
    }
    return false;
}

export function checkCollision(hitbox) {
    let playerHB = {
        left: INITIAL_DISTANCE + 16,
        right: INITIAL_DISTANCE + 102,
        top: middleOfTheRoad - 210 +60
    }
    if(playerHB.top <= hitbox.yMax && 
        ((playerHB.left >= hitbox.xMin && playerHB.left <= hitbox.xMax) || (playerHB.right >= hitbox.xMin && playerHB.right <= hitbox.xMax) ||
        (playerHB.left <= hitbox.xMin && playerHB.right >= hitbox.xMax))) {
        return true;
    }
    return false;
}

// Credits to this guy for this one ! https://github.com/shubhamjain/penguin-walk
function loadResources(imgPaths, whenLoaded) {
	let imgs = {}, imgCounter = 0;
  	imgPaths.forEach(function(path){
		let img = document.createElement('img');
		img.src = path;
		let fileName = path.split(/[\./]/).slice(-2, -1)[0];
		img.onload = function(){
			imgs[fileName] = img;
			imgCounter++;
			imgPaths.length == imgCounter ? whenLoaded(imgs) : console.log('suspenseful loading time...');	
		};
	});
}

// MAIN LOOP FUNCTION

function initCanvas(resArray) {
    let spriteEngine = new SpriteEngine();
    let background = new BackGround(resArray, ctx);
    let foreground = new ForeGround(resArray, ctx, spriteEngine, buffer, interactionMask);
    let player = new Player.Player(resArray, ctx, spriteEngine);
    
    function animateGlobal() {
        setTimeout(function() {
            requestId = window.requestAnimationFrame(animateGlobal);
            ctx.save();
            ctx.clearRect(0, 0, cW, cH);
            resetCoords();
            checkUndesirableResizes();
            ctx.canvas.width = cW;
            ctx.canvas.height = cH;

            background.render();
            foreground.render();
            player.render();
    
            speed = Player.speed;
            speed != 0 ? distance = distance + (Math.sign(speed)*6) : distance;
            if(distance < INITIAL_DISTANCE) {
                Player.runAwayYouFools(RIGHT);
            }
            if(distance >= bufferMaxSize) {
                Player.runAwayYouFools(LEFT);
            }

            ctx.restore();
        }, 1000 / FPS)
    }

    animateGlobal();
}

// CONTROLS
export function startMove(e) {
    INITIAL_DISTANCE - e.clientX > 0 ? Player.run(LEFT) : Player.run(RIGHT);
}

gameWindow.onmousemove = (e) => {
    setTimeout(function() {
        xMouse = e.pageX;
        yMouse = e.pageY;
    }, 1000 / FPS)
};

gameWindow.onclick = (e) => {
    //console.log('pageX : ', e.pageX, e.pageY , xMouse, yMouse);
};gameWindow

window.onmousedown = (e) => {
    if(e.clientX < INITIAL_DISTANCE + 5 || e.clientX > INITIAL_DISTANCE + 110) {
        startMove(e);
        //gameWindow.addEventListener('mousemove', startMove(e));
    }
};

window.onmouseup = (e) => {
    gameWindow.removeEventListener('mousemove', startMove);
    Player.stop();
};

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
    console.log('plugin controllers....');
    console.log('Nuts Portfolio® game initiated');
    console.time('answer time');
    loadResources([
        "./assets/bg/5.png", "./assets/bg/4.png", "./assets/bg/3.png", "./assets/bg/2.png", "./assets/bg/1.png", "./assets/bg/road.png",
        "./assets/player/Biker_hurt.png", "./assets/player/Biker_idle.png", "./assets/player/Biker_run.png", "./assets/player/Biker_run_L.png",
        "./assets/objects/Pointer1.png", "./assets/objects/Pointer2.png",
        "./assets/objects/Fence1.png", "./assets/objects/Fence2.png", "./assets/objects/Fence3.png",
        "./assets/objects/Screen2.png", "./assets/objects/Platform.png", "./assets/objects/Newspaper.png",
    ], initCanvas);
});