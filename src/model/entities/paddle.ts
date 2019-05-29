import * as framework from "helpers/exports";

export class paddle extends framework.entity 
{
    player: framework.enums.players;

    readonly PADDLE_THICKNESS: number = 25;
    readonly PADDLE_HEIGHT: number = 170;
    readonly PADDLE_HEIGHT_HALF: number = this.PADDLE_HEIGHT / 2;
    readonly RETURN_DEADZONE: number = 7;
    readonly HITMOVE_DEADZONE: number = 5;
    readonly ANGLE_MODIFIER: number = 0.1275; 
};