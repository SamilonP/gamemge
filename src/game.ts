let rectangle: any

import Rectangle from "./rectangle"; 
class MainGame extends Phaser.Scene {
    constructor () {
        super("maingame")
    }

    preload() {
        this.load.image('flarg', './assets/flarged.png')
    }

    create() {
        rectangle = new Rectangle(this);
        rectangle.preload()
        rectangle.create()
    }

    update(elapsed: number, delta: number) {
        rectangle.move(delta)
    }
}

export default MainGame