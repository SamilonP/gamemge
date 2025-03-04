import Phaser from 'phaser'
import MainGame from './game.ts'
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#564D65',
    width: 1500,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 900},
        }
    },
    scene: [MainGame]
}

const game = new Phaser.Game(config)