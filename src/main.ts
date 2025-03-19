import Phaser from "phaser"
import MainGame from "./game"

import "./style.css";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor:"0x333333",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
        resizeInterval:500,
        fullscreenTarget:"game-container",
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0 , y: 900 },
            debug: false,
        },
    },
    scene: [MainGame],
};

const game = new Phaser.Game(config);
