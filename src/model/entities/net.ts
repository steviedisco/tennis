import * as framework from "helpers/exports";

export class net extends framework.entity 
{
    private static readonly NET_COLOUR: string = '#7b89a0';    
    private static readonly NET_LENGTH: number = 40;
    private static readonly NET_GAP: number = 50;
    private static readonly NET_WIDTH: number = 4;

    constructor()
    {
        super(undefined, undefined, undefined, undefined, net.NET_COLOUR);
    };

    initialise(): void
    {
        this.set(framework.renderService.RENDER_WIDTH / 2 - 1, 0, net.NET_WIDTH, net.NET_LENGTH);
    };

    render(): void
    {        
        for (let i = 0; i < framework.renderService.RENDER_HEIGHT; i += net.NET_GAP) 
        {
            this.setPosition(undefined, i);
            super.render();
        }
    };  
}; 