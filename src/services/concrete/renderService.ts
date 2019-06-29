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
    clientHeight: number;
    
    bufferIndex: number = 0;    
    buffers: HTMLCanvasElement[]; 

    overlay: HTMLCanvasElement;
    overlayContext: CanvasRenderingContext2D;

    backCanvas: HTMLCanvasElement;
    backCanvasContext: CanvasRenderingContext2D;

    frontCanvas: HTMLCanvasElement;
    frontCanvasContext: CanvasRenderingContext2D;
    
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

        let self = this;
        let root = self.document.documentElement;
        self.clientHeight = root.clientHeight;
        
        window.addEventListener('resize', function() {
            let root = self.document.documentElement;
            self.clientHeight = root.clientHeight;
        }, false);

        this.buffers = [
            this.document.createElement('canvas'),
            this.document.createElement('canvas')
        ];    

        this.buffers.forEach((buffer) => {                       
            this.document.body.appendChild(buffer);
        });

        this.overlay = this.document.createElement('canvas');
        this.document.body.appendChild(this.overlay);

        this.overlayContext = this.overlay.getContext('2d');

        this.initialiseBuffers();
        this.setCanvasContext();
    };

    initialiseBuffers(): void {
        let zindex: number = 0;
        
        this.buffers.forEach((buffer) => {
            buffer.style["z-index"] = zindex++;
            buffer.style.visibility = "hidden";
        });

        this.overlay.style["z-index"] = zindex++;
        this.overlay.style["background"] = "transparent";
    }
    
    renderAll(): void
    {        
        this.scaleCanvas(this.backCanvas);
        this.centreCanvas(this.backCanvas);        
        this.clear();
        
        this.renderEntities();
        
        this.swapBuffers();
        this.setCanvasContext();

        this.scaleCanvas(this.overlay);
        this.centreCanvas(this.overlay);        
        this.overlayContext.clearRect(0, 0, renderService.RENDER_WIDTH, renderService.RENDER_HEIGHT);
    };
    
    private scaleCanvas(canvas: HTMLCanvasElement): void
    {
        let baseScale = renderService.RENDER_WIDTH / renderService.RENDER_HEIGHT;
        let scaleX: number = (this.clientHeight * baseScale) / renderService.RENDER_WIDTH;
        let width = renderService.RENDER_WIDTH * scaleX;

        if (canvas.width != width)
            canvas.width = width;

        if (canvas.height != this.clientHeight)
            canvas.height = this.clientHeight;
        
        // keep to 16:9
        let scaleY: number = canvas.height / renderService.RENDER_HEIGHT;
        canvas.getContext('2d').scale(scaleX, scaleY);
    };

    private renderEntities(): void
    {
        let entity: framework.entity = null;

        while ((entity = this.$sceneService.getNextEntity()))
        {
            if (renderService.isRenderable(entity))  
                (entity as Irenderable).render();
        }
    };

    private swapBuffers(): void
    {
        this.buffers[this.bufferIndex].style["z-index"] = 1;
        this.buffers[1 - this.bufferIndex].style["z-index"] = 0;
        
        this.buffers[this.bufferIndex].style.visibility = "visible";
        this.buffers[1 - this.bufferIndex].style.visibility = "hidden";
        
        this.bufferIndex = 1 - this.bufferIndex;                
    };

    private setCanvasContext(): void
    {
        this.backCanvas = this.buffers[this.bufferIndex];
        this.backCanvasContext = this.backCanvas.getContext('2d');
    };

    private centreCanvas(canvas: HTMLCanvasElement): void
    {
        let root = this.document.documentElement;
        let posX: number = (root.clientWidth / 2) - (canvas.width / 2);
        canvas.style["left"] = `${posX}px`;
        canvas.style["top"] = "0px";
    };
    
    private clear(): void
    {
        let debugSize = 5;
        this.drawRectangle(0, 0, renderService.RENDER_WIDTH, renderService.RENDER_HEIGHT, "red");
        this.drawRectangle(debugSize, debugSize, renderService.RENDER_WIDTH - (debugSize*2), renderService.RENDER_HEIGHT - (debugSize*2), this.$configService.settings.bgColour);
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

    private static isRenderable(arg: any): arg is Irenderable 
    {
        return arg.render !== undefined;
    };
};