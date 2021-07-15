import { BackGround } from './Background.js';
import { ForeGround } from './Foreground.js';
import { Player } from './Player.js';
import { UI } from './UI.js';
import * as Input from './Input.js';
import { drawDebugger } from './debug/Debugger.js';
import { EasterEgg } from './EasterEgg.js';

export let gameWindow = document.getElementById('my-canvas');
export let tileSize = LEVEL_TILE_SIZES.LG;
export let distance = INITIAL_DISTANCE;
export let bufferMaxSize = tileSize * COLS; 
export let offset = distance - INITIAL_DISTANCE;
export let cW = document.documentElement.clientWidth;
export let cH = document.documentElement.clientHeight;
export let direction = 0;
export let collided = '';
export let collected = [];
export let paused = true;
let ctx = gameWindow.getContext('2d');
let interactionMask = document.createElement("canvas").getContext('2d');
let background;
let foreground;
let requestId;              // returned by RAF, used a a parameter to cancelRAF
let lastRenderTime;
let player;
let GUI;
let imgs = {}; 
let sfxs = {}; 

export function togglePause() {
    if (!paused && GUI.hidden) {
        player.stop();
        GUI.displayUI();
        paused = !paused;
    }else if(paused && GUI.set) {
        GUI.hideUI();
        paused = !paused;
    }
}

function resizeIfNecessary() {
    cW = document.documentElement.clientWidth;
    cH = document.documentElement.clientHeight;
    offset = distance - INITIAL_DISTANCE;
}

export function refreshSmoothies(ctx) {
    ctx.webkitImageSmoothingEnabled = false, ctx.msImageSmoothingEnabled = false, ctx.imageSmoothingEnabled = false;
}

export function checkHover(hitbox) {
    if(Input.xMouse >= hitbox.xMin && Input.xMouse <= hitbox.xMax && Input.yMouse >= hitbox.yMin && Input.yMouse <= hitbox.yMax) {
        return true;
    }
    return false;
}

export function checkCollision(hitbox, object) {
    if(player.hitbox.top <= hitbox.yMax && player.hitbox.bottom >= hitbox.yMin &&
        ((player.hitbox.left >= hitbox.xMin && player.hitbox.left <= hitbox.xMax) 
        || (player.hitbox.right >= hitbox.xMin && player.hitbox.right <= hitbox.xMax) 
        || (player.hitbox.left <= hitbox.xMin && player.hitbox.right >= hitbox.xMax))) {
        collided = object.split(/[\./]/).slice(-2, -1)[0];
        checkIfCollectible(collided, hitbox);
        return true;
    }
    return false;
}

function checkIfCollectible(object, hitbox) {
    if(['Money'].includes(object) && !collected.includes(object)) {
        collected.push(object);
        sfxs.Coin.play();
        foreground.triggerAnim(object, hitbox, 33);
    }
}

function prepareNextFrame() {
    // Render world depending on player's movements
    direction = player.direction;
    direction != 0 ? distance = distance + (Math.sign(player.direction) * SPEED) : distance;
    // Has player tried to cross boundaries ? // You bad, bad player !
    if(distance <= INITIAL_DISTANCE) {
        player.runAwayYouFools(RIGHT);
    }
    if(distance >= bufferMaxSize) {
        player.runAwayYouFools(LEFT);
    }
}

// MAIN LOOP FUNCTION

function initCanvas() {
    console.timeLog('time', ' - Assets loaded');

    background = new BackGround(imgs, ctx);
    foreground = new ForeGround(imgs, ctx, interactionMask);
    GUI = new UI(imgs, ctx);
    player = new Player(imgs, ctx);
    let easterEgg = new EasterEgg();
    easterEgg.start(() => { sfxs.Monkey.play(); });
    Input.attachInputListeners(gameWindow, player, easterEgg);


    function animateGlobal(currentTime) {
        requestId = window.requestAnimationFrame(animateGlobal);
        // hack around requestAnimationFrame to fix inconsistencies between browsers 
        // https://stackoverflow.com/questions/66323325/canvas-is-drawing-with-inconsistent-speed-requestanimationframe
        // https://mattperry.is/writing-code/browsers-may-throttle-requestanimationframe-to-30fps
        if ((currentTime - lastRenderTime) / 1000 < 1 / FPS) {
            return;
        }
        lastRenderTime = currentTime;

        Input.processGamepadInput(player, easterEgg);
        
        resizeIfNecessary();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        foreground.render();
        player.render();
        GUI.render();

        drawDebugger(ctx, player);
        
        prepareNextFrame();
    }

    console.timeLog('time', ' - Nuts Portfolio® game initiated');
    console.timeEnd('time');
    
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
    ctx.fillStyle = "blue";
    ctx.font = "bold 30px Arial";
    ctx.fillText("Loading ...", 15, 30);
    loadResources(ASSETS, initCanvas);
});

// Credits to this guy for this one ! https://github.com/shubhamjain/penguin-walk
function loadResources(assets, whenLoaded) {
    document.fonts.load('30px AtariST').then(() => {
        let imgCounter = 0;
        let sfxCounter = 0;
        assets.IMGS.forEach(function(path){
            let img = document.createElement('img');
            img.src = path;
            let fileName = path.split(/[\./]/).slice(-2, -1)[0];
            img.onload = function(){
                ctx.clearRect(15, 50, gameWindow.width, 30);
                ctx.fillText("Img " + imgCounter + "/" + assets.IMGS.length, 15, 80);
                imgs[fileName] = img;
                imgCounter++;
                (assets.IMGS.length == imgCounter) && (assets.SFX.length == sfxCounter) ? whenLoaded() : console.log('suspenseful loading time...');	
            };
        });
        assets.SFX.forEach(function(path){
            let sfx = document.createElement('audio');
            sfx.src = path;
            let fileName = path.split(/[\./]/).slice(-2, -1)[0];
            sfx.onloadeddata = function() {
                ctx.clearRect(15, 100, gameWindow.width, gameWindow.height);
                ctx.fillText("Sfx " + sfxCounter + "/" + assets.SFX.length, 15, 130);
                sfxs[fileName] = sfx;
			    sfxCounter++;
                (assets.IMGS.length == imgCounter) && (assets.SFX.length == sfxCounter) ? whenLoaded() : console.log('suspenseful loading time...');
            };
        });
    });
}