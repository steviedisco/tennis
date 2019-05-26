import * as framework from "helpers/exports";
import * as global from "helpers/globals";
import { point } from "helpers/exports";

export class rectangle implements framework.Irenderable
{    
    protected $renderService: framework.IrenderService;

    position: point = new point();
    protected height: number;
    protected width: number;
    protected colour: string;

    constructor(colour: string = "pink") {
        this.$renderService = global.$jsInject.get("IrenderService") as framework.IrenderService;
        this.colour = colour;
    };

    setPosition(x: number, y: number): void
    {
        if (x != undefined)
            this.position.x = x;
        
        if (y != undefined)
            this.position.y = y;
    };

    setSize(width: number, height: number): void
    {
        if (width != undefined)
            this.width = width;

        if (height != undefined)
            this.height = height;
    };

    setColour(colour: string): void
    {
        if (colour != undefined)
            this.colour = colour;      
    };

    set(x: number, y: number, width: number, height: number): void
    {
        this.setPosition(x, y);
        this.setSize(width, height);
    };

    render(): void
    {
        this.$renderService.drawRectangle(this.position.x, this.position.y, this.width, this.height, this.colour);
    };
};