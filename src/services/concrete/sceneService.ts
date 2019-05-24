import * as framework from "helpers/exports";
import { Iinitialisable } from "helpers/exports";
import { Irenderable } from "helpers/exports";

export class sceneService implements framework.IsceneService
{    
    private entities: { [id: string] : framework.entity; } = {};

    private currentIndex: number;

    constructor()
    {
        this.finaliseChanges();
    };

    addEntity(entity: framework.entity)
    {
        this.entities[entity.id] = entity;        
    };

    removeEntity(entity: framework.entity)
    {
        delete this.entities[entity.id]
    };    

    getNextEntity(): framework.entity
    {
        let entity: framework.entity = null;

        if (Object.keys(this.entities).length > 0 && this.currentIndex >= 0)  
        {          
            let key = Object.keys(this.entities)[this.currentIndex--];
            entity = this.entities[key];            
        }

        if (entity == null)
        {
            this.finaliseChanges();
            return null;
        }

        return entity;
    };

    finaliseChanges(): void
    {
        this.currentIndex = Object.keys(this.entities).length - 1;
    };

    initialiseAll(): void
    {
        let entity: framework.entity = null;

        while((entity = this.getNextEntity()))
        {
            if (this.isInitialisable(entity))
                (entity as Iinitialisable).initialise();     
        }
    };

    private isInitialisable(arg: any): arg is Iinitialisable 
    {
        return arg.initialise !== undefined;
    };
};