//import { Player } from "../objects/player";
import { ScaleModes } from "phaser";
import { Game } from "../game";
import { GlobalManager } from "../managers/globalManager";
 
enum Direction { 
  Center = 0,
  Up,
  UpRight,
  Right,
  DownRight,
  Down,
  DownLeft,
  Left,
  UpLeft,  
}

export class GameScene extends Phaser.Scene {
  /*
  private layers: Phaser.Tilemaps.DynamicTilemapLayer[];
  private cameraX: number = 0;
  private cameraY: number = 0;
  private worldPosTxt: Phaser.GameObjects.Text;
  private cameraPosTxt: Phaser.GameObjects.Text;
  private idTxt: Phaser.GameObjects.Text;

  private tileWidthMax: number = 150;
  private tileHeightMax: number = 150;
  private tileWidth: number = 32;
  private tileHeight: number = 32;
  private canvasWidth: number = this.tileWidthMax * this.tileWidth;
  private canvasHeight: number = this.tileHeightMax * this.tileHeight;
  

  SetCameraPosition(x:number, y:number) {
    this.cameraX = x;
    this.cameraY = y;
  }

  constructor() {
    super({
      key: "GameScene"
    });
    GlobalManager.Game.CurrentScene = this;
  }


  create(): void {
    this.input.on('dragstart', this.onDragStart);
    this.input.on('drag', this.onDrag);
    this.input.on('dragend', this.onDragEnd);

    this.SetCameraPosition(0,0);
    this.layers = new Array();

    for (let i = 0; i < 9; i++) {
      let level:number[][] = [];
      let tileIndex = i+11;//i+8024;
      for (let x = 0; x < this.tileWidthMax; x++) {
        let row:number[] = [];
        for (let y = 0; y < this.tileHeightMax; y++) {
          row.push(tileIndex);// + (Math.random() * 6)+1);
        }
        level.push(row);
      }

      level[30][30] = 591;
      level[30][31] = 592;
      level[31][30] = 639;
      level[31][31] = 640;
      level[32][30] = 687;
      level[32][31] = 688;
      let mapConfig: TilemapConfig = {
        //key: "zelda-map",
        data: level,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
      }
      let map = this.make.tilemap(mapConfig);
      level = null;
      let tileset = map.addTilesetImage("light-world-tiles")
      let layer = map.createDynamicLayer(0, tileset, 0, 0);
      layer.scaleMode = ScaleModes.NEAREST;
      this.layers.push(layer);
    }
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    
    

    this.worldPosTxt = this.add.text(
      10,
      10,
      "World"
    );
    this.worldPosTxt.setFont("ReturnofGanon");
    this.worldPosTxt.setFontSize(18);
    this.worldPosTxt.setAlign("left")

    this.cameraPosTxt = this.add.text(
      10,
      30,
      "Camera"
    );
    this.cameraPosTxt.setFont("ReturnofGanon");
    this.cameraPosTxt.setFontSize(18);
	this.cameraPosTxt.setAlign("left")

	this.idTxt = this.add.text(
		10,
		50,
		"ID: unknown"
	  );
	  this.idTxt.setFont("ReturnofGanon");
	  this.idTxt.setFontSize(18);
	  this.idTxt.setAlign("left")
	



    let logTxt = this.add.text(
      10,
      90,
      "Connecting..."
    );
    logTxt.setFont("ReturnofGanon");
    logTxt.setFontSize(24);
    logTxt.setAlign("left")

    GlobalManager.SetLog(logTxt);
    
    let player = GlobalManager.Player.CreatePlayer({name: "me", isPlayer: true});
    console.log(player);
    GlobalManager.Player.SetCurrentPlayer(player);
	console.log(GlobalManager.Player.GetCurrentPlayer());
	this.idTxt.setText("ID: "+player.GetId());
    console.log("Connected");
  }
/*
  onDragStart(pointer, gameObject, dragX, dragY): void {
    console.log("Drag started at"+dragX+", "+dragY);
    let letter = gameObject as Letter
    if (letter == undefined) {
      return;
    }
    letter.MoveToWorldPos(dragX, dragY);
    letter.IsDragging(true);
  }

  onDrag(pointer, gameObject, dragX, dragY): void {
    console.log("Drag continued at"+dragX+", "+dragY);
    let letter = gameObject as Letter
    if (letter == undefined) {
      return;
    }
    letter.MoveToWorldPos(dragX, dragY);
  }

  onDragEnd(pointer, gameObject): void {
    let letter = gameObject as Letter
    if (letter == undefined) {
      return;
    }
    letter.IsDragging(false);
  }
*/

