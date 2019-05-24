import * as framework from "helpers/exports";
import * as global from "helpers/globals";
import { staticDecorator } from "helpers/exports";

@staticDecorator<framework.Icreateable>()
export abstract class entity implements framework.Irenderable, framework.Iinitialisable
{    
    id: string;
    protected rectangle: framework.rectangle;
    protected previousPosition: framework.point = new framework.point();

    constructor(x: number = 0, y: number = 0, height: number = 1, width: number = 1, colour: string = 'pink')
    {                
        this.id = framework.helpers.generateId();

        this.rectangle = new framework.rectangle(colour);
        this.rectangle.set(x, y, height, width);
    };           

    abstract initialise(): void;

    position = () => this.rectangle.position;
    
    setPosition(x: number, y: number): void
    {
        this.rectangle.setPosition(x, y);
    };
    
    recordPosition = () => this.previousPosition.setFromPoint(this.position());

    render(): void
    {        
        this.rectangle.render();
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