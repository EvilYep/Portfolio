import { SpriteEngine } from './SpriteEngine.js';
import { refreshSmoothies, cH, cW } from './main.js';

export function UI(assets, ctx) {
    this.imgs = assets;
    this.spriteEngine = new SpriteEngine(false);
    this.spriteEngine.setSpeed(150);
    let buffer = document.createElement("canvas").getContext('2d');
    let textBuffer = document.createElement("canvas").getContext('2d');

    this.render = function() {
        buffer.canvas.width = cW;
        buffer.canvas.height = cH;
        textBuffer.canvas.width = cW;
        textBuffer.canvas.height = cH;
        refreshSmoothies(textBuffer);
        refreshSmoothies(buffer);
        refreshSmoothies(ctx);
        textBuffer.fillStyle = 'white';
        textBuffer.font = '40px AtariST';

        buffer.drawImage(this.imgs.pane_200x150, 0, 0, 200, 150, cW / 32, cH / 32, cW - cW / 16, cH - cH / 16);
        textBuffer.fillText('Pause / Start', 0, 30);
        textBuffer.fillText('Move', 0, 170);
        textBuffer.fillText('Jump', 0, 310);
        textBuffer.fillText('Interact', 0, 450);

        buffer.drawImage(textBuffer.canvas, cW / 4 + 30, cH / 4 - 50);

        //Pause / Start
        buffer.drawImage(this.imgs.esc, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 200, cH / 4 - 50, 64, 64);
        buffer.drawImage(this.imgs.start, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 13, cW / 3 + 270, cH / 4 - 50, 64, 13 * 4.92);
        buffer.drawImage(this.imgs.start2, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 340, cH / 4 - 50, 64, 64);
        //Move
        buffer.drawImage(this.imgs.left, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 200, cH / 4 + 75, 64, 64);
        buffer.drawImage(this.imgs.right, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 270, cH / 4 + 75, 64, 64);
        buffer.drawImage(this.imgs.Q, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 360, cH / 4 + 75, 64, 64);
        buffer.drawImage(this.imgs.A, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 430, cH / 4 + 75, 64, 64);
        buffer.drawImage(this.imgs.D, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 520, cH / 4 + 75, 64, 64);
        buffer.drawImage(this.imgs.mouse, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 29, cW / 3 + 200, cH / 4 + 150, 18 * 2.207, 29 * 2.207);
        buffer.drawImage(this.imgs.cross, (this.spriteEngine.getFrame() % 4) * 24, 0, 24, 24, cW / 3 + 270, cH / 4 + 150, 64, 64);
        buffer.drawImage(this.imgs.stick, (this.spriteEngine.getFrame() % 4) * 20, 0, 20, 16, cW / 3 + 350, cH / 4 + 156.4, 64, 3.2 * 16);
        //Jump
        buffer.drawImage(this.imgs.spacebar, 0, (this.spriteEngine.getFrame() % 4) * 16, 104, 16, cW / 3 + 200, cH / 4 + 225, 104 * 4, 64);
        buffer.drawImage(this.imgs.mouse, (this.spriteEngine.getFrame() % 4) * 18, 0, 18, 29, cW / 3 + 200, cH / 4 + 300, 18 * 2.207, 29 * 2.207);
        buffer.drawImage(this.imgs.Z, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 260, cH / 4 + 300, 64, 64);
        buffer.drawImage(this.imgs.W, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 330, cH / 4 + 300, 64, 64);
        buffer.drawImage(this.imgs.up, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 420, cH / 4 + 300, 64, 64);
        buffer.drawImage(this.imgs.A_button, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 500, cH / 4 + 300, 64, 64);
        buffer.drawImage(this.imgs.X_button, (this.spriteEngine.getFrame() % 4) * 16, 0, 16, 16, cW / 3 + 570, cH / 4 + 300, 64, 64);

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(buffer.canvas, 0, 0, cW, cH, 0, 0, cW, cH);
        ctx.globalCompositeOperation = 'source-over';
    }
}