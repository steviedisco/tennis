import * as framework from "helpers/exports";

export class inputService implements framework.IinputService
{
    $renderService: framework.IrenderService;

    constructor(IrenderService: framework.IrenderService)
    {
        this.$renderService = IrenderService;
    };

    initialise(): void
    {
        this.registerCanvasListener("mousemove", this.calculateMousePos);
    };

    process(): void
    {
    };

    registerCanvasListener(eventName: string, listener: Function): void
    {
        for (let canvas of this.$renderService.buffers) {
            canvas.addEventListener(eventName, ((event: MouseEvent) => listener) as unknown as EventListener)   
        }   
    };

    /*
    private handleMouseMove(event): void
    {
        this.calculateMousePos(event);
        // paddle1Pos.y = mousePos.y - (PADDLE_HEIGHT/2);
    };
    */

    private handleMouseClick(event: MouseEvent): void
    {
        /*
        if(showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
            isOutOfPlay = true;
            ballReset();
        }
        */
    };

    private calculateMousePos(evt: MouseEvent): void
    {
        let canvas = event.target as HTMLCanvasElement;
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;

        // this.mousePos.set(mouseX, mouseY);
    };
};