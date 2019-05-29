import * as framework from "helpers/exports";

export class ball extends framework.entity 
{
    protected static readonly BALL_RADIUS: number = 14;

    constructor()
    {
        super();
    };

    initialise(): void
    {        
        this.debug = true;

        let x = framework.renderService.RENDER_WIDTH / 2;
        let y = framework.renderService.RENDER_HEIGHT / 2;
        this.setPosition(x, y);
    };

    render(): void
    {        
        super.render();

        let x: number = this.position.x;
        let y: number = this.position.y;
        this.$renderService.drawCircle(x, y, ball.BALL_RADIUS, "white");                   
    };
};