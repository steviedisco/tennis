import * as framework from "helpers/exports";

export interface IrenderService extends framework.Iinitialisable
{
    buffers: HTMLCanvasElement[]; 
    backCanvas: HTMLCanvasElement;
    backCanvasContext: CanvasRenderingContext2D;
    frontCanvas: HTMLCanvasElement;
    frontCanvasContext: CanvasRenderingContext2D;
    overlay: HTMLCanvasElement;
    overlayContext: CanvasRenderingContext2D;

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void;
    drawCircle(x: number, y: number, radius: number, colour: string): void;
    drawText(message: string, x: number, y: number, colour?: string, font?: string): void;
    
    renderAll(): void; 
    getCanvasContext(): [ HTMLCanvasElement, CanvasRenderingContext2D ];
};