import Rectangle from "./rectangle"; 
class MainGame extends Phaser.Scene {
    constructor () {
        super("maingame")
    }

    preload() {

    }

    create() {
        const rectangle = new Rectangle(this);
        rectangle.create();
    }

    update(elapsed: number, delta: number) {
        
    }
}

export default MainGame