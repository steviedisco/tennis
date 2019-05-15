import * as framework from "helpers/exports";

export interface IsceneService extends framework.Iinitialisable
{  
    addEntity(entity: framework.entity);
    removeEntity(entity: framework.entity);
    getNextEntity(): framework.entity;
    finalise(): void;
};