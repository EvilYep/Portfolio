export class SpriteEngine {
    constructor() {
        this.currentFrame = 0;
        console.timeLog('answer time');  
        console.log('Sprite Engine® unbridled');
        this.animateSprites();
    }

    animateSprites = () => {
        this.currentFrame++;
        if(this.currentFrame > 9000) {
            console.log('It\'s over 9000 !');
            this.currentFrame = 0;
        }
        setTimeout(this.animateSprites, SPRITES_ANIMATION_DELAY);
    }

    getFrame() {
        return this.currentFrame;
    }
}