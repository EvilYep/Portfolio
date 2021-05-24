let ctx = document.getElementById('my-canvas').getContext('2d');
let buffer = document.createElement("canvas").getContext('2d');
let cW = document.documentElement.clientWidth - GLOBAL_MARGIN;
let cH = document.documentElement.clientHeight - GLOBAL_MARGIN;
let speed = 0;
let distance = INITIAL_DISTANCE;

let status = 'idle';
let facing = 'right';
let maxFrame = 4;
let currentFrame = 0;

function resetCoords() {
    cW = document.documentElement.clientWidth - GLOBAL_MARGIN;
    cH = document.documentElement.clientHeight - GLOBAL_MARGIN;
}

function refreshSmoothies() {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    buffer.mozImageSmoothingEnabled = false;
    buffer.webkitImageSmoothingEnabled = false;
    buffer.msImageSmoothingEnabled = false;
    buffer.imageSmoothingEnabled = false;
}

function BackGround() {
    //resetCoords();
    this.x = 0;
    this.x2 = 0;
    this.x3 = 0; 
    this.x4 = 0;
    this.xRoad = 0;
    this.y = 0; 
    this.scaling = cW / 0.63;
    
    // Dark magic revolving around unusual background images resolutions and an initial idea of a fixed 'display' window size
    // And since there's NO WAY I'm changing these sweets free assets.....
    this.render = function() {
        ctx.drawImage(bg5, 0, 0);
        ctx.drawImage(bg4, this.x4-=speed, 0, this.scaling, cH / 1.85);
        ctx.drawImage(bg3, this.x3-=(speed*2), cH / 12, this.scaling, cH / 1.85);
        ctx.drawImage(bg2, this.x2-=(speed*2.5), cH / 8, this.scaling, cH / 1.85);
        ctx.drawImage(bg, this.x-=(speed*3), cH / 6.3, this.scaling, cH / 1.85);
        ctx.drawImage(road, this.xRoad-=(speed*6), cH / 1.43, cW * 7, cH / 3.31);

        if((this.x <= -(this.scaling/3 - 1)) && status == 'running' && speed == 1) { this.x = 0; }
        if((this.x2 <= -(this.scaling/3 - 1)) && status == 'running' && speed == 1) { this.x2 = 0; }
        if((this.x3 <= -(this.scaling/3 - 1)) && status == 'running' && speed == 1) { this.x3 = 0; }
        if((this.x4 <= -(this.scaling/3 - 1)) && status == 'running' && speed == 1) { this.x4 = 0; }

        if((this.x + this.scaling >= cW + (this.scaling/3 -1)) && status == 'running' && speed == -1) { this.x = cW - this.scaling; }
        if((this.x2 + this.scaling >= cW + (this.scaling/3 -1)) && status == 'running' && speed == -1) { this.x2 = cW - this.scaling; }
        if((this.x3 + this.scaling >= cW + (this.scaling/3 -1)) && status == 'running' && speed == -1) { this.x3 = cW - this.scaling; }
        if((this.x4 + this.scaling >= cW + (this.scaling/3 -1)) && status == 'running' && speed == -1) { this.x4 = cW - this.scaling; }

        if(this.xRoad <= -(cW * 3.49) || this.xRoad >= (cW * 3.49)) { this.xRoad = 0; }

        // Pfiiiiiooooouuuuu
    }
}

function ForeGround() {
    this.render = function() {
        buffer.canvas.width = LEVEL_TILE_SIZE * COLS;
        buffer.canvas.height = LEVEL_TILE_SIZE * ROWS;
        
        for (let i = 0; i < levelLayout.length; i++) {
            refreshSmoothies();
            let value = levelLayout[i];
            let tile_x = (i % COLS) * LEVEL_TILE_SIZE;
            let tile_y = Math.floor(i / COLS) * LEVEL_TILE_SIZE;

            buffer.drawImage(tile_sheet, value * DUDES_TILE_SIZE, 0, DUDES_TILE_SIZE, DUDES_TILE_SIZE, tile_x, tile_y, LEVEL_TILE_SIZE, LEVEL_TILE_SIZE);
        }        
        ctx.drawImage(buffer.canvas, distance - INITIAL_DISTANCE, buffer.canvas.height - cH, cW, cH, 0, 0, cW, cH);
    }
}

