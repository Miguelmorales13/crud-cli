import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {Environments, GetEnv} from "./helpers.util";
import {store} from "../redux";
import {EnumAuthReducers} from "../redux/auth";
import {EnumNotification, genNoty} from "./notifications.util";

const cssRequest = 'font-size:1.5em; background: #222; color: #bada55'
const cssResponse = 'font-size:1.5em; background: #222; color: #2a9d8f'
const cssError = 'font-size:1.5em; background: #222; color: #e76f51'

const Axios = axios.create({
    baseURL: GetEnv(Environments.ServerUrl)
})
const axiosRequest = (request: AxiosRequestConfig) => {
    const token = store.getState().auth.token
    if (!request.headers['Authorization']) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
    if (process.env.NODE_ENV !== 'production') {
        console.group(`%c REQUEST ${request.url} ${request.method}`, cssRequest)
        console.log('%c Headers', cssRequest, request.headers)
        console.log('%c Data', cssRequest, request.data)
        console.groupEnd()

    }
    return request
}
const axiosResponse = (response: AxiosResponse) => {
    if (response && response.data && response.data.message && response.data.message !== "" && response.config.method !== "get") {
        genNoty(response.data.message, EnumNotification.Success);
    }
    const responseProcess = response.data.data || response.data || response
    if (process.env.NODE_ENV !== 'production') {
        console.group(`%c RESPONSE ${response.config.url} ${response.config.method}`, cssResponse)
        console.log('%c Response', cssResponse, responseProcess)
        console.groupEnd()
    }
    return responseProcess
}
const axiosError = (error: AxiosError) => {
    const token = store.getState().auth.token
    if (process.env.NODE_ENV !== 'production') {
        console.group(`%c ERROR ${error.config.url} ${error.config.method}`, cssError)
        console.log('%c Status', cssError, error.response?.status)
        console.log('%c Response', cssError, error.response?.data)

    }
    if (error && error.response && error.response.data) {
        if (error.response.data.code === 401 && token !== '') {
            console.log('%c Session', cssError, 'good bye')
            store.dispatch({type: EnumAuthReducers.SetToken, payload: ''})
            store.dispatch({type: EnumAuthReducers.SetUser, payload: {}})
            genNoty(error.response.data.message, EnumNotification.Error);
        }
        genNoty(error.response.data.message, EnumNotification.Error);
        console.groupEnd()
        return Promise.reject(error.response.data)
    }
    console.groupEnd()
    return Promise.reject(error)
}
Axios.interceptors.request.use(axiosRequest)
Axios.interceptors.response.use(axiosResponse, axiosError)
export default Axios
