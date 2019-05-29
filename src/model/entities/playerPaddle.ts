import * as framework from "helpers/exports";

export class playerPaddle extends framework.paddle implements framework.Iinitialisable
{
    private $inputService: framework.IinputService;    

    constructor(IinputService: framework.IinputService)
    {
        super();

        this.$inputService = IinputService;
    };

    initialise(): void 
    {
        this.debug = true;

        this.setPosition(2 * this.PADDLE_THICKNESS, (framework.renderService.RENDER_HEIGHT / 2) - this.PADDLE_HEIGHT_HALF);            
        this.setSize(this.PADDLE_THICKNESS, this.PADDLE_HEIGHT);
        this.setColour("#e81e2e");

        this.$inputService.registerMouseMoveListener([this.setPaddlePosition, this]);
    }

    setPaddlePosition(mousePos: framework.point, _this: framework.paddle): void
    {
        _this.setPosition(undefined, mousePos.y - _this.PADDLE_HEIGHT_HALF);
    };
};