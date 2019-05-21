import * as framework from "helpers/exports";

export interface IinputService extends framework.Iinitialisable
{
    process(): void;

    registerOverlayListener(eventName: string, listener: Function): void;
    registerMouseMoveListener([Function, any]): void;
};