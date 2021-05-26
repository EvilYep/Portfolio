const bg = new Image();
const bg2 = new Image();
const bg3 = new Image();
const bg4 = new Image();
const bg5 = new Image();
const road = new Image();

bg.src = "./assets/bg/5.png";
bg2.src = "./assets/bg/4.png";
bg3.src = "./assets/bg/3.png";
bg4.src = "./assets/bg/2.png";
bg5.src = "./assets/bg/1.png";
road.src = "./assets/bg/road.png";

const FPS = 60;
const KEYS = {
	LEFT: KEY_CODES.LEFT,
	RIGHT: KEY_CODES.RIGHT,

	JUMP: KEY_CODES.SPACE
}
const INITIAL_DISTANCE = 450;
const COLS = 30;
const ROWS = 3;
const DUDES_TILE_SIZE = 48;
const LEVEL_TILE_SIZES = {
    LG: 160,
    SM: 140
};
const SPRITES_ANIMATION_DELAY = 150;
const levelLayout = [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    ['!', 0 , 0 , 0 ,'?', 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,'P', 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,0],
    ['!', 0 ,'<','T','>', 0 ,'H','<','>', 0 ,'<','T','>', 0 , 0 ,'<','T','T','>', 0 , 0 , 0 ,'<','T','>', 0 , 0 ,'<','>',0]
];