import { refreshSmoothies, cH } from './main.js';

let facing = RIGHT;
let status = 'idle';
let currentFrame = 0;
let maxFrame = 4;
export let speed = 0;

export function Player(assets, ctx, spriteEngine) {
    console.timeLog('answer time');
    console.log('Player Renderer® unleashed');
    this.imgs = assets;
    this.ground = cH - 200;

    this.render = function() {
        refreshSmoothies(ctx);
        this.ground = cH - 175;
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
        ctx.drawImage(this.sprite, (spriteEngine.getFrame() % maxFrame) * DUDES_TILE_SIZE, 0, DUDES_TILE_SIZE, DUDES_TILE_SIZE, INITIAL_DISTANCE, this.ground - 210, 210, 210);
/*         ctx.fillRect(INITIAL_DISTANCE, this.ground, 210, 3);
        ctx.fillRect(INITIAL_DISTANCE, this.ground - 213, 210, 3);
        ctx.fillRect(INITIAL_DISTANCE + 210, this.ground - 210, 3, 210);
        ctx.fillRect(INITIAL_DISTANCE, this.ground - 213 + 60, 210, 3);
        ctx.fillRect(INITIAL_DISTANCE + 110, this.ground - 210, 3, 210); */
    }
    console.timeEnd('answer time');
}

export function run(direction) {
    status = 'running';
    currentFrame = 0;


    speed = direction;
    facing = direction == LEFT ? 'left' : 'right'
    
}

export function runAwayYouFools(direction) {
    stop();
    run(direction);
    setTimeout(function() {
        stop();
    }, 1000);
}

export function stop() {
    speed = 0;
    status = 'idle';
    facing= 'right'
    currentFrame = 0;
}