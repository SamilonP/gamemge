let player: any
let enemy: any
let accumulate = 0

export default class Rectangle {
    private scene: Phaser.Scene
    private score: number = 0 
    private scoreText!: Phaser.GameObjects.Text 

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }
 
    preload() {
        
    }
 
    create() {
        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height
    
        // Create player and enemy at max distance apart
        player = this.scene.physics.add.sprite(0 + 50, screenHeight / 2, "flarg").setScale(.5)
        enemy = this.scene.physics.add.sprite(screenWidth - 50, screenHeight / 2, "flarg").setScale(.5)
        
        player.flipX = true

        this.scene.physics.add.collider(player, enemy, () => {
            this.kill()
        })

        player.body.setAllowGravity(false)
        enemy.body.setAllowGravity(false)
        
        // Score text
        this.scoreText = new Phaser.GameObjects.Text(this.scene, screenWidth / 2, 30, "Score: " + this.score, 
            {
                fontFamily: "Consolas",
                fontSize: "48px",
                fontStyle: "bold",
                color: "white",
            }
        ).setOrigin(0.5)

        this.scene.add.existing(this.scoreText)
    }

    kill() {
        console.log("kill")
        this.score = 0 
        this.scoreText.setText("Score: " + this.score)

        accumulate = 0 

        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height

        // Reset positions to max distance apart
        player.setPosition(0 + 50, screenHeight / 2)
        enemy.setPosition(screenWidth - 50, screenHeight / 2)

        player.body.setVelocityX(0)
        enemy.body.setVelocityX(0)
    }
    
    update(delta: number) {
        this.scene.input.once('pointerdown', () => {
            if (player.x > 10) { 
                this.score += 1 
                this.scoreText.setText("Score: " + this.score)
                accumulate = -1000 
            } else {
                this.kill()
            }
        })

        accumulate += 1 * delta

        player.body.setVelocityX(accumulate)
        enemy.body.setVelocityX(-accumulate)
    }
}
