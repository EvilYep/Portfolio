const FPS = 75;
const INITIAL_DISTANCE = 450;
const DUDES_TILE_SIZE = 48;     // 48 px in the spritesheet
const LEVEL_TILE_SIZES = {      //deprecated
    LG: 180,
    SM: 140
};
const RIGHT = 1;
const LEFT = -1;
const SPRITES_ANIMATION_DELAY = 100;
const SPEED = 6;
const GRAVITY = 0.6;
//const PX_PER_FRAME = 6;
//const PX_PER_SEC = PX_PER_FRAME * 60;
const LEVEL_LAYOUT = [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 ,'$', 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    ['!', 1 , 0 , 0 ,'?', 3 , 0 , 0 ,'N', 4 ,'C', 0 , 0 , 2 ,'Y', 0 , 0 , 1 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 4 ,'P', 0 , 0 , 3 ,'!'],
    ['!', 0 ,'<','T','>', 0 ,'b','<','>','L','<','T','>', 0 , 0 ,'<','T','T','>', 0 ,'L', 0 ,'<','T','>', 0 , 0 ,'H','<','>','!']
];
const COLS = LEVEL_LAYOUT[0].length;
const ROWS = LEVEL_LAYOUT.length;
const ASSETS = {
    IMGS: [
        "./assets/bg/bg5.png", 
        "./assets/bg/bg4.png", 
        "./assets/bg/bg3.png", 
        "./assets/bg/bg2.png", 
        "./assets/bg/bg1.png", 
        "./assets/bg/road.png",
        "./assets/player/Biker_hurt.png", 
        "./assets/player/Biker_idle.png", 
        "./assets/player/Biker_run.png", 
        "./assets/player/Biker_jump.png",
        "./assets/player/Biker_doublejump.png",
        "./assets/NPCs/Cyborg_idle.png", 
        "./assets/NPCs/Cyborg_idle_L.png", 
        "./assets/NPCs/Punk_idle.png", 
        "./assets/NPCs/Punk_idle_L.png", 
        "./assets/objects/Pointer1.png", 
        "./assets/objects/Pointer2.png",
        "./assets/objects/Fence1.png", 
        "./assets/objects/Fence2.png", 
        "./assets/objects/Fence3.png",
        "./assets/objects/Newspaper.png",
        "./assets/objects/Screen2.png", 
        "./assets/objects/Platform.png", 
        "./assets/objects/Bottle1.png", 
        "./assets/objects/Ladder.png",
        "./assets/objects/Barrel1.png", 
        "./assets/objects/Barrel2.png", 
        "./assets/objects/Barrel3.png", 
        "./assets/objects/Barrel4.png", 
        "./assets/objects/delorean.png", 
        "./assets/objects/Money.png", 
        "./assets/FX/FireBurst_64x64.png",
        "./assets/FX/FireBall_64x64.png",
        "./assets/FX/IcePick_64x64.png",
        "./assets/FX/Hover_64x64.png",
        "./assets/FX/TornadoStatic_96x96.png",
        "./assets/UI/mouse.png",
        "./assets/UI/mouseR.png",
        "./assets/UI/mouseDbl.png",
        "./assets/UI/spacebar.png",
        "./assets/UI/esc.png",
        "./assets/UI/left.png",
        "./assets/UI/right.png",
        "./assets/UI/up.png",
        "./assets/UI/cross.png",
        "./assets/UI/stick.png",
        "./assets/UI/start.png",
        "./assets/UI/start2.png",
        "./assets/UI/A_button.png",
        "./assets/UI/X_button.png",
        "./assets/UI/A.png",
        "./assets/UI/D.png",
        "./assets/UI/Q.png",
        "./assets/UI/W.png",
        "./assets/UI/Z.png",
        "./assets/UI/pane_200x150.png",
    ]
};

// Compatibility-friendly polyfill
let myRequestAnimationFrame =  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback) {
                setTimeout(callback, 1000 / FPS);
            };
window.requestAnimationFrame = myRequestAnimationFrame;