import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class net extends framework.entity implements framework.Irenderable, framework.Iinitialisable
{
    private readonly NET_COLOUR: string = '#7b89a0';
    private readonly NET_LENGTH: number = 25;
    private readonly NET_GAP: number = 35;
    private readonly HEIGHT_RATIO: number = 0.00166;

    private $renderService: framework.IrenderService;

    constructor(IrenderService: framework.IrenderService)
    {
        super();

        this.$renderService = IrenderService;       

        this.rectangle.colour = this.NET_COLOUR;
    };

    initialise(): void
    {
        this.resize();
    };

    render(): void
    {        
        for (let i = 0; i < this.$renderService.canvas.height; i += this.resizeRatio(this.NET_GAP)) 
        {
            this.rectangle.y = i;
            this.rectangle.render();
        }
    };

    resize(): void
    {
        this.rectangle.set(this.$renderService.canvas.width / 2 - 1, 0, 2, this.resizeRatio(this.NET_LENGTH));        
    };

    private resizeRatio(input: number): number
    {
        return this.$renderService.canvas.height * this.HEIGHT_RATIO * input;
    };
};