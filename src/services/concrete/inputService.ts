import * as framework from "helpers/exports";

export class inputService implements framework.IinputService
{
    private $renderService: framework.IrenderService;

    private mouseMoveListeners: [Function, any][] = new Array();
    private mousePos: framework.point = new framework.point();

    private debug: boolean = false;

    constructor(IrenderService: framework.IrenderService)
    {
        this.$renderService = IrenderService;
    };

    initialise(params: any[] = undefined) // Document
    {    
        if (params != undefined)
            this.debug = params[0] as boolean;

        this.registerOverlayListener("mousemove", this.handleMouseMove);
    };

    process(): void
    {
        if (this.debug)
        {
            let x = this.mousePos.x;
            let y = this.mousePos.y;
            let canvasContext = this.$renderService.getCanvasContext();
            this.$renderService.drawText(`${Math.round(x)}, ${Math.round(y)}`, x, y);
        }           
    };

    registerOverlayListener(eventName: string, listener: Function): void
    {
        this.$renderService.overlay.addEventListener(eventName, ((event: CustomEvent) => { listener(event, this) }) as EventListener);
    };
    
    registerMouseMoveListener(listener: [Function, any]): void
    {  
        this.mouseMoveListeners.push(listener);
    }

    handleMouseMove(evt: MouseEvent, _this: inputService): void
    {
        _this.calculateMousePos(evt);

        _this.mouseMoveListeners.forEach(([listener, _listener]) => { listener(_this.mousePos, _listener); })
    };

    private calculateMousePos(evt: MouseEvent): void
    {
        let canvas = event.target as HTMLCanvasElement;
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;

        let canvasContext = this.$renderService.getCanvasContext();
        let scaleX = (framework.renderService.RENDER_WIDTH / canvasContext[0].width);
        let scaleY = (framework.renderService.RENDER_HEIGHT / canvasContext[0].height);

        this.mousePos.set(mouseX * scaleX, mouseY * scaleY);
    };
};