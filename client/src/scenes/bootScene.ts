import { Model } from "../model/model";

export class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: "BootScene"
      });
    }
    preload(): void {
      this.load.spritesheet("GEMS", "assets/sprites/diamonds32x5.png", Model.GEM_SIZE, Model.GEM_SIZE)
    }

    update(): void {
      this.scene.start("MainMenuScene");
    }
  }