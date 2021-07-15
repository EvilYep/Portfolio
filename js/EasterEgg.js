export function EasterEgg() {
    const KONAMI_CODE = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
    ];
    const GAMEPAD_KONAMI_CODE = '121213131415141510';
    let input = "";
    let padBuffer = [];

    this.start = (cb) => {
        if (this.isActive) {
            return;
        }
        window.addEventListener("keydown", this.checkCode);
        this.callback = cb;
        this.isActive = true;
    };

    this.stop = () => {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        window.removeEventListener("keydown", this.checkCode);
    };

    this.checkCode = (e) => {
        if (e.key === KONAMI_CODE[this.head] || e.key.toLowerCase() === KONAMI_CODE[this.head]) {
            this.head++;

            if (this.head === KONAMI_CODE.length) {
                if (this.callback instanceof Function) {
                    this.callback();
                }
                this.head = 0;
            }
        } else {
            this.head = 0;
        }
    };

    this.is_down = (b) => {
        if (typeof(b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }

    this.checkGamepad = (gamepad) => {
        for(var i = 0; i < 20; i++) {
            if (this.is_down(gamepad.buttons[i]) && !padBuffer[i]) {
                input += i;
            }
        }
        padBuffer = [];
        for(var i = 0; i < 20; i++) {
            padBuffer[i] = this.is_down(gamepad.buttons[i]);
        }
        if (input.length > GAMEPAD_KONAMI_CODE.length) {
            input = input.substr((input.length - GAMEPAD_KONAMI_CODE.length));
        }
        if (input == GAMEPAD_KONAMI_CODE) {
            if (this.callback instanceof Function) {
                this.callback();
            }
            input = [];
        }
    }
}