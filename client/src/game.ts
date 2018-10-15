/// <reference path="phaser.d.ts"/>
import "phaser";
import { BootScene } from "./scenes/bootScene";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";
import { GlobalManager } from "./managers/globalManager";

var instance:Game;

export class Game extends Phaser.Game { 
  constructor(config: GameConfig) {    
    super(config);
  }
}



export function createGame() { 
    
    GlobalManager.Initialize(); 
    let config:GameConfig = {        
        title: "Survive RPG",
        url: "https://surviverpg.com",
        version: "1.0",
        width: GlobalManager.GetScreenWidth(),
        height: GlobalManager.GetScreenHeight(),
        type: Phaser.AUTO,
        parent: "game",
        "render.roundPixels": false,
       // "render.autoResize": true,            
        scene: [BootScene, MainMenuScene, GameScene],
        input: {
            keyboard: true,
            mouse: true,
            touch: true,
            gamepad: false
        },
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        },
        //zoom: 2,
        backgroundColor: "#000000", 
        "render.antialias": false,
        "render.pixelArt": true,
        };      
    let game = new Game(config);
    setGameInstance(game);

}

export function setGameInstance(game:Game) {
    instance = game;
}

export function getGameInstance():Game {
    return instance;
}

export function onResize() {
    let game = instance;    
    let width = GlobalManager.GetScreenWidth();
    let height = GlobalManager.GetScreenHeight();
    instance.resize(width, height);
    if (instance.scene.isActive("GameScene")) {
        instance.scene.getScene("GameScene").cameras.resize(width, height);
        return;
    }
  }