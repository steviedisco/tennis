import * as framework from "helpers/exports";
import { Irenderable } from "helpers/exports";

enum action {
    RENDER = 'render',
    RESIZE = 'resize'
};

export class renderService implements framework.IrenderService, framework.Iinitialisable
{
    $configService: framework.IconfigService;
    $sceneService: framework.IsceneService;

    window: Window;
    document: Document;
    bufferIndex: number = 0;    
    buffers: HTMLCanvasElement[]; 

    overlay: HTMLCanvasElement;
    overlayContext: CanvasRenderingContext2D;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

    constructor(
        IconfigService: framework.IconfigService,
        IsceneService: framework.IsceneService)
    {
        this.$configService = IconfigService;
        this.$sceneService = IsceneService;
    };

    initialise(params: any[]) // Document
    {    
        this.window = params[0] as Window;
        this.document = params[1] as Document;

        this.buffers = [
            this.document.createElement('canvas'),
            this.document.createElement('canvas')
        ];    

        this.buffers.forEach((buffer) => {                       
            this.document.body.appendChild(buffer);
        });

        this.overlay = this.document.createElement('canvas');
        this.document.body.appendChild(this.overlay);

        this.initialiseBuffers();
    };

    renderAll(): void
    {
        this.clear();
        this.actionEntities(action.RENDER);
        this.swapBuffers();
    };

    resizeAll(): void
    {
        this.initialiseBuffers();

        this.actionEntities(action.RESIZE);
    };

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void
    {
        this.canvasContext.fillStyle = colour;
        this.canvasContext.fillRect(x, y, width, height);
    };

    private clear(): void
    {
        this.overlayContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, this.$configService.settings.bgColour);
    };

    private actionEntities(renderAction: action): void
    {
        let entity: framework.entity = null;

        while ((entity = this.$sceneService.getNextEntity()))
        {
            if (this.isRenderable(entity))  
            {
                switch (renderAction)     
                {
                    case action.RENDER:
                        (entity as Irenderable).render();     
                        break;
                    case action.RESIZE:
                        (entity as Irenderable).resize();
                        break;
                }                
            }
        }
    };

    private swapBuffers(): void
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";
        this.bufferIndex = 1 - this.bufferIndex;

        this.setCanvasContext();
    };

    initialiseBuffers(): void
    {
        let zindex: number = 0;

        this.buffers.forEach((buffer) => 
        {            
            buffer.style["z-index"] = zindex++;
            buffer.height = this.window.innerHeight - 1;
            buffer.width = this.window.innerWidth - 1;            
        });      

        this.overlay.style["z-index"] = zindex++;
        this.overlay.style["background"] = "transparent";
        this.overlay.height = this.window.innerHeight - 1;
        this.overlay.width = this.window.innerWidth - 1;   
        
        this.setCanvasContext();
    };

    getCanvasContext(): [HTMLCanvasElement, CanvasRenderingContext2D]
    {
        return [ this.canvas, this.canvasContext ];
    };

    private setCanvasContext(): void
    {
        this.canvas = this.buffers[this.bufferIndex];
        this.canvasContext = this.canvas.getContext('2d');
        this.overlayContext = this.overlay.getContext('2d');
    };    

    private isRenderable(arg: any): arg is Irenderable 
    {
        return arg.render !== undefined;
    };
};