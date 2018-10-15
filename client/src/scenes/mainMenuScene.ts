import { CONST } from "../model/const";
import { GlobalManager } from "../managers/globalManager";

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void { 
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );

    // reset score, highscore and player lives
    if (GlobalManager.ScoreRead() > GlobalManager.HighScoreRead()) {
      GlobalManager.HighScoreUpdate(GlobalManager.ScoreRead())
    }
    GlobalManager.ScoreUpdate(0)
  }

  preload(): void {
    
    /*this.load.bitmapFont(
      "returnOfGanon",
      "./assets/font/return_of_ganon_regular_12.png",
      "./assets/font/return_of_ganon_regular_12.xml"
    );*/
    //this.load.spritesheet("hi", "./assets/hi.png", { frameWidth: 32, frameHeight: 32 })
    
  }

  create(): void {
    let startTxt = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2 + 40,
      "Press S To Play"
    );
    startTxt.setFont("ReturnofGanon");
    startTxt.setFontSize(32);
    startTxt.setAlign("center")

    let logoTxt = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2 - 60,
      "Pixel Arcade"
    );
    logoTxt.setAlign("center")
    logoTxt.setFont("ReturnofGanon");
    logoTxt.setFontSize(50);

    /*this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 + 40,
        "returnOfGanon",
        "PRESS S TO PLAY",
        45
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 - 60,
        "returnOfGanon",
        "A S T E R O I D",
        80
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 + 80,
        "returnOfGanon",
        "HIGHSCORE: " + CONST.HIGHSCORE,
        45
      )
    );
*/
    
   /* let frames = this.anims.generateFrameNumbers("hi", {"start": 0, "end": 4});
    var config = {
        key: 'hikey',
        frames: frames,
        repeat: -1,
        frameRate: 1
    };
    

    this.anims.create(config);
    var hi = this.add.sprite(400, 300, 'hi');
    hi.anims.play('hikey');*/
    
  }

  update(): void {
    //this.scene.start("GameScene");
    //return;
    
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}