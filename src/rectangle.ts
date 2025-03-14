let player: any
let enemy: any
let accumulate = 0

export default class Rectangle {
    private scene: Phaser.Scene
    private score: number = 0 
    private scoreText!: Phaser.GameObjects.Text 
    private boing!: Phaser.Sound.BaseSound 
    private isAlive: boolean = true

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }
 
    create() {
        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height
        this.boing = this.scene.sound.add("boing")

        player = this.scene.physics.add.sprite(50, screenHeight / 2, "flarg").setScale(.5)
        enemy = this.scene.physics.add.sprite(screenWidth - 50, screenHeight / 2, "flarg").setScale(.5)
        player.body.setSize(200)
        enemy.body.setSize(200)
        
        player.flipX = true

        this.scene.physics.add.collider(player, enemy, () => {
            this.kill()
        })

        player.body.setAllowGravity(false)
        enemy.body.setAllowGravity(false)
        
        this.scoreText = new Phaser.GameObjects.Text(this.scene, screenWidth / 2, 30, "Score: " + this.score, 
            {
                fontFamily: "Consolas",
                fontSize: "48px",
                fontStyle: "bold",
                color: "white",
            }
        ).setOrigin(0.5)

        this.scene.add.existing(this.scoreText)

        this.scene.input.on('pointerdown', () => {
            if (!this.isAlive) return; // Prevent actions if the player is dead

            if (Math.abs(player.x - enemy.x) < 200) { 
                this.score += 1  
                this.scoreText.setText("Score: " + this.score)
                accumulate = -700
                this.boing.play()
            } else {
                this.kill()
            }
        })
    }

    kill() {
        this.isAlive = false // Mark the player as dead
        this.score = 0 
        this.scoreText.setText("Score: " + this.score)

        accumulate = 0 

        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height

        player.setPosition(50, screenHeight / 2)
        enemy.setPosition(screenWidth - 50, screenHeight / 2)

        player.body.setVelocityX(0)
        enemy.body.setVelocityX(0)

        this.isAlive = true // Reset the player's state
    }
    
    update(delta: number) {
        accumulate += 0.5 * delta
        player.body.setVelocityX(accumulate)
        enemy.body.setVelocityX(-accumulate)

    }
}
