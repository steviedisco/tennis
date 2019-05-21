import * as framework from "helpers/exports";

export class inputService implements framework.IinputService
{
    $renderService: framework.IrenderService;

    private mouseMoveListeners: [Function, any][] = new Array();
    private mousePos: framework.point = new framework.point();

    constructor(IrenderService: framework.IrenderService)
    {
        this.$renderService = IrenderService;
    };

    initialise(): void
    {
        this.registerOverlayListener("mousemove", this.handleMouseMove);
    };

    process(): void
    {
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

        this.mousePos.set(mouseX, mouseY);
    };
};