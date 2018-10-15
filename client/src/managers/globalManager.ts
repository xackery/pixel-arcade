//import { PlayerManager } from "./playerManager";
import { GameManager } from "./gameManager";

export class GlobalManager {    
    static instance:GlobalManager;
    private logBuffer:Array<string> = new Array<string>();    
    private logTxt:Phaser.GameObjects.Text;
    private score:integer;
    private highScore:integer;

    //public static Player:PlayerManager;
    public static Game:GameManager;
    
    public static Initialize() {
     //   GlobalManager.Player = new PlayerManager();
        GlobalManager.Game = new GameManager();        
    }

    static ScoreRead() {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        return instance.score;
    }

    static ScoreUpdate(score:integer) {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        instance.score = score;
    }

    static HighScoreRead() {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        return instance.highScore;
    }

    static HighScoreUpdate(highScore:integer) {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        instance.score = highScore;
    }
    
    static SetLog(log:Phaser.GameObjects.Text) {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        instance.logTxt = log;
    }

    static Log(message:string) {
        if (GlobalManager.instance == null) GlobalManager.instance = new GlobalManager();
        let instance = GlobalManager.instance;
        if (IS_DEBUG) console.trace(message);
        if (instance.logTxt == null) {
            return;
        }
        instance.logBuffer.push(message);
        if (instance.logBuffer.length > 10) {
            instance.logBuffer.splice(0, 1);
        } 
        let buffer = "";
        for (let i = 0; i < instance.logBuffer.length; i++) {
            buffer += instance.logBuffer[i] + "\n";
        }
        buffer = buffer.slice(0, -1);
        instance.logTxt.setText(buffer);        
	}
	static GetScreenWidth():number {
		let width = window.innerWidth;
		if (width < 200) width = 200;
		if (width > 2000) width = 2000;
		return width;
	}
	
	static GetScreenHeight():number {
		let height = (window.innerHeight) - 10;    
		if (height < 200) height = 200;
		if (height > 1100) height = 1100;
		return height;
	}
}