export class Entity {
    private id:string;
    private position:model.Position;

    constructor (params) {
        this.id = (params.id == null) ? "unknown" : params.id;
       // this.position = model.Position.create({x: 0, y: 0});
        if (params.position != null) {            
            this.position.x = params.position.x;
            this.position.y = params.position.y;
        } else if (params.x != null && params.y != null) {
            this.position.x = params.x;
            this.position.y = params.y;
        }
    }

    public SetId(id:string) {
        this.id = id;
    }

    public GetId():string {
        return this.id;
    }

}