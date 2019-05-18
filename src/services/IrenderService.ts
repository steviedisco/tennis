import * as framework from "helpers/exports";

export interface IrenderService extends framework.Iinitialisable
{
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    buffers: HTMLCanvasElement[]; 
    
    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void;

    renderAll(): void; 
    resizeAll(): void;
    initialiseBuffers(): void;
    getCanvasContext(): [ HTMLCanvasElement, CanvasRenderingContext2D ];

};