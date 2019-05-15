import * as framework from "helpers/exports";

export class point
{    
    protected x: number;
    protected y: number;
    
    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    };

    set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    };

    setFromPoint(point: point): void
    {
        this.x = point.x;
        this.y = point.y;
    };
};