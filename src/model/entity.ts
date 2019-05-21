import * as framework from "helpers/exports";

export abstract class entity implements framework.Irenderable, framework.Iinitialisable
{    
    id: string;
    protected rectangle: framework.rectangle;

    constructor(x: number = 0, y: number = 0, height: number = 1, width: number = 1, colour: string = 'pink')
    {                
        this.id = framework.helpers.generateId();

        this.rectangle = new framework.rectangle(colour);
        this.rectangle.set(x, y, height, width);
    };   
    
    abstract initialise(): void;
    abstract resize(): void;

    render(): void
    {        
        this.rectangle.render();
    };

    clone(): entity 
    {
        return Object.create(this);
    }
}