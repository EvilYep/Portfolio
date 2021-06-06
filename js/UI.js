import { SpriteEngine } from './SpriteEngine.js';
import { refreshSmoothies, cH, cW, paused, direction } from './main.js';

let xUI = 0; 
let yUI = 0;
let goRight;
let goUp;

export function UI(assets, ctx) {
    this.imgs = assets;
    this.spriteEngine = new SpriteEngine(false);
    this.spriteEngine.setSpeed(150);
    this.X = 0;
    this.Y = 0;
    this.hidden = !paused;
    this.set = paused;
    let buffer = document.createElement("canvas").getContext('2d');
    let textBuffer = document.createElement("canvas").getContext('2d');

    this.render = function() {
        if (!this.hidden) {                     // PAUSE MENU
            buffer.canvas.width = cW * 2;
            buffer.canvas.height = cH * 2;
            textBuffer.canvas.width = cW;
            textBuffer.canvas.height = cH;
            refreshSmoothies(textBuffer);
            refreshSmoothies(buffer);
            refreshSmoothies(ctx);
            textBuffer.fillStyle = 'white';
            textBuffer.font = '40px AtariST';

            buffer.drawImage(this.imgs.pane_200x150, 0, 0, 200, 150, cW / 32, cH / 32, cW - cW / 16, cH - cH / 16);
            textBuffer.fillText('Pause / Start', 0, 40);
            textBuffer.fillText('Run', 0, 180);
            textBuffer.fillText('Jump', 0, 320);
            textBuffer.fillText('Run To', 0, 460);
            buffer.drawImage(textBuffer.canvas, cW / 4 + 30, cH / 4 - 70);

            //Pause / Start
            buffer.drawImage(this.imgs.esc, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 200, cH / 4 - 70, 64, 64);
            buffer.drawImage(this.imgs.mouseR, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 29, cW / 3 + 290, cH / 4 -70, 18 * 2.207, 29 * 2.207);
            buffer.drawImage(this.imgs.start, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 13, cW / 3 + 340, cH / 4 - 70, 64, 13 * 4.92);
            buffer.drawImage(this.imgs.start2, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 410, cH / 4 - 70, 64, 64);
            //Move
            buffer.drawImage(this.imgs.left, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 200, cH / 4 + 55, 64, 64);
            buffer.drawImage(this.imgs.right, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 270, cH / 4 + 55, 64, 64);
            buffer.drawImage(this.imgs.Q, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 360, cH / 4 + 55, 64, 64);
            buffer.drawImage(this.imgs.A, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 430, cH / 4 + 55, 64, 64);
            buffer.drawImage(this.imgs.D, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 520, cH / 4 + 55, 64, 64);
            buffer.drawImage(this.imgs.mouse, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 29, cW / 3 + 200, cH / 4 + 130, 18 * 2.207, 29 * 2.207);
            buffer.drawImage(this.imgs.cross, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 24, cW / 3 + 270, cH / 4 + 130, 64, 64);
            buffer.drawImage(this.imgs.stick, (this.spriteEngine.getFrame() % 4) * 20, 0, 20, 16, cW / 3 + 350, cH / 4 + 136.4, 64, 3.2 * 16);
            //Jump
            buffer.drawImage(this.imgs.spacebar, 0, (this.spriteEngine.getFrame() % 4) * 16, 104, 16, cW / 3 + 200, cH / 4 + 205, 104 * 4, 64);
            buffer.drawImage(this.imgs.mouse, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 29, cW / 3 + 200, cH / 4 + 280, 18 * 2.207, 29 * 2.207);
            buffer.drawImage(this.imgs.Z, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 260, cH / 4 + 280, 64, 64);
            buffer.drawImage(this.imgs.W, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 330, cH / 4 + 280, 64, 64);
            buffer.drawImage(this.imgs.up, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 420, cH / 4 + 280, 64, 64);
            buffer.drawImage(this.imgs.A_button, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 500, cH / 4 + 280, 64, 64);
            buffer.drawImage(this.imgs.X_button, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 570, cH / 4 + 280, 64, 64);
            // Misc
            buffer.drawImage(this.imgs.mouseDbl, (this.spriteEngine.getFrame() % 8) * 18, 0, 18, 29, cW / 3 + 200, cH / 4 + 355, 18 * 2.207, 29 * 2.207);

            ctx.drawImage(buffer.canvas, 0, 0, cW, cH, xUI, yUI, cW, cH);
        }
    }

    this.displayUI = function() {
        this.hideUIBottom();
        this.hidden = false;
        goUp = setInterval(() => {      // ()=> function
            yUI -= 20;                  //      ||
            if (yUI <= 0) {             //      ||
                clearInterval(goUp);    //      \/
                this.SetUI();           // pas besoin de let self = this; 
            }
        }, 1);
    }

    this.hideUI = function() {
        this.set = false;
        goRight = setInterval(() => {
            xUI += 20;
            if (xUI >= cW) {
                clearInterval(goRight);
                this.hideUIBottom();
                this.hidden = true;
            }
        }, 1);
        
    }

    this.hideUIBottom = function() {
        xUI = 0;
        yUI = cH;
    }

    this.SetUI = function() {
        xUI = 0;
        yUI = 0;
        this.set = true;
    }
}