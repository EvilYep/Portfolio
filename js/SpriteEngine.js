class SpriteEngine {
    constructor() {
        this.currentFrame = 0;
        console.timeLog('answer time');  
        console.log('Sprite Engine® unbridled');
        this.animateSprites();
    }

    destroy() {
        var i = 0;
        while (spriteEngine.instances[i] !== this) { i++; }
        spriteEngine.instances.splice(i, 1);
    };

    animateSprites = () => {
        this.currentFrame++;
        if(this.currentFrame >= 5000) {
            this.currentFrame = 0;
        }
        setTimeout(this.animateSprites, SPRITES_ANIMATION_DELAY);
    }

    getFrame() {
        return this.currentFrame;
    }
}
SpriteEngine.instances = [];

export { SpriteEngine };