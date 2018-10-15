import { Entity } from "./entity";

export class Mob extends Entity {
    private name:string;

    constructor(params) {
        super(params);
        this.name = params.name;
    }

    public GetName():string {
        return this.name;
    }

    public SetName(name:string) {
        this.name = name;
    }
}