const FPS = 60;
const KEYS = {
	LEFT: KEY_CODES.LEFT,
	RIGHT: KEY_CODES.RIGHT,

	JUMP: KEY_CODES.SPACE
}
const INITIAL_DISTANCE = 450;
const COLS = 31;
const ROWS = 3;
const DUDES_TILE_SIZE = 48;
const LEVEL_TILE_SIZES = {
    LG: 180,
    SM: 140
};
const RIGHT = 1;
const LEFT = -1;
const SPRITES_ANIMATION_DELAY = 100;
const levelLayout = [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    ['!', 1 , 0 , 0 ,'?', 3 , 0 , 0 ,'N', 4 ,'C', 0 , 0 , 2 ,'Y', 0 , 0 , 1 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 4 ,'P', 0 , 0 , 3 ,'!'],
    ['!', 0 ,'<','T','>', 0 ,'b','<','>','L','<','T','>', 0 , 0 ,'<','T','T','>', 0 ,'L', 0 ,'<','T','>', 0 , 0 ,'H','<','>','!']
];