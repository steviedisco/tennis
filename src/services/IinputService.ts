import * as framework from "helpers/exports";

export interface IinputService extends framework.Iinitialisable
{
    process(): void;

    registerCanvasListener(eventName: string, listener: Function): void;
    registerMouseMoveListener(func: Function): void;
};