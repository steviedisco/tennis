import * as framework from "helpers/exports";
import { Iupdateable } from "helpers/exports";

export class updateService implements framework.IupdateService
{
    private $sceneService: framework.IsceneService;

    constructor(
        IsceneService: framework.IsceneService)
    {
        this.$sceneService = IsceneService;
    };

    update(): void
    {        
        let entity: framework.entity = null;

        while ((entity = this.$sceneService.getNextEntity()))
        {
            if (this.isUpdateable(entity))  
                (entity as Iupdateable).update();
        }
    };

    private isUpdateable(arg: any): arg is Iupdateable 
    {
        return arg.update !== undefined;
    };
};