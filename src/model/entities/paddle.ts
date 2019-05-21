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
    private $inputService: framework.IinputService;

    private previousPosition: framework.point = new framework.point();

    constructor(IrenderService: framework.IrenderService, IinputService: framework.IinputService)
    {
        super();

        this.$renderService = IrenderService;
        this.$inputService = IinputService;
    };

    initialise(): void
    {
        if (this.player == framework.enums.players.PLAYER1)
        {
            this.rectangle.setPosition(
                2 * this.PADDLE_THICKNESS, 
                (this.$renderService.canvas.height / 2) - this.halfPaddleHeight());
            
            this.rectangle.setSize(this.PADDLE_THICKNESS, this.PADDLE_HEIGHT);
            this.rectangle.setColour("e81e2e");
        }  
        else
        {
            // TODO
        }              

        this.previousPosition.setFromPoint(this.rectangle.position);

        this.$inputService.registerMouseMoveListener(this.setPaddlePosition);
    }

    render(): void
    {        
        this.rectangle.render();
    };

    resize(): void
    {     
    };

    static createPaddle(player: framework.enums.players): framework.paddle
    {
        let paddle = (global.$jsInject.get("paddle") as framework.paddle).clone() as framework.paddle;
        paddle.player = player;
        return paddle;
    }

    private setPaddlePosition(mousePos: framework.point): void
    {
        this.rectangle.setPosition(undefined, mousePos.y - this.halfPaddleHeight());
    };

    private halfPaddleHeight(): number
    {
        return this.PADDLE_HEIGHT / 2;
    };
};