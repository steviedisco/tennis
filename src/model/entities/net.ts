import * as framework from "helpers/exports";

export class net extends framework.entity 
{
    private static readonly NET_COLOUR: string = '#7b89a0';    
    private static readonly NET_LENGTH: number = 25;
    private static readonly NET_GAP: number = 35;

    constructor()
    {
        super(undefined, undefined, undefined, undefined, net.NET_COLOUR);
    };

    initialise(): void
    {
        this.set(framework.renderService.DEFAULT_WIDTH / 2 - 1, 0, 2, net.NET_LENGTH);
    };

    render(): void
    {        
        for (let i = 0; i < framework.renderService.DEFAULT_HEIGHT; i += net.NET_GAP) 
        {
            this.setPosition(undefined, i);
            super.render();
        }
    };  
};