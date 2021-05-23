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
    //resetCoords();
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

function ForeGround() {
    this.render = function() {
        buffer.canvas.width = map_tile_size * cols;
        buffer.canvas.height = map_tile_size * rows;
        for (let i = 0; i < map.length; i++) {
            resetSmooth();
            let value = map[i];
            let tile_x = (i % cols) * map_tile_size;
            let tile_y = Math.floor(i / cols) * map_tile_size;

            buffer.drawImage(tile_sheet, value * dude_tile_size, 0, dude_tile_size, dude_tile_size, tile_x, tile_y, map_tile_size, map_tile_size);
        }        
        ctx.drawImage(buffer.canvas, 0, buffer.canvas.height - cH, cW, cH, 0, 0, cW, cH);
    }
    
}

// Found out this guy, who had a similar approach to canvasception, huge help !!
// https://github.com/shubhamjain/penguin-walk
function initCanvas(resArray) {
    
    let background = new BackGround();
    let foreground = new ForeGround();

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        // Start drawing
        resetCoords();
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        //foreground.render();
                
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