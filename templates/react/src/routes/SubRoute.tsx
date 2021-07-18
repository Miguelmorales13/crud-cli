import React, {FunctionComponent} from 'react';
import {Route} from "react-router-dom";
import {IRoute} from "./routes";
import {RoleEnumType} from "../models/IRol";


interface OwnProps extends IRoute {
}

type Props = OwnProps;

interface RedirectOrRedirectByRoleParams {
    type?: RoleEnumType;
    render: any;
    path: string;
}


const SubRoute: FunctionComponent<Props> = (route) => {
    return <Route path={route.path} render={(props: any) => (<route.component {...props} routes={route.routes}/>)}/>
};

export default SubRoute;
