import { CONST } from "../model/const";

export class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: "BootScene"
      });
    }
    preload(): void {
      //this.load.spritesheet("GEMS", "assets/sprites/diamonds32x5.png", CONST.GEM_SIZE, CONST.GEM_SIZE)
    }

    update(): void {
      this.scene.start("MainMenuScene");
    }
  }