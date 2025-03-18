
export default class Rectangle {
    private player: any
    private enemy: any
    private scene: Phaser.Scene
    private accumulate = 0
    private score: number = 0 
    private enemyHealth: number = 10
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

        this.scene.anims.create({
            key: 'playSplosion',
            frames: this.scene.anims.generateFrameNames('splode', { start: 0, end: 28}),
            frameRate: 30,
            repeat: 0
        })

        
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
        const splosionSprite = this.scene.add.sprite(screenWidth / 2, screenHeight / 2, 'splode')
        
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
                splosionSprite.play('playSplosion')
                this.score += 1  
                this.scoreText.setText("Score: " + this.score)
                this.accumulate = -(Math.random() * 800) - 100
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
        
        this.accumulate = 0 
        
        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height
        
        this.player.setPosition(50, screenHeight / 2)
        this.enemy.setPosition(screenWidth - 50, screenHeight / 2)
        
        this.player.body.setVelocityX(0)
        this.enemy.body.setVelocityX(0)

        this.isAlive = true // Reset the player's state
    }
    
    update(delta: number) {
        this.accumulate += 0.5 * delta
        this.player.body.setVelocityX(this.accumulate)
        this.enemy.body.setVelocityX(-this.accumulate)

    }
}
