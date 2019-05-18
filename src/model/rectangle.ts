import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class rectangle implements framework.Irenderable
{    
    $renderService: framework.IrenderService;

    protected x: number;
    protected y: number;
    protected height: number;
    protected width: number;
    protected colour: string;

    constructor(colour: string) {
        this.$renderService = global.$jsInject.get("IrenderService") as framework.IrenderService;
        this.colour = colour;
    };

    setPosition(x: number, y: number): void
    {
        if (x != undefined)
            this.x = x;
        
        if (y != undefined)
            this.y = y;
    };

    setSize(width: number, height: number): void
    {
        if (width != undefined)
            this.width = width;

        if (height != undefined)
            this.height = height;        
    };

    set(x: number, y: number, width: number, height: number): void
    {
        this.setPosition(x, y);
        this.setSize(width, height);
    };

    render(): void
    {
        this.$renderService.drawRectangle(this.x, this.y, this.width, this.height, this.colour);
    };

    resize(): void { };
};