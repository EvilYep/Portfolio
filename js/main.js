let ctx = document.getElementById('my-canvas').getContext('2d');
let buffer = document.createElement("canvas").getContext('2d');
let cW = document.documentElement.clientWidth - margin;
let cH = document.documentElement.clientHeight - margin;
let coef = 1;

function resetCoords() {
    cW = document.documentElement.clientWidth - margin;
    cH = document.documentElement.clientHeight - margin;
}

function resetSmooth() {
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
    resetCoords();
    this.x = 0;
    this.x2 = 0;
    this.x3 = 0; 
    this.x4 = 0;
    this.xRoad = 0;
    this.y = 0; 
    this.offset = cW / 0.63;
    
    // Dark magic revolving around unusual background images resolutions and an initial fixed size of the 'display' window
    this.render = function() {
        ctx.drawImage(bg5, 0, 0);
        ctx.drawImage(bg4, this.x4-=coef, 0, this.offset, cH / 1.85);
        ctx.drawImage(bg3, this.x3-=(coef*2), cH / 12, this.offset, cH / 1.85);
        ctx.drawImage(bg2, this.x2-=(coef*2.5), cH / 8, this.offset, cH / 1.85);
        ctx.drawImage(bg, this.x-=(coef*3), cH / 6.3, this.offset, cH / 1.85);
        ctx.drawImage(road, this.xRoad-=(coef*4), cH / 1.43, cW * 7, cH / 3.31);

        if(this.x <= -(this.offset/3 - 1) || this.x >= (this.offset/3 - 1) ) { this.x = 0; }
        if(this.x2 <= -(this.offset/3 - 1) || this.x2 >= (this.offset/3 - 1) ) { this.x2 = 0; }
        if(this.x3 <= -(this.offset/3 - 1) || this.x3 >= (this.offset/3 - 1) ) { this.x3 = 0; }
        if(this.x4 <= -(this.offset/3 - 1) || this.x4 >= (this.offset/3 - 1) ) { this.x4 = 0; }
        if(this.xRoad <= -(cW * 3.49) || this.xRoad >= cW * 3.49) { this.xRoad = 0; }
    }
}

// Found out this guy, who had a similar approach to canvasception, huge help !!
// https://github.com/shubhamjain/penguin-walk
function initCanvas() {
    let background = new BackGround()

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        // Start drawing
        resetCoords();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;
        buffer.canvas.width = tile_size * cols;
        buffer.canvas.height = tile_size * rows;

        background.render();
                
        for (let i = 0; i < map.length; i++) {
            resetSmooth();
            let value = map[i];
            let tile_x = (i % cols) * tile_size;
            let tile_y = Math.floor(i / cols) * tile_size;

            buffer.drawImage(tile_sheet, value * tile_size, 0, tile_size, tile_size, tile_x, tile_y, tile_size, tile_size);
        }        
        ctx.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
        // End drawing

        ctx.restore();
    }
    let animateInterval = setInterval(animate, 30);
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
    ], initCanvas);
});