export class SpriteEngine {
    constructor(hasChangingSpeed) {
        this.needsToChangeSpeed = hasChangingSpeed;
        this.animationSpeed = SPRITES_ANIMATION_DELAY;
        this.currentFrame = 0;
        this.animationFrames = 4;
        this.animationComplete = true;
        console.timeLog('time');  
        console.log('Sprite Engine® unbridled');
        this.animateSprites();
    }

    animateSprites = () => {
        if(this.currentFrame > 9000) { // SRITE_ANIMATION_DELAY = 100 => 9000 / 100 / 60 = 15min 
            console.log('It\'s over 9000 !'); 
            this.currentFrame = 0;
        }
        
        if(this.needsToChangeSpeed) {
            this.animationComplete = this.currentFrame >= this.animationFrames - 1;
            this.animationSpeed = this.animationComplete ? SPRITES_ANIMATION_DELAY : this.animationSpeed;
        }
        
        setTimeout(this.animateSprites, this.animationSpeed);
        this.currentFrame++;
    }

    getFrame() {
        return this.currentFrame;
    }

    resetFrame = () => {
        this.currentFrame = 0;
    }

    resetSpeed = () => {
        this.setSpeed(SPRITES_ANIMATION_DELAY);
    }

    setSpeed(speed) {
        this.animationSpeed = speed;
    }

    triggerAnimation(frames, speed) {
        this.animationFrames = frames;
        this.animationComplete = false;
        this.resetFrame();
        this.setSpeed(speed);
    }
}