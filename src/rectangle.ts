export default class Rectangle {
    private player: any
    private enemy: any
    private scene: Phaser.Scene
    private plrAccumulate = 0
    private enemyAccumulate = 0
    private score: number = 0 
    private enemyHealth: number = 10
    private scoreText!: Phaser.GameObjects.Text 
    private sessionScoreText!: Phaser.GameObjects.Text 
    private boing!: Phaser.Sound.BaseSound 
    private highscore: number = 0
    private isPaused: boolean = false
    private restartText!: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }
 
    create() {
        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height

        this.boing = this.scene.sound.add("boing", { volume: 0.5 }) 

        this.scene.anims.create({
            key: 'playSplosion',
            frames: this.scene.anims.generateFrameNames('splode', { start: 0, end: 28}),
            frameRate: 30,
            repeat: 0
        })

        this.player = this.scene.physics.add.sprite(50, screenHeight / 2, "wod").setScale(.2)
        this.enemy = this.scene.physics.add.sprite(screenWidth - 50, screenHeight / 2, "icedancer").setScale(.2)
        this.player.body.setSize(300)
        this.enemy.body.setSize(300)

        this.player.flipX = true
        
        this.scene.physics.add.collider(this.player, this.enemy, () => {
            this.kill()
        })
        
        this.player.body.setAllowGravity(false)
        this.enemy.body.setAllowGravity(false)
        const splosionSprite = this.scene.add.sprite(screenWidth / 2, screenHeight / 2, 'splode')
        splosionSprite.setVisible(false)
        splosionSprite.setScale(1.5)

        this.sessionScoreText = new Phaser.GameObjects.Text(this.scene, screenWidth / 2, 800, "Highscore: " + this.highscore, 
            {
                fontFamily: "Consolas",
                fontSize: "48px",
                fontStyle: "bold",
                color: "white",
            }
        ).setOrigin(0.5)
        this.scoreText = new Phaser.GameObjects.Text(this.scene, screenWidth / 2, 30, "Score: " + this.score, 
            {
                fontFamily: "Consolas",
                fontSize: "48px",
                fontStyle: "bold",
                color: "white",
            }
        ).setOrigin(0.5)
        
        this.scene.add.existing(this.scoreText)
        this.scene.add.existing(this.sessionScoreText)

        this.restartText = new Phaser.GameObjects.Text(this.scene, screenWidth / 2, screenHeight / 2, "Click to Restart", 
            {
                fontFamily: "Consolas",
                fontSize: "48px",
                fontStyle: "bold",
                color: "red",
            }
        ).setOrigin(0.5).setVisible(false)
        this.scene.add.existing(this.restartText)

        this.scene.input.on('pointerdown', () => {
            if (this.isPaused) {
                this.restartGame()
            } else {
                if (Math.abs(this.player.x - this.enemy.x) < 230) { 
                    const explosionX = (this.player.x + this.enemy.x) / 2
                    const explosionY = (this.player.y + this.enemy.y) / 2
                    splosionSprite.setPosition(explosionX, explosionY)
                    splosionSprite.setVisible(true) 
                    splosionSprite.play('playSplosion')
                    splosionSprite.once('animationcomplete', () => {
                        splosionSprite.setVisible(false)
                    })
                    this.score += 1  
                    this.scoreText.setText("Score: " + this.score)
                    this.updateScoreColor()
                    this.plrAccumulate = -(Math.random() * 800) - 300
                    this.enemyAccumulate = (Math.random() * 800) + 300
                    this.boing.play()

                    this.enemyHealth--
                } else {
                    this.kill()
                }
            }
        })
    }
    
    updateScoreColor() {
        if (this.score < 5) {
            this.scoreText.setColor("white")
        } else if (this.score < 10) {
            this.scoreText.setColor("yellow")
        } else if (this.score < 20) {
            this.scoreText.setColor("blue")
        } else if (this.score < 40) {
            this.scoreText.setColor("red")
        } else if (this.score <= 100) {
            this.scoreText.setColor("purple")
        } else {
            this.scoreText.setColor("brown")
        }
    }

    kill() {
        if (this.score > this.highscore) {
            this.highscore = this.score
            this.sessionScoreText.setText("Highscore: " + this.highscore)
        }
        this.score = 0 
        this.scoreText.setText("Score: " + this.score)
        this.updateScoreColor()
        
        this.plrAccumulate = 0 
        this.enemyAccumulate = 0
        
        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height
        
        this.player.setPosition(50, screenHeight / 2)
        this.enemy.setPosition(screenWidth - 50, screenHeight / 2)
        
        this.player.body.setVelocityX(0)
        this.enemy.body.setVelocityX(0)

        this.isPaused = true
        this.restartText.setVisible(true)
    }

    restartGame() {
        this.isPaused = false
        this.restartText.setVisible(false)
        this.score = 0
        this.scoreText.setText("Score: " + this.score)
        this.updateScoreColor()

        const screenWidth = this.scene.cameras.main.width
        const screenHeight = this.scene.cameras.main.height

        this.player.setPosition(50, screenHeight / 2)
        this.enemy.setPosition(screenWidth - 50, screenHeight / 2)

        this.plrAccumulate = 0
        this.enemyAccumulate = 0
    }
    
    update(delta: number) {
        if (this.isPaused) return

        this.plrAccumulate += 0.5 * delta
        this.enemyAccumulate -= 0.5 * delta
        this.player.body.setVelocityX(this.plrAccumulate)
        this.enemy.body.setVelocityX(this.enemyAccumulate)

        if (this.player.body.x < 0) {
            this.plrAccumulate *= -.5
            this.player.body.x = 0
            this.player.body.setVelocityX(0)
        }

        if (this.enemy.body.x > this.scene.cameras.main.width - 25) {
            this.enemyAccumulate *= -.5
            this.enemy.body.x = this.scene.cameras.main.width - 25
            this.enemy.body.setVelocityX(0)
        }

    }
}
