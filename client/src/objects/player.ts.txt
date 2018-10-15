import { Mob } from "./mob";
import { PlayerController } from "../controllers/playerController";
import { GlobalManager } from "../managers/globalManager";

export class Player extends Mob {
  public Controller:PlayerController;
  
  constructor(params) {
    super(params);
    params.owner = this;
    this.Controller = new PlayerController(params);
  }

}