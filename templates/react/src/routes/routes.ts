import {FC} from "react";

export interface IRoute {
    component: FC | any
    path: string
    name: string
    requiredAuth: boolean
    exact?: boolean
    routes?: IRoute[]
}

export const ROUTES: IRoute[] = []
