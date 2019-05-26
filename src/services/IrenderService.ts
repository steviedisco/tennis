import * as framework from "helpers/exports";

export interface IrenderService extends framework.Iinitialisable
{
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    buffers: HTMLCanvasElement[]; 
    overlay: HTMLCanvasElement;
    
    ratioX(): number;
    ratioY(): number;
    resizeX(input: number): number;
    resizeY(input: number): number;

    drawRectangle(x: number, y: number, width: number, height: number, colour: string): void;
    drawText(message: string, x: number, y: number, colour?: string): void;

    renderAll(): void; 
    resizeAll(): void;
    initialiseBuffers(): void;
    getCanvasContext(): [ HTMLCanvasElement, CanvasRenderingContext2D ];
};