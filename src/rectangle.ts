let player: any
let enemy: any
let accumulate = 0

export default class Rectangle {
    private scene: Phaser.Scene
    private score: number = 0 
    private debounce: boolean = false
    private scoreText!: Phaser.GameObjects.Text 

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }
 
    preload() {
        
    }
 
    create() {
        const X = this.scene.cameras.main.width / 2
        const Y = this.scene.cameras.main.height / 2
    
        const rectWidth = 100
        const gap = 200
    
        // Create player and enemy
        player = this.scene.physics.add.sprite(X - rectWidth / 2 - gap / 2, Y, "flarg").setScale(.5)
        enemy = this.scene.physics.add.sprite(X + rectWidth / 2 + gap / 2, Y, "flarg").setScale(.5)
        
        player.flipX = true

        this.scene.physics.add.collider(player, enemy, () => {
            this.kill()
        })

        player.body.setAllowGravity(false)
        enemy.body.setAllowGravity(false)
        
       
        this.scoreText = new Phaser.GameObjects.Text(this.scene, X, 30, "Score: " + this.score, 
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
        this.score = 0 
        this.scoreText.setText("Score: " + this.score)

        accumulate = 0 

        const X = this.scene.cameras.main.width / 2
        const Y = this.scene.cameras.main.height / 2
        const rectWidth = 100
        const gap = 200

        player.setPosition(X - rectWidth / 2 - gap / 2, Y)
        enemy.setPosition(X + rectWidth / 2 + gap / 2, Y)

        player.body.setVelocityX(0)
        enemy.body.setVelocityX(0)
    }
    
    update(delta: number) {
        this.scene.input.once('pointerdown', () => {
            if (player.x > 100) { 
                if (!this.debounce) {
                    this.score += 1 
                }

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

    initiatedebounce() {
        this.debounce = true

        this.scene.time.delayedCall(1000, () => {
            this.debounce = false
        })
    }
}
