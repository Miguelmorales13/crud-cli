import {IModuleMenu} from "../../models/IModelMenu";
import {IModule} from "../../models/IModule";

export interface IGlobalState {
    menu: IModuleMenu[]
    modules: IModule[]
    isDark: boolean
    loading: boolean
}

export const GlobalState: IGlobalState = {
    isDark: false,
    menu: [],
    modules: [],
    loading: false
}
