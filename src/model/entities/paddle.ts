import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class paddle extends framework.entity implements framework.Irenderable, framework.Iinitialisable
{
    player: framework.enums.players;

    private readonly PADDLE_THICKNESS: number = 15;
    private readonly PADDLE_HEIGHT: number = 130;
    private readonly RETURN_DEADZONE: number = 7;
    private readonly HITMOVE_DEADZONE: number = 5;
    private readonly ANGLE_MODIFIER: number = 0.1275;

    private $renderService: framework.IrenderService;

    private position: framework.point;
    private previousPosition: framework.point;

    constructor(IrenderService: framework.IrenderService)
    {
        super();

        this.$renderService = IrenderService;
    };

    initialise(): void
    {
        if (this.player == framework.enums.players.PLAYER1)
        {
            this.position = new framework.point(
                2 * this.PADDLE_THICKNESS, 
                (this.$renderService.canvas.height / 2) - this.halfPaddleHeight());
        }  
        else
        {
        }              

        this.previousPosition = new framework.point();
        this.previousPosition.setFromPoint(this.position);

        this.resize();
    }

    render(): void
    {        
    };

    resize(): void
    {     
    };

    static createPaddle(player: framework.enums.players): framework.paddle
    {
        let paddle = (global.$jsInject.get("net") as framework.paddle).clone() as framework.paddle;
        paddle.player = player;
        return paddle;
    }

    private halfPaddleHeight(): number
    {
        return this.PADDLE_HEIGHT / 2;
    };
};