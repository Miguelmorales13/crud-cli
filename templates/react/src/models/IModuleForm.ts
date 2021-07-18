import {IAccessForm} from "./IAccessForm";
import {RoleType} from "./IRol";

export interface IModuleForm {
    moduleId: number;
    type: RoleType;
    name: string;
    isDone: boolean;
    accesses: IAccessForm[];
}
