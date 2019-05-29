import * as framework from "helpers/exports";
import { Irenderable } from "helpers/exports";

enum action {
    RENDER = 'render',
    RESIZE = 'resize'
};

export class renderService implements framework.IrenderService, framework.Iinitialisable
{
    private $configService: framework.IconfigService;
    private $sceneService: framework.IsceneService;

    window: Window;
    document: Document;
    
    bufferIndex: number = 0;    
    buffers: HTMLCanvasElement[]; 

    overlay: HTMLCanvasElement;
    overlayContext: CanvasRenderingContext2D;

    backCanvas: HTMLCanvasElement;
    backCanvasContext: CanvasRenderingContext2D;
    
    static readonly RENDER_WIDTH: number = 1920;
    static readonly RENDER_HEIGHT: number = 1080;

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

    initialiseBuffers(): void
    {
        let zindex: number = 0;

        this.buffers.forEach((buffer) => 
        {            
            buffer.style["z-index"] = zindex++;
            buffer.width = renderService.RENDER_WIDTH; 
            buffer.height = renderService.RENDER_HEIGHT;
        });      

        this.overlay.style["z-index"] = zindex++;
        this.overlay.style["background"] = "transparent";
        this.overlay.width = renderService.RENDER_WIDTH;
        this.overlay.height = renderService.RENDER_HEIGHT;

        this.setCanvasContext();
    };

    renderAll(): void
    {                
        this.renderEntities();
        this.swapBuffers();
        this.restoreCanvasContext();
        this.clear();
    };

    private saveCanvasContext()
    {
        this.backCanvasContext.save();
    };
    
    scaleCanvas(): void
    {
        this.backCanvas.width = this.window.innerWidth;
        this.backCanvas.height = this.window.innerHeight; 

        this.saveCanvasContext();

        let scaleX: number = this.window.innerWidth / renderService.RENDER_WIDTH;
        let scaleY: number = this.window.innerHeight / renderService.RENDER_HEIGHT;
        this.backCanvasContext.scale(scaleX, scaleY);               
        
        this.overlay.width = this.window.innerWidth;   
        this.overlay.height = this.window.innerHeight;
    };    

    private renderEntities(): void
    {
        let entity: framework.entity = null;

        while ((entity = this.$sceneService.getNextEntity()))
        {
            if (this.isRenderable(entity))  
                (entity as Irenderable).render();
        }
    };

    private swapBuffers(): void
    {
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        this.buffers[this.bufferIndex].style.visibility = "visible";
        this.bufferIndex = 1 - this.bufferIndex;

        this.setCanvasContext();
    };

    private setCanvasContext(): void
    {
        this.backCanvas = this.buffers[this.bufferIndex];
        this.backCanvasContext = this.backCanvas.getContext('2d');

        this.overlayContext = this.overlay.getContext('2d');
    };

    private restoreCanvasContext()
    {
        this.backCanvasContext.restore();
    };
    
    private clear(): void
    {
        this.overlayContext.clearRect(0, 0, this.backCanvas.width, this.backCanvas.height);

        this.backCanvasContext.fillStyle = this.$configService.settings.bgColour;
        this.backCanvasContext.fillRect(0, 0, this.backCanvas.width, this.backCanvas.height);
    };

    getCanvasContext(): [HTMLCanvasElement, CanvasRenderingContext2D]
    {
        return [ this.backCanvas, this.backCanvasContext ];
    };   

    drawCircle(x: number, y: number, radius: number, colour: string): void
    {
        this.backCanvasContext.fillStyle = colour;
        this.backCanvasContext.beginPath();
        this.backCanvasContext.arc(x, y, radius, 0, Math.PI*2, true);
        this.backCanvasContext.fill();
    };
    
    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void
    {
        this.backCanvasContext.fillStyle = colour;
        this.backCanvasContext.fillRect(x, y, width, height);
    };

    drawText(message: string, x: number, y: number, colour: string = "pink", font: string = "24px Calibri"): void
    {
        this.backCanvasContext.fillStyle = colour;
        this.backCanvasContext.font = font;
        this.backCanvasContext.fillText(message, x, y);
    };    

    private isRenderable(arg: any): arg is Irenderable 
    {
        return arg.render !== undefined;
    };
};