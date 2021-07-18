import React, {FunctionComponent} from 'react';
import {Box, Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface HeaderItem {
    title: string;
    key: any;
}

interface OwnProps {
    object: any,
    headers: HeaderItem[]
}

type Props = OwnProps;

const Item: FunctionComponent<Props> = ({headers, object}) => {
    const {t} = useTranslation()
    const getValue = (header: HeaderItem) => {
        if (typeof header.key === 'function') {
            return header.key(object)
        }
        return object[header.key]
    }

    return (
        <div>
            {
                headers.map((header, i) => (
                    <Grid component={Box} container key={`${i}`}>
                        <Grid item xs={12} md={6}>
                            {t(header.title)}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {getValue(header)}
                        </Grid>
                    </Grid>
                ))
            }
        </div>

    );
};

export default Item;
