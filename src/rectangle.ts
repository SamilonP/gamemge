let player: any;
let enemy: any;
let accumulate = 0;

export default class Rectangle {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
 
    preload() {
        
    }
 
    create() {
     
        const X = this.scene.cameras.main.width / 2;
        const Y = this.scene.cameras.main.height / 2;
    
        const rectWidth = 100;
        const gap = 200;
    
        //  two rectangles
        player = this.scene.physics.add.sprite(X - rectWidth / 2 - gap / 2, Y, "flarg").setScale(.5)
        enemy = this.scene.physics.add.sprite(X + rectWidth / 2 + gap / 2, Y, "flarg").setScale(.5)
        
        player.flipX = true

        this.scene.physics.add.collider(player, enemy, () => {
            accumulate = -1000
        })

        player.body.setAllowGravity(false)
        enemy.body.setAllowGravity(false)
    }
    
    move(delta: number) {

        accumulate += 1 * delta

        player.body.setVelocityX(accumulate)
        enemy.body.setVelocityX(-accumulate)
    }
}