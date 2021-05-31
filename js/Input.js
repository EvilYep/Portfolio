import { bufferMaxSize, distance, paused, togglePause } from './main.js';

export let xMouse = 0;
export let yMouse = 0;
export let keys = {};
export let mouseDown = 0;
export let gamepad;
export let gamepads;
let interval;
let k = '';
let buttonReady = true;

export function attachInputListeners(gameWindow, player) {
    
    window.addEventListener('contextmenu', e => e.preventDefault());

    gameWindow.onmousemove = (e) => {
        setTimeout(() => {
            xMouse = e.pageX;
            yMouse = e.pageY;
        }, 1000 / FPS);
        if (player.isRunning() && !paused) {
            if(xMouse < player.hitbox.left) {
                player.run(LEFT);
            }
            if(xMouse > player.hitbox.right) {
                player.run(RIGHT);
            }
        }
    };
    
    gameWindow.onclick = (e) => {
        //console.log('pageX : ', e.pageX, e.pageY , xMouse, yMouse);
    };
    
    gameWindow.onmousedown = (e) => {
        mouseDown = 1;
        if(e.button == 0 && !paused) {
            if(e.clientX < INITIAL_DISTANCE + 5 || e.clientX > INITIAL_DISTANCE + 110) {
                startMove(e, player);
                //gameWindow.addEventListener('mousemove', startMove(e));
            }
            if (e.clientY < player.hitbox.top - 100) {
                player.jump();
            }
        }
        if(e.button == 2) {
            togglePause();
        }
    };
    
    gameWindow.onmouseup = (e) => {
        //gameWindow.removeEventListener('mousemove', startMove);
        player.stop();
        mouseDown = 0;
    };

    /********************
     *    KEYBOARD      *
     ********************/
    window.onkeydown = (e) => {
        keys[e.key] = true;
        processKeyInput(player);
    }

    window.onkeyup = (e) => {
        keys[e.key] = false;
        if (!player.isJumping()) {
            player.stop();
        }
        if(player.yVelocity < -2) {
            player.yVelocity = -3;
        }
    }

    /********************
     *    GAMEPAD       *
     ********************/
    window.addEventListener("gamepadconnected", function(e) {
        gamepad = navigator.getGamepads()[e.gamepad.index];
    });

    window.addEventListener("gamepaddisconnected", function(e) {
        gamepad = {};
    });

    // Chrome support https://developer.mozilla.org/fr/docs/Web/API/Gamepad_API/Using_the_Gamepad_API#browser_compatibility
    if(!('GamepadEvent' in window)) {
        // No gamepad events available, poll instead.
        interval = setInterval(pollGamepads, 100);
    }
    
    console.log('Controllers plugged');
}

function pollGamepads() {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    for (let i = 0; i < gamepads.length; i++) {
        gamepad = gamepads[i];
        if(gamepad) {
            clearInterval(interval);
        }
    }
}

export function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

function getButtons() {
    k= '';
    Object.entries(keys).forEach(e => {
      if(e[1]) {
        k += e[0] == ' ' ? ' space ' : ' ' + e[0] + ' ';
      }
    });
    return k;
  }

export function processGamepadInput(player) {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    gamepad = gamepads[0];
    if (gamepad) {
        if (buttonPressed(gamepad.buttons[9]) && buttonReady) {
            togglePause();
            buttonReady = false;
            setTimeout(() => {
                buttonReady = true;
            }, 1000);
        }
        //console.log(gamepad.axes[0]);
        if (buttonPressed(gamepad.buttons[0]) && !paused) { // A (Xbox) / X (PS)
            player.jump();
        }
        if (((buttonPressed(gamepad.buttons[14]) || gamepad.axes[0] < -0.15) && distance > INITIAL_DISTANCE) && !paused) {
            player.run(LEFT);
        } else if (((buttonPressed(gamepad.buttons[15]) || gamepad.axes[0] > 0.15) && distance < bufferMaxSize) && !paused) {
            player.run(RIGHT);
        } else {
            if(getButtons() == '' && !mouseDown) {
                player.stop();
            }
        }
    }
}

function processKeyInput(player) {
    if (((keys.d || keys.D || keys.ArrowRight) && distance > INITIAL_DISTANCE) && !paused) {
        player.run(RIGHT);
    }
    if (((keys.q || keys.Q || keys.a || keys.A || keys.ArrowLeft) && distance < bufferMaxSize) && !paused) {
        player.run(LEFT);
    }
    if ((keys[' '] || keys.ArrowUp || keys.z || keys.Z || keys.w || keys.W) && !paused) {
        player.jump();
    }
    if(keys.Escape) {
        togglePause();
    }
}

function startMove(e, player) {
    if((distance >= INITIAL_DISTANCE && distance <= bufferMaxSize) && !paused) {
        INITIAL_DISTANCE - e.clientX > 0 ? player.run(LEFT) : player.run(RIGHT);
    }
}

