import {IAction} from "../index";
import {GlobalState, IGlobalState} from "./global.state";

export enum EnumGlobalReducers {
    SetMenu = 'GlobalSetMenu',
    SetModules = 'GlobalSetModules',
    SetDark = 'GlobalSetDark',
    SetLoading = 'GlobalSetLoading'
}

export const GlobalReducer = (state: IGlobalState = GlobalState, {payload, type}: IAction<EnumGlobalReducers, any>): IGlobalState => {
    switch (type) {
        case EnumGlobalReducers.SetMenu:
            return {
                ...state,
                menu: payload
            }
        case EnumGlobalReducers.SetModules:
            return {
                ...state,
                modules: payload
            }
        case EnumGlobalReducers.SetDark:
            return {
                ...state,
                isDark: payload
            }
        case EnumGlobalReducers.SetLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}
