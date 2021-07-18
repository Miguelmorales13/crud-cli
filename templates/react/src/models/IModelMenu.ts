export interface IModuleMenu {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
    name?: string;
    keyName?: string;
    icon?: string;
    description?: string;
    access?: IModuleMenu[];
    moduleId?: number;
}
