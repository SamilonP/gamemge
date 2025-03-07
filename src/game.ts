let rectangle: any
let score = 0
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
        }).setOrigin(0.5);
        this.add.existing(Ttc)

        const scoreText = new Phaser.GameObjects.Text(this, centerX, 30, "Score: " + score, 
        {
         fontFamily: "Consolas",
        fontSize: "48px",
        fontStyle: "bold",
         color: "white",
        }).setOrigin(0.5);
        this.add.existing(scoreText)
    }

update(elapsed: number, delta: number) {
        rectangle.move(delta)
    }
}

export default MainGame