function Player(resArray) {
    this.imgs = resArray;
    let me = this;

    this.render = function() {
        refreshSmoothies();
        switch(status) {
            case 'idle':
                this.sprite = me.imgs.Biker_idle;
                maxFrame = 4;
                break;
            case 'running':
                if(facing == 'left') {
                    this.sprite = me.imgs.Biker_run_L;
                } else {
                    this.sprite = me.imgs.Biker_run;
                }
                maxFrame = 6;
                break;
            default:
                this.sprite = me.imgs.Biker_idle;
                maxFrame = 4;
                break;
        }
        ctx.drawImage(this.sprite, currentFrame * DUDES_TILE_SIZE, 0, DUDES_TILE_SIZE, DUDES_TILE_SIZE, INITIAL_DISTANCE, cH*60/100, LEVEL_TILE_SIZE, LEVEL_TILE_SIZE);
    }
}

function run(direction) {
    speed = direction;
    if(direction == -1) {
        facing = 'left';
    } else {
        facing = 'right';
    }
    status = 'running';
    currentFrame = 0;
}

function stop() {
    speed = 0;
    status = 'idle';
    facing= 'right'
    currentFrame = 0;
}

// Found out this guy, who had a similar approach to canvasception, huge help !!
// https://github.com/shubhamjain/penguin-walk
function initCanvas(resArray) {
    let background = new BackGround();
    let foreground = new ForeGround();
    let player = new Player(resArray);

    function animateGlobal() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        // Start drawing
        resetCoords();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        foreground.render();
        player.render();

        if(speed == 1) {
            distance += 6;    
        }
        if(speed == -1) {
            distance -= 6; 
        }
        if(distance < INITIAL_DISTANCE) {
            stop();
            run(1);
            setTimeout(function() {
                stop();
            }, 2000);
        }
        if(distance >= BUFFER_MAX_SIZE) {
            stop();
            run(-1);
            setTimeout(function() {
                stop();
            }, 2000);
        }
                
        // End drawing

        ctx.restore();
    }

    function animatePlayerSprite() {
        currentFrame++;
        if(currentFrame >= maxFrame) {
            currentFrame = 0;
        }
    }

    setInterval(animateGlobal, 30);
    setInterval(animatePlayerSprite, 100);
}

function loadResources(imgPaths, whenLoaded)
{
	var imgs = {}, imgCounter = 0;

  	imgPaths.forEach(function(path){
		var img = document.createElement('img');
		img.src = path;

		var fileName = path.split(/[\./]/).slice(-2, -1)[0];
		img.onload = function(){
			imgs[fileName] = img;
			imgCounter++;

			if (imgPaths.length == imgCounter)
			{
                whenLoaded(imgs);	
			}
		};
	});
}

window.addEventListener('load', function(e) {
    loadResources([
        "./assets/bg/5.png",
        "./assets/bg/4.png",
        "./assets/bg/3.png",
        "./assets/bg/2.png",
        "./assets/bg/1.png",
        "./assets/bg/road.png",
        "./assets/player/Biker_hurt.png",
        "./assets/player/Biker_idle.png",
        "./assets/player/Biker_run.png",
        "./assets/player/Biker_run_L.png",
    ], initCanvas);
});

window.addEventListener('mousedown', function(e) {
    if(INITIAL_DISTANCE - e.clientX > 0) {
        run(-1);
    } else {
        run(1);
    }
})

window.addEventListener('mouseup', function(e) {
    stop();
})