  update(): void {
    /*
    let player = GlobalManager.Player.GetCurrentPlayer();
	this.idTxt.setText("ID: "+player.GetName()+" (online: "+GlobalManager.Player.PlayerCount()+")");
	
	GlobalManager.Game.OnUpdate(true);
	
	let worldX = GlobalManager.Game.GetWorldX();
	let worldY = GlobalManager.Game.GetWorldY();
    worldX += player.Controller.DeltaX;
    worldY += player.Controller.DeltaY;

    
    //camera inverts player position movement
    this.cameraX -= player.Controller.DeltaX;
    this.cameraY -= player.Controller.DeltaY;
    let xLimit = this.canvasWidth*3;
    let yLimit = this.canvasHeight*3;
    if (this.cameraX >= xLimit) this.cameraX -= xLimit;
    if (this.cameraX <= -xLimit) this.cameraX += xLimit;
    if (this.cameraY >= yLimit) this.cameraY -= yLimit;
    if (this.cameraY <= -yLimit) this.cameraY += yLimit;    
    
    for (let i = 0; i < 9; i++) {
      let x = this.cameraX;
      let y = this.cameraY;
      if (i == Direction.Center) { }
      else if (i == Direction.Up) { y -= this.canvasWidth; }
      else if (i == Direction.UpRight) { x += this.canvasWidth; y -= this.canvasHeight; }
      else if (i == Direction.Right) { x += this.canvasWidth;}
      else if (i == Direction.DownRight) { x += this.canvasWidth; y += this.canvasHeight; }
      else if (i == Direction.Down) { y += this.canvasHeight; }
      else if (i == Direction.DownLeft) { x -= this.canvasWidth; y += this.canvasHeight; }
      else if (i == Direction.Left) { x -= this.canvasWidth;}
      else if (i == Direction.UpLeft) { x -= this.canvasWidth; y -= this.canvasHeight; }

      //Left Panning
      if (this.cameraX < -(this.canvasWidth/2) && (i == Direction.DownLeft || i == Direction.Left || i == Direction.UpLeft)) x += (this.canvasWidth*3);
      if (this.cameraX < -(this.canvasWidth/2)-this.canvasWidth && (i == Direction.Center || i == Direction.Up || i == Direction.Down)) x += (this.canvasWidth*3);

      //Right Panning
      if (this.cameraX > (this.canvasWidth/2) && (i == Direction.DownRight || i == Direction.Right || i == Direction.UpRight)) x -= (this.canvasWidth*3);
      if (this.cameraX > (this.canvasWidth/2)+this.canvasWidth && (i == Direction.Center || i == Direction.Up || i == Direction.Down)) x -= (this.canvasWidth*3);

      //Up Panning
      if (this.cameraY < -(this.canvasHeight/2) && (i == Direction.UpLeft || i == Direction.Up || i == Direction.UpRight)) y += (this.canvasHeight*3);
      if (this.cameraY < -(this.canvasHeight/2)-this.canvasHeight && (i == Direction.Center || i == Direction.Left || i == Direction.Right)) y += (this.canvasHeight*3);

      //Down Panning
      if (this.cameraY > (this.canvasHeight/2) && (i == Direction.DownLeft || i == Direction.Down || i == Direction.DownRight)) y -= (this.canvasHeight*3);
      if (this.cameraY > (this.canvasHeight/2)+this.canvasHeight && (i == Direction.Center || i == Direction.Left || i == Direction.Right)) y -= (this.canvasHeight*3);

      this.layers[i].setPosition(x, y);
    }

    this.worldPosTxt.setText("World: "+worldX+", "+worldY);
    this.cameraPosTxt.setText("Camera: "+this.cameraX+", "+this.cameraY);
    

      
    if (player.Controller.DeltaX != 0 || player.Controller.DeltaY != 0) {      
      player.SetPositionXY(worldX, worldY);      
    }

	GlobalManager.Game.SetWorldXY(worldX, worldY)
	
    GlobalManager.Game.OnUpdate(false);
  }

  private getRandomSpawnPostion(aScreenSize: number): number {
    let rndPos = Phaser.Math.RND.between(0, aScreenSize);

    while (rndPos > aScreenSize / 3 && rndPos < aScreenSize * 2 / 3) {
      rndPos = Phaser.Math.RND.between(0, aScreenSize);
    }

    return rndPos;
  }
  */
 }
}