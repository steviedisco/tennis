import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class net extends framework.entity 
{
    private static readonly NET_COLOUR: string = '#7b89a0';    
    private static readonly NET_LENGTH: number = 25;
    private static readonly NET_GAP: number = 35;
    private static readonly HEIGHT_RATIO: number = 0.00166;

    private canvas: HTMLCanvasElement;

    constructor()
    {
        super(undefined, undefined, undefined, undefined, net.NET_COLOUR);             
    };

    initialise(): void
    {
        this.canvas = this.rectangle.$renderService.canvas;
    };

    render(): void
    {        
        for (let i = 0; i < this.canvas.height; i += this.resizeRatio(net.NET_GAP)) 
        {
            this.rectangle.setPosition(undefined, i);
            this.rectangle.render();
        }
    };

    resize(): void
    {
        this.rectangle.set(this.canvas.width / 2 - 1, 0, 2, this.resizeRatio(net.NET_LENGTH));        
    };

    static create(): framework.net
    {
        return (global.$jsInject.get("net") as framework.net).clone() as framework.net;
    }

    private resizeRatio(input: number): number
    {
        return this.canvas.height * net.HEIGHT_RATIO * input;
    };
};