import { BulletController } from "./bulletController";
import { CONST } from "../model/const";
import { GlobalManager } from "../managers/globalManager";
import { Player } from "../objects/player";
import { GameManager } from "../managers/gameManager";

export class PlayerController extends Phaser.GameObjects.Graphics {
  private owner:Player;

  private isPlayer:boolean = false;
  private currentScene: Phaser.Scene;
  private velocity: Phaser.Math.Vector2;
  private bullets: BulletController[];
  private shootKey: Phaser.Input.Keyboard.Key;
  private isShooting: boolean;  
  private cursors: CursorKeys;
  public pointers: Phaser.Input.Pointer[];
  public DeltaX: number = 0;
  public DeltaY: number = 0;
  private labelTxt: Phaser.GameObjects.Text;

  constructor(params) {
    super(params.scene, params.opt);
    this.owner = params.owner;
    this.isPlayer = params.isPlayer;

    // variables
    this.currentScene = GlobalManager.Game.CurrentScene
    this.bullets = [];
    this.isShooting = false;

    // init ship
    this.initPlayer();
    if (this.isPlayer) {        
        // input
        this.shootKey = this.currentScene.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        );    
        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        this.pointers = this.currentScene.input.addPointer(1);      
    }

    // physics
    //this.currentScene.physics.world.enable(this);
    // this.body.allowGravity = false;
    // this.body.setSize(CONST.SHIP_SIZE * 2, CONST.SHIP_SIZE * 2);
    // this.body.setOffset(-CONST.SHIP_SIZE, -CONST.SHIP_SIZE);
	this.currentScene.add.existing(this);
	
	this.labelTxt = this.currentScene.add.text(
		0,
		-60,
		this.owner.GetName() + " " + this.owner.GetPosition().x+ ", " + this.owner.GetPosition().y
	);
	this.labelTxt.setFont("ReturnofGanon");
	this.labelTxt.setFontSize(18);
	this.labelTxt.setAlign("left")
  }

  public getBullets(): BulletController[] {
    return this.bullets;
  }

  public getBody(): any {
    return this.body;
  }

  private initPlayer(): void {
    // define ship properties
    this.x = this.currentScene.sys.canvas.width / 2;
    this.y = this.currentScene.sys.canvas.height / 2;
    this.velocity = new Phaser.Math.Vector2(0, 0);

    // define ship graphics and draw it
    this.lineStyle(1, 0xffffff);

    this.strokeTriangle(
      -CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      0,
      -CONST.SHIP_SIZE
    );
  }

  update(): void {
	  let myX = 0;
	  let myY = 0;
	if (this.isPlayer) {
		this.handleInput();
		myX = GlobalManager.GetScreenWidth()/2;
		myY = GlobalManager.GetScreenHeight()/2;
    } else {
		if (this.owner == null) console.log("NULL OWNER?!");

		myX = GlobalManager.GetScreenWidth()/2;
		myX += this.owner.GetPosition().x-GlobalManager.Game.GetWorldX();
		myY = GlobalManager.GetScreenHeight()/2;
		myY += this.owner.GetPosition().y-GlobalManager.Game.GetWorldY();
		this.setPosition(myX, myY);
	}
	this.labelTxt.setText(this.owner.GetName() + " " + this.owner.GetPosition().x+ ", " + this.owner.GetPosition().y);
	this.labelTxt.setPosition(myX, myY-30);

    this.updateBullets();
  }

  private handleInput(): void {
    this.DeltaX = 0;
    this.DeltaY = 0;

    let angle = 0;

    let moveSpeed = 2;

    let pointer = this.currentScene.input.activePointer;
    if (pointer != null && pointer.isDown) {
      if (pointer.position.y < this.y) { this.DeltaY -= moveSpeed; angle = 0; }
      if (pointer.position.x > this.x)  { this.DeltaX += moveSpeed; angle = 90; }
      if (pointer.position.y > this.y) { this.DeltaY += moveSpeed; angle = 180; }
      if (pointer.position.x < this.y) { this.DeltaX -= moveSpeed; angle = 270; }
    }

    pointer = this.currentScene.input.mousePointer;
    if ((this.DeltaX == 0 || this.DeltaY == 0) && pointer != null && pointer.isDown) {
      if (pointer.position.y < this.y) { this.DeltaY -= moveSpeed; angle = 0; }
      if (pointer.position.x > this.x)  { this.DeltaX += moveSpeed; angle = 90; }
      if (pointer.position.y > this.y) { this.DeltaY += moveSpeed; angle = 180; }
      if (pointer.position.x < this.y) { this.DeltaX -= moveSpeed; angle = 270; }
    }

    if (this.DeltaX == 0 || this.DeltaY == 0) {
      if (this.cursors.up.isDown) {  this.DeltaY -= moveSpeed; angle = 0; }
      if (this.cursors.right.isDown) { this.DeltaX += moveSpeed; angle = 90; }
      if (this.cursors.down.isDown) { this.DeltaY += moveSpeed; angle = 180; }
      if (this.cursors.left.isDown) { this.DeltaX -= moveSpeed; angle = 270; }
    }

    if (this.DeltaX != 0 || this.DeltaY != 0) this.setAngle(angle);

    if (this.shootKey.isDown && !this.isShooting) {
      this.shoot();
      this.isShooting = true;
    }

    if (this.shootKey.isUp) {
      this.isShooting = false;
    }
    if (this.isShooting) {
      return;
    }
   
  }

  private shoot(): void {
    this.bullets.push(
      new BulletController(this.currentScene, {
        x: this.x,
        y: this.y,
        rotation: this.rotation
      })
    );
  }


  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update();
      } else {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}