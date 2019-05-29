import * as framework from "helpers/exports";
import * as global from "helpers/globals";
import { staticDecorator } from "helpers/exports";

@staticDecorator<framework.Icreateable>()
export abstract class entity extends framework.rectangle implements framework.Irenderable
{    
    id: string;
    debug: boolean = false;
    protected previousPosition: framework.point = new framework.point();

    constructor(x: number = 0, y: number = 0, height: number = 0, width: number = 0, colour: string = 'pink', debug: boolean = false)
    {                
        super(colour);
        super.set(x, y, height, width);

        this.id = framework.helpers.generateId();
        this.debug = debug;
    };           

    setPosition(x: number, y: number): void
    {
        this.recordPosition();
        super.setPosition(x, y);        
    };

    move(x: number, y: number): void
    {
        let currentX = this.position.x;
        let currentY = this.position.y;
        this.setPosition(currentX + x, currentY + y);
    };
    
    private recordPosition = () => this.previousPosition.setFromPoint(this.position);

    render(): void
    {        
        super.render();

        if (this.debug)
        {
            let x: number = this.position.x;
            let y: number = this.position.y;
            this.$renderService.drawText(`${Math.round(x)}, ${Math.round(y)}`, x, y);
        }           
    };

    static create<T extends entity>(name: string): entity 
    {
        return (global.$jsInject.get(name) as T).clone() as T; 
    };

    clone(): entity 
    {
        return Object.create(this);
    }
}