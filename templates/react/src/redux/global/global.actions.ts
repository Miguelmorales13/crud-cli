import {EnumGlobalReducers} from "./global.reducers";
import Axios from "../../utils/axios.util";


export const GlobalActionGetMenu = () => async (dispatch: Function, getState: Function) => {
    dispatch({type: EnumGlobalReducers.SetLoading, payload: true})
    try {
        const res = await Axios.get('roles/modules/menu')
        dispatch({type: EnumGlobalReducers.SetMenu, payload: res})
    } finally {
        dispatch({type: EnumGlobalReducers.SetLoading, payload: false})

    }
}
export const GlobalActionGetModules = () => async (dispatch: Function, getState: Function) => {
    dispatch({type: EnumGlobalReducers.SetLoading, payload: true})
    try {
        const res = await Axios.get('roles/modules')
        dispatch({type: EnumGlobalReducers.SetModules, payload: res})
    } finally {
        dispatch({type: EnumGlobalReducers.SetLoading, payload: false})

    }
}
