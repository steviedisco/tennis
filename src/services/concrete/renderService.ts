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

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

    backCanvas: HTMLCanvasElement;
    backCanvasContext: CanvasRenderingContext2D;

    static readonly DEFAULT_WIDTH: number = 800;
    static readonly DEFAULT_HEIGHT: number = 600;    

    ratioX = () => this.canvas.width / renderService.DEFAULT_WIDTH;
    ratioY = () => this.canvas.height / renderService.DEFAULT_HEIGHT;

    resizeX = (input: number) => this.ratioX() * input;
    resizeY = (input: number) => this.ratioY() * input;

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
        this.setCanvasContext();
    };

    renderAll(): void
    {
        this.renderEntities();
        this.swapBuffers();
        this.clear();
    };

    resizeAll(): void
    {
        this.buffers.forEach((buffer) => 
        {            
            buffer.width = this.window.innerWidth - 1;            
            buffer.height = this.window.innerHeight - 1;            
        });      

        this.overlay.width = this.window.innerWidth - 1;   
        this.overlay.height = this.window.innerHeight - 1;        

        this.setCanvasContext();
    };

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void
    {
        this.canvasContext.fillStyle = colour;
        this.canvasContext.fillRect(
            this.resizeX(x), 
            this.resizeY(y), 
            this.resizeX(width),
            this.resizeY(height));
    };

    private clear(): void
    {
        this.overlayContext.clearRect(0, 0, this.resizeX(this.canvas.width), this.resizeY(this.canvas.height));

        this.backCanvasContext.fillStyle = this.$configService.settings.bgColour;
        this.backCanvasContext.fillRect(0, 0, this.backCanvas.width, this.backCanvas.height);
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

    initialiseBuffers(): void
    {
        let zindex: number = 0;

        this.buffers.forEach((buffer) => 
        {            
            buffer.style["z-index"] = zindex++;
            buffer.width = renderService.DEFAULT_WIDTH; 
            buffer.height = renderService.DEFAULT_HEIGHT;
        });      

        this.overlay.style["z-index"] = zindex++;
        this.overlay.style["background"] = "transparent";
        this.overlay.width = renderService.DEFAULT_WIDTH;
        this.overlay.height = renderService.DEFAULT_HEIGHT;
    };

    getCanvasContext(): [HTMLCanvasElement, CanvasRenderingContext2D]
    {
        return [ this.canvas, this.canvasContext ];
    };    

    private setCanvasContext(): void
    {
        this.canvas = this.buffers[this.bufferIndex];
        this.canvasContext = this.canvas.getContext('2d');

        this.backCanvas = this.buffers[1 - this.bufferIndex];
        this.backCanvasContext = this.canvas.getContext('2d');

        this.overlayContext = this.overlay.getContext('2d');
    };    

    private isRenderable(arg: any): arg is Irenderable 
    {
        return arg.render !== undefined;
    };
};