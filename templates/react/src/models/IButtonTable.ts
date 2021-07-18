import {FC} from "react";

export interface IButtonTable {
    handler: (row: any) => void;
    props: any;
    component: FC;
}