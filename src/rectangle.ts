let player: any;
let enemy: any;

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
        player = this.scene.physics.add.sprite(X - rectWidth / 2 - gap / 2, Y, "flarg").setScale(.2)
        enemy = this.scene.physics.add.sprite(X + rectWidth / 2 + gap / 2, Y, "flarg").setScale(.2)

        player.body.setImmovable(true)
        player.body.setAllowGravity(false)
        enemy.body.setImmovable(true)
        enemy.body.setAllowGravity(false)
    }
 
    move(direction: number) {
        player.body.x += direction
    }
}