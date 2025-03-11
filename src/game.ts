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
    const centerX = this.cameras.main.width / 2;

        rectangle = new Rectangle(this)
        rectangle.preload()
        rectangle.create()

        const Ttc = new Phaser.GameObjects.Text(this, centerX, 130, "Time the click", 
        {
        fontFamily: "Consolas",
        fontSize: "32px",
        fontStyle: "bold",
        color: "white",
        }).setOrigin(0.5)
        this.add.existing(Ttc)

      
    }

    update(elapsed: number, delta: number) {
        rectangle.update(delta)
    }
}

export default MainGame
