const bg = new Image();
const bg2 = new Image();
const bg3 = new Image();
const bg4 = new Image();
const bg5 = new Image();
const road = new Image();
const tile_sheet = new Image();
const margin = 75;

bg.src = "./assets/bg/5.png";
bg2.src = "./assets/bg/4.png";
bg3.src = "./assets/bg/3.png";
bg4.src = "./assets/bg/2.png";
bg5.src = "./assets/bg/1.png";
road.src = "./assets/bg/road.png"
tile_sheet.src = "./assets/player/Biker_run.png";

const cols = 64;
const rows = 11;
const tile_size = 48;
const map = [
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function initCanvas() {
    let ctx = document.getElementById('my-canvas').getContext('2d');
    let cW = document.documentElement.clientWidth - margin;
    let cH = document.documentElement.clientHeight - margin;
    let coef = 1;

    function BackGround() {
        this.x = 0;
        this.x2 = 0;
        this.x3 = 0; 
        this.x4 = 0;
        this.xRoad = 0;
        this.offset = cW / 0.63;

        this.y = 0; 
        this.render = function() {
            ctx.drawImage(bg5, 0, 0);
            ctx.drawImage(bg4, this.x4-=coef, 0, cW / 0.63, cH / 1.85);
            ctx.drawImage(bg3, this.x3-=(coef*2), cH / 12, cW / 0.63, cH / 1.85);
            ctx.drawImage(bg2, this.x2-=(coef*2.5), cH / 8, cW / 0.63, cH / 1.85);
            ctx.drawImage(bg, this.x-=(coef*3), cH / 6.3, cW / 0.63, cH / 1.85);
            ctx.drawImage(road, this.xRoad-=(coef*4), cH / 1.43, cW * 7, cH / 3.31);


            if(this.x <= -(this.offset/3 - 1) || this.x >= (this.offset/3 - 1) ) { this.x = 0; }
            if(this.x2 <= -(this.offset/3 - 1) || this.x2 >= (this.offset/3 - 1) ) { this.x2 = 0; }
            if(this.x3 <= -(this.offset/3 - 1) || this.x3 >= (this.offset/3 - 1) ) { this.x3 = 0; }
            if(this.x4 <= -(this.offset/3 - 1) || this.x4 >= (this.offset/3 - 1) ) { this.x4 = 0; }
            if(this.xRoad <= -(cW * 7) || this.xRoad >= cW * 7) { this.xRoad = 0; }
        }
    }
    let background = new BackGround()

    function animate() {
        //console.log('animate');
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);


        // Start drawing
        cW = document.documentElement.clientWidth - margin;
        cH = document.documentElement.clientHeight - margin;
        ctx.canvas.width = cW;
        ctx.canvas.height = cH;

        background.render();
        ctx.fillStyle = "lime";
        ctx.fillRect(100, 100, 10, 10);
                
        for (let i = 0; i < map.length - 1; i++) {
            let value = map[i];
            let tile_x = (i % cols) * tile_size;
            let tile_y = Math.floor(i / cols) * tile_size;

            //ctx.drawImage(tile_sheet, value * tile_size, 0, tile_size, tile_size, tile_x, tile_y, tile_size * 2, tile_size * 2);
        }        
        // End drawing

        ctx.restore();
    }
    let animateInterval = setInterval(animate, 30);
}

window.addEventListener('load', function(event) {
    initCanvas();
});