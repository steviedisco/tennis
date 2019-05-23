import * as framework from "helpers/exports";

export interface Icreateable
{
    create<T extends framework.entity>(name: string): framework.entity;
};