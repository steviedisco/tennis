import * as framework from "helpers/exports";
import * as global from "helpers/globals";

export class game
{
    $configService: framework.IconfigService;
    $loggerService: framework.IloggerService;
    $timeService:   framework.ItimeService;
    $inputService:  framework.IinputService;
    $sceneService:  framework.IsceneService;
    $updateService: framework.IupdateService;
    $renderService: framework.IrenderService;

    window: Window;
    document: Document;

    private previous: number = 0;

    constructor(window: Window, document: Document)
    {
        this.window = window;
        this.document = document;
    };

    run(): void
    { 
        this.registerServices();
        this.registerEntities();

        this.initialise();

        this.window.requestAnimationFrame(() => this.gameLoop());
    };

    registerServices(): void
    {
        this.$configService = global.$jsInject.register("IconfigService", [framework.configService]);
        this.$loggerService = global.$jsInject.register("IloggerService", [this.$configService.settings.logger]);
        this.$timeService = global.$jsInject.register("ItimeService", [framework.timeService]);
        this.$sceneService = global.$jsInject.register("IsceneService", [framework.sceneService]);
        this.$updateService = global.$jsInject.register("IupdateService", ["IsceneService", framework.updateService]);
        this.$renderService = global.$jsInject.register("IrenderService", ["IconfigService", "IsceneService", framework.renderService]);
        this.$inputService = global.$jsInject.register("IinputService", ["IrenderService", framework.inputService]);
    };

    registerEntities(): void
    {
        global.$jsInject.register("net", [framework.net]);
        global.$jsInject.register("playerPaddle", ["IinputService", framework.playerPaddle]);
        global.$jsInject.register("ball", [framework.ball]);
    };

    initialise(): void
    {
        this.$renderService.initialise([window, document]);
        this.$inputService.initialise([true]);

        this.$sceneService.addEntity(framework.entity.create<framework.ball>("ball"));        
        this.$sceneService.addEntity(framework.entity.create<framework.playerPaddle>("playerPaddle"));
        // this.$sceneService.addEntity(framework.entity.create<framework.cpuPaddle>("cpuPaddle"));        
        this.$sceneService.addEntity(framework.entity.create<framework.net>("net"));
        this.$sceneService.finaliseChanges();
        this.$sceneService.initialiseAll();

        this.previous = this.$timeService.getCurrentTime();  
    };

    gameLoop(): void
    {        
        let lag: number = 0; 
        let msPerUpdate = 1000 / this.$configService.settings.targetFPS;

        let current = this.$timeService.getCurrentTime();
        let elapsed = current - this.previous;

        this.previous = current;
        lag += elapsed;
        
        this.$inputService.process();

        while (lag >= msPerUpdate)
        {            
            this.$updateService.update();
            lag -= msPerUpdate;            
        }

        this.$renderService.renderAll();

        this.window.requestAnimationFrame(() => this.gameLoop());
    };
}