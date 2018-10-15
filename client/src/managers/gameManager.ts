import { GlobalManager } from "./globalManager";
import { GameScene } from "../scenes/gameScene";

export class GameManager {    
    static instance:GameManager;
	public CurrentScene:GameScene;
	private worldX:number = 0;
	private worldY:number = 0;

    public OnUpdate(forPlayer:boolean) {
        GlobalManager.Player.OnUpdate(forPlayer);
	}
	public GetWorldX():number {
		return this.worldX;
	}
	public GetWorldY():number {
		return this.worldY;
	}
	public SetWorldXY(x:number, y:number) {
		this.worldX = x;
		this.worldY = y;
	}
	
}