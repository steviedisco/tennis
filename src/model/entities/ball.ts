import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class ball extends framework.entity 
{
    private readonly name: string = "ball";

    private $renderService: framework.IrenderService;

    constructor(IrenderService: framework.IrenderService)
    {
        super();

        this.$renderService = IrenderService;
    };

    initialise(): void
    {        
    };

    resize(): void
    {
    };
};