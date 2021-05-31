export let xMouse = 0;
export let yMouse = 0;
export let keys = {};
export let mouseDown = 0;

export function attachInputListeners(gameWindow, player) {
    /********************
     *      MOUSE       *
     ********************/

    gameWindow.onmousemove = (e) => {
        setTimeout(() => {
            xMouse = e.pageX;
            yMouse = e.pageY;
        }, 1000 / FPS);
        if (player.isRunning()) {
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
        if(e.clientX < INITIAL_DISTANCE + 5 || e.clientX > INITIAL_DISTANCE + 110) {
            startMove(e, player);
            //gameWindow.addEventListener('mousemove', startMove(e));
        }
        if (e.clientY < player.hitbox.top - 100) {
            player.jump();
        }
        mouseDown = 1;
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

    console.log('Controllers plugged');
}

function startMove(e, player) {
    INITIAL_DISTANCE - e.clientX > 0 ? player.run(LEFT) : player.run(RIGHT);
}

function processKeyInput(player) {
    if (keys.d || keys.D || keys.ArrowRight) {
        player.run(RIGHT);
    }
    if (keys.q || keys.Q || keys.a || keys.A || keys.ArrowLeft) {
        player.run(LEFT);
    }
    if (keys[' '] || keys.ArrowUp || keys.z || keys.Z || keys.w || keys.W) {
        player.jump();
    }
}