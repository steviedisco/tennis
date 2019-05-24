import * as framework from "helpers/exports";

export class paddle extends framework.entity 
{
    player: framework.enums.players;

    private readonly PADDLE_THICKNESS: number = 15;
    private readonly PADDLE_HEIGHT: number = 130;
    private readonly PADDLE_HEIGHT_HALF: number = this.PADDLE_HEIGHT / 2;
    private readonly RETURN_DEADZONE: number = 7;
    private readonly HITMOVE_DEADZONE: number = 5;
    private readonly ANGLE_MODIFIER: number = 0.1275;

    private $inputService: framework.IinputService;    

    constructor(IinputService: framework.IinputService)
    {
        super();

        this.$inputService = IinputService;
    };

    initialise(): void
    {
        if (this.player == framework.enums.players.PLAYER1)
        {
            this.rectangle.setPosition(2 * this.PADDLE_THICKNESS, (framework.renderService.DEFAULT_HEIGHT / 2) - this.PADDLE_HEIGHT_HALF);            
            this.rectangle.setSize(this.PADDLE_THICKNESS, this.PADDLE_HEIGHT);
            this.rectangle.setColour("#e81e2e");
        }  
        else
        {
            // TODO
        }              

        this.recordPosition();

        this.$inputService.registerMouseMoveListener([this.setPaddlePosition, this]);
    }

    static create(player: framework.enums.players): framework.paddle
    {
        let paddle = framework.entity.create<framework.paddle>("paddle") as framework.paddle;
        paddle.player = player;
        return paddle;
    }

    setPaddlePosition(mousePos: framework.point, _this: paddle): void
    {
        _this.setPosition(undefined, mousePos.y -_this.PADDLE_HEIGHT_HALF);
    };
};