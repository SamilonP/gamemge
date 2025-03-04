import Phaser from 'phaser'
import MainGame from './game.ts'

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1500,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 900}
        }
    },
    scene: [MainGame]
}

var game = new Phaser.Game(config)