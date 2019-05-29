import * as framework from "helpers/exports";

export class ball extends framework.entity implements framework.Iupdateable
{
    static readonly BALL_RADIUS: number = 14;

    protected speedX: number = 5;

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

        // let signX = Math.random() < 0.5 ? -1 : 1;
	    // this.speedX = signX * (6.0 + (1.0 * (player1Score + player2Score)));
    };

    update(): void
    {
        this.move(this.speedX, 0);
    };

    render(): void
    {        
        super.render();

        let x: number = this.position.x;
        let y: number = this.position.y;
        this.$renderService.drawCircle(x, y, ball.BALL_RADIUS, "white");                   
    };
};