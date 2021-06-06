import { gameWindow, refreshSmoothies, cH } from './main.js';
import { SpriteEngine } from './SpriteEngine.js';
import { keys, mouseDown } from './Input.js';

export class Player {
    constructor(assets, ctx) {
        this.imgs = assets;
        this.ctx = ctx;
        this.ground = cH - 200;
        this.xStatus = 'idle';
        this.yStatus = 'grounded';
        this.maxFrame = 4;
        this.facing = RIGHT;
        this.direction = 0;
        this.yVelocity = 0;
        this.y = this.ground - 210;
        this.stopWhenFrameIs = 0;
        this.frameCounter = 0;

        this.flipBuffer = document.createElement("canvas").getContext('2d');
        this.spriteEngine = new SpriteEngine(true);

        this.ratio = 210 / 48;
        this.flipBuffer.canvas.width = 36 * this.ratio * 2;
        this.flipBuffer.canvas.height = 210;
        this.flipBuffer.translate(36 * this.ratio, 0);
        this.flipBuffer.scale(-1, 1);

        this.hitbox = {
            left: INITIAL_DISTANCE + 20,
            right: INITIAL_DISTANCE + 120,
            top: this.ground - 150,
            bottom: this.ground
        }

        console.timeLog('time', ' - Player Renderer® unleashed');
    }
    
    render() {
        refreshSmoothies(this.ctx);
        refreshSmoothies(this.flipBuffer);
        this.ground = cH - 175;
        if(this.y <= this.ground - 210 && !this.isJumping()) {
            this.y = this.ground - 210;
        }

        if(this.stopWhenFrameIs) {
            this.frameCounter++;
            if(this.frameCounter >= this.stopWhenFrameIs) {
                this.stopWhenFrameIs = 0;
                this.frameCounter = 0;
                this.stop();
            }
        }

        if (this.isJumping() && !this.spriteEngine.animationComplete) {
            this.sprite = this.imgs.Biker_doublejump;
            this.maxFrame = 6;
        } else {
            switch(this.xStatus) {
            case 'idle':
                this.sprite = this.imgs.Biker_idle;
                this.maxFrame = 4;
                break;
            case 'running':
                this.sprite = this.imgs.Biker_run;
                this.maxFrame = 6;
                break;
            default:
                this.sprite = this.imgs.Biker_idle;
                this.maxFrame = 4;
                break;
            }
        }

        if (this.isJumping()) {
            this.yVelocity += GRAVITY;
            this.attachHitbox();
        }

        this.y += this.yVelocity;

        if(this.y >= this.ground - 210) {
            this.yVelocity = 0;
            this.y = this.ground - 210;
            this.attachHitbox();
            this.yStatus = 'grounded';
        }

        if(this.facing == LEFT) {
            this.flipBuffer.drawImage(this.sprite, 
                (this.spriteEngine.getFrame() % this.maxFrame) * DUDES_TILE_SIZE, 0, 
                36, DUDES_TILE_SIZE, 
                0, 0, 
                36 * this.ratio, 210);
            this.ctx.drawImage(this.flipBuffer.canvas, 
                0, 0, 
                210, 210, 
                INITIAL_DISTANCE, this.y, 
                210, 210);
            this.flipBuffer.clearRect(0, 0, 210, 210);
        } else {
            this.ctx.drawImage(this.sprite, 
                (this.spriteEngine.getFrame() % this.maxFrame) * DUDES_TILE_SIZE, 0, 
                36, DUDES_TILE_SIZE, 
                INITIAL_DISTANCE, this.y, 
                36 * this.ratio, 210);
        }
        
        // uncomment to see player's hitbox
        //this.ctx.fillStyle = 'lime';
        //this.ctx.fillRect(this.hitbox.left, this.hitbox.top, 3, 150);
        //this.ctx.fillRect(this.hitbox.left, this.hitbox.bottom, this.hitbox.right - this.hitbox.left, 3);
        //this.ctx.fillRect(this.hitbox.left, this.hitbox.top, this.hitbox.right - this.hitbox.left, 3);
        //this.ctx.fillRect(this.hitbox.right, this.hitbox.top, 3, 150);
    }

    run(direction) {
        this.xStatus = 'running';
        this.direction = direction;
        this.facing = direction == LEFT ? LEFT : RIGHT;
    }

    stop() {
        this.direction = 0;
        this.xStatus = 'idle';
        this.currentFrame = 0;
    }

    runAwayYouFools(direction) {
        //this.stop();
        this.run(direction);
        setTimeout(function() {
            this.stop();
            gameWindow.onmouseup();
        }, 300);
    }

    runTo(position) {
        let direction = Math.sign(position - (INITIAL_DISTANCE + 70));
        let d = position - (INITIAL_DISTANCE + 70);
        let frames = Math.abs(d / SPEED);
        
        this.stopWhenFrameIs = frames;
        this.run(direction);
    }

    jump() {
        if(!this.isJumping()) {
            this.yStatus = 'jumping';
            this.spriteEngine.triggerAnimation(6, 225); // nb of frames in the anim, time of each frame in ms
            this.yVelocity = -18;
            setTimeout(() => {
                if(!(keys.q || keys.Q || keys.a || keys.A  || keys.d || keys.D || keys.ArrowLeft || keys.ArrowRight || mouseDown)) {
                    this.stop();
                }
            }, 6 * 225);
        }
    }

    isRunning() {
        return this.xStatus == 'running';
    }

    isJumping() {
        return this.yStatus == 'jumping';
    }

    getDirection() {
        return this.facing;
    }

    attachHitbox() {
            this.hitbox.top = this.y + 60;
            this.hitbox.bottom = this.y + 210;
    }

    say(stuff) {
        // GUI.triggerAnim(say(stuff), this.hitbox))
    }
}

