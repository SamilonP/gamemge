
export default class Rectangle {
    private player: any
    private splosion: any
    private enemy: any
    private scene: Phaser.Scene
    private accumulate = 0
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
    
        this.splosion = this.scene.add.image(500, 500, 'splode')

        this.player = this.scene.physics.add.sprite(50, screenHeight / 2, "flarg").setScale(.5)
        this.enemy = this.scene.physics.add.sprite(screenWidth - 50, screenHeight / 2, "flarg").setScale(.5)
        this.player.body.setSize(200)
        this.enemy.body.setSize(200)
        
        this.player.flipX = true

        this.scene.physics.add.collider(this.player, this.enemy, () => {
            this.kill()
        })

        this.player.body.setAllowGravity(false)
        this.enemy.body.setAllowGravity(false)
        
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
            if (Math.abs(this.player.x - this.enemy.x) < 250) { 
                this.score += 1  
                this.scoreText.setText("Score: " + this.score)
                this.accumulate = -(Math.random() * 800) - 100
            } else {
                this.kill()
            }
        })
    }

    kill() {
        this.score = 0 
        this.scoreText.setText("Score: " + this.score)

        this.accumulate = 0 

        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height

        this.player.setPosition(50, screenHeight / 2)
        this.enemy.setPosition(screenWidth - 50, screenHeight / 2)

        this.player.body.setVelocityX(0)
        this.enemy.body.setVelocityX(0)
    }
    
    update(delta: number) {
        this.accumulate += 0.5 * delta
        this.player.body.setVelocityX(this.accumulate)
        this.enemy.body.setVelocityX(-this.accumulate)

    }
}
