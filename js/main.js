let ctx = document.getElementById('my-canvas').getContext('2d');
let buffer = document.createElement("canvas").getContext('2d');
let cW = document.documentElement.clientWidth - GLOBAL_MARGIN;
let cH = document.documentElement.clientHeight - GLOBAL_MARGIN;
let distance = INITIAL_DISTANCE;
let tileSize = LEVEL_TILE_SIZES.LG;
let bufferMaxSize = tileSize * COLS;

let status = 'idle', facing = 'right';
let speed = 0, maxFrame = 4, currentFrame = 0, currentObjectFrame = 0, middleOfTheRoad = 0;

function checkUndesirableResizes() {
    tileSize = cH < 700 ? LEVEL_TILE_SIZES.SM : LEVEL_TILE_SIZES.LG;
}

function resetCoords() {
    cW = document.documentElement.clientWidth - GLOBAL_MARGIN;
    cH = document.documentElement.clientHeight - GLOBAL_MARGIN;
}

function refreshSmoothies() {
    ctx.mozImageSmoothingEnabled = false, ctx.webkitImageSmoothingEnabled = false, ctx.msImageSmoothingEnabled = false, ctx.imageSmoothingEnabled = false;
    buffer.mozImageSmoothingEnabled = false, buffer.webkitImageSmoothingEnabled = false, buffer.msImageSmoothingEnabled = false, buffer.imageSmoothingEnabled = false;
}

function BackGround() {
    this.x = 0, this.x2 = 0, this.x3 = 0, this.x4 = 0, this.xRoad = 0, this.y = 0; 
    this.scaling = cW / 0.5;
    
    // Dark magic revolving around unusual background images resolutions and an initial idea of a fixed 'display' window size
    // And since there's NO WAY I'm changing these sweets free assets, wud'ov tak' me yoars t'do doz, mate !.....
    this.render = function() {
        ctx.drawImage(bg5, 0, 0);
        ctx.drawImage(bg4, this.x4-=speed*1.2, 0, this.scaling, cH / 1.85);
        ctx.drawImage(bg3, this.x3-=(speed*2), cH / 12, this.scaling, cH / 1.85);
        ctx.drawImage(bg2, this.x2-=(speed*2.5), cH / 8, this.scaling, cH / 1.85);
        ctx.drawImage(bg, this.x-=(speed*3), cH / 6.3, this.scaling * 1.1, cH / 1.85);
        ctx.drawImage(road, this.xRoad-=(speed*6), cH / 1.48, cW * 7, cH / 3);
    }
}

function ForeGround(resArray) {
    this.imgs = resArray;
    this.marginB = 2/100 * cH; 
    
    this.render = function() {
        buffer.canvas.width = tileSize * COLS;
        buffer.canvas.height = tileSize * ROWS;
        
        for (let i = 0; i < levelLayout.length; i++) {
            refreshSmoothies();
            let value = levelLayout[i];
            let tile_x = (i % COLS) * tileSize;
            let tile_y = Math.floor(i / COLS) * tileSize;

            if(value == '!') {
                buffer.drawImage(this.imgs.Pointer1, 0, 0, 32, 32, tile_x, tile_y, tileSize - 10, tileSize - 10);
            }
            if (value == '?') {
                buffer.drawImage(this.imgs.Pointer2, 0, 0, 32, 32, tile_x, tile_y, tileSize - 5, tileSize - 5);
            }
            if (value == '<') {
                buffer.drawImage(this.imgs.Fence1, 0, 0, 32, 32, tile_x, tile_y, tileSize, tileSize);
            }
            if (value == 'T') {
                buffer.drawImage(this.imgs.Fence2, 0, 0, 32, 32, tile_x, tile_y, tileSize, tileSize);
            }
            if (value == '>') {
                buffer.drawImage(this.imgs.Fence3, 0, 0, 32, 32, tile_x, tile_y, tileSize, tileSize);
            }
            if (value == 'P') {
                buffer.drawImage(this.imgs.Screen2, currentObjectFrame * 32, 0, 32, 42, tile_x, tile_y - 5, tileSize - 40, tileSize);
            }
        }        
        ctx.drawImage(buffer.canvas, distance - INITIAL_DISTANCE, buffer.canvas.height - cH, cW, cH, 0, -this.marginB, cW, cH);
    }
}

function Player(resArray) {
    this.imgs = resArray;

    this.render = function() {
        refreshSmoothies();
        middleOfTheRoad = (cH + (cH / 1.48)) / 2 ;
        switch(status) {
            case 'idle':
                this.sprite = this.imgs.Biker_idle;
                maxFrame = 4;
                break;
            case 'running':
                this.sprite = facing == 'left' ? this.imgs.Biker_run_L : this.imgs.Biker_run;
                maxFrame = 6;
                break;
            default:
                this.sprite = this.imgs.Biker_idle;
                maxFrame = 4;
                break;
        }
        ctx.drawImage(this.sprite, currentFrame * DUDES_TILE_SIZE, 0, DUDES_TILE_SIZE, DUDES_TILE_SIZE, INITIAL_DISTANCE, middleOfTheRoad - 210, 210, 210);
    }
}

function run(direction) {
    speed = direction;
    facing = direction == -1 ? 'left' : 'right'
    status = 'running';
    currentFrame = 0;
}

function runAwayYouFools(direction) {
    stop();
    run(direction);
    setTimeout(function() {
        stop();
    }, 1000);
}

function stop() {
    speed = 0;
    status = 'idle';
    facing= 'right'
    currentFrame = 0;
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
			imgPaths.length == imgCounter ? whenLoaded(imgs) : console.log('tremendous loading time...');	
		};
	});
}

// MAIN LOOP FUNCTION

function initCanvas(resArray) {
    let background = new BackGround();
    let foreground = new ForeGround(resArray);
    let player = new Player(resArray);

    function animateGlobal() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        resetCoords();
        checkUndesirableResizes();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        foreground.render();
        player.render();
 
        speed != 0 ? distance = distance + (Math.sign(speed)*6) : distance;
        if(distance < INITIAL_DISTANCE) {
            runAwayYouFools(1);
        }
        if(distance >= bufferMaxSize) {
            runAwayYouFools(-1);
        }

        ctx.restore();
    }

    function animateSprites() {
        currentFrame++, currentObjectFrame++;
        currentFrame = currentFrame >= maxFrame ? 0 : currentFrame;
        currentObjectFrame = currentObjectFrame >= 4 ? 0 : currentObjectFrame  
    }

    setInterval(animateGlobal, 30);
    setInterval(animateSprites, 150);
}

// LET's GOOOOOOO !

window.addEventListener('load', function(e) {
    loadResources([
        "./assets/bg/5.png", "./assets/bg/4.png", "./assets/bg/3.png", "./assets/bg/2.png", "./assets/bg/1.png", "./assets/bg/road.png",
        "./assets/player/Biker_hurt.png", "./assets/player/Biker_idle.png", "./assets/player/Biker_run.png", "./assets/player/Biker_run_L.png",
        "./assets/objects/Pointer1.png", "./assets/objects/Pointer2.png",
        "./assets/objects/Fence1.png", "./assets/objects/Fence2.png", "./assets/objects/Fence3.png",
        "./assets/objects/Screen2.png",
    ], initCanvas);
});

window.addEventListener('mousedown', function(e) {
    INITIAL_DISTANCE - e.clientX > 0 ? run(-1) : run(1);
})

window.addEventListener('mouseup', function(e) {
    stop();
})