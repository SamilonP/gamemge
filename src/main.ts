import Phaser from 'phaser'
import './style.css'
import Gamescene from './Gamescene'


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320 * 1.5,
    height: 480 * 1.5,
    
    scene: [
        
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}
    
// @ts-ignore
const game = new Gamescene(config)