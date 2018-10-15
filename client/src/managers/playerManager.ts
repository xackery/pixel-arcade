import { Player } from "../objects/player";
import { Hash } from "crypto";
import { MapField } from "protobufjs";
import { GlobalManager } from "./globalManager";

export class PlayerManager {    
    static instance:PlayerManager;
    private currentPlayer:Player;
    private players:Map<string, Player> = new Map();


	public PlayerCount():number {
		return this.players.size;
	}

    public GetPlayer(id:string):Player {
        return this.players.get(id);
    }

    public GetCurrentPlayer():Player {
        return this.currentPlayer;
    }

    public SetCurrentPlayer(player:Player) {
        if (this.currentPlayer != null && player.GetId() != this.currentPlayer.GetId()) {
            this.ChangePlayerId(this.currentPlayer.GetId(), player.GetId())
        }
        this.currentPlayer = player;
    }

    public ChangePlayerId(from:string, to:string):Player {
        let player = this.players.get(from);
        if (player == null) return null
		this.players.set(to, player);
		this.players.delete(from);
        return player
    }

    public CreatePlayer(params):Player {
        if (params.scene == null) {
            params.scene = GlobalManager.Game.CurrentScene;
		}
		
		let player = new Player(params);
		this.players.set(player.GetId(), player);
		console.log(this.players[player.GetId()]);
        return player;
    }

    public DeletePlayerById(id:string) {	
		this.players.delete(id);
    }


    public DeletePlayer(player:Player) {
		this.players.delete(player.GetId());
    }

    //called exclusively by GameManager
    public OnUpdate(forPlayer:boolean) {
        this.players.forEach((player: Player, key: string) => {
			if (key == this.currentPlayer.GetId() && forPlayer) player.Controller.update();
			else player.Controller.update();
        })
    }
}