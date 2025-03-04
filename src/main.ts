import Phaser from 'phaser'
import './style.css'


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320 * 1.5,
    height: 480 * 1.5,
    parent: 'app',
    scene: [
        
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 900 },
            debug: false
        }
    }
}
    
// @ts-ignore
const game = new Game(config)