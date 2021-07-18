import {IAccess} from "./IAccess";
import {RoleType} from "./IRol";

export interface IModule {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
    name?: string;
    keyName?: string;
    type?: RoleType;
    icon?: string;
    description?: string;
    access?: IAccess[]
}
