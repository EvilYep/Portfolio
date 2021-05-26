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
const RIGHT = 1;
const LEFT = -1;
const SPRITES_ANIMATION_DELAY = 100;
const levelLayout = [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    ['!', 0 , 0 , 0 ,'?', 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,'P', 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,'!'],
    ['!', 0 ,'<','T','>', 0 ,'H','<','>', 0 ,'<','T','>', 0 , 0 ,'<','T','T','>', 0 , 0 , 0 ,'<','T','>', 0 , 0 ,'<','>','!']
];