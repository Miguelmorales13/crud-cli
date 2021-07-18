import {Grid, Typography} from "@material-ui/core";

import React, {FunctionComponent} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ColumnType from "./ColumnType";
import {EnumColumnTable} from "../../data-modeler";

interface OwnProps {
    size: any
    minSize: boolean
    headerName: string
    type: EnumColumnTable
    field: any
    row: any
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

type Props = OwnProps;
const useStyles = makeStyles(theme => ({
    column: {
        padding: theme.spacing(0),
        
    }

}))

const ColumnTable: FunctionComponent<Props> = ({minSize, headerName, size, field, align, row, type}) => {
    const classes = useStyles()
    return (
        <Grid className={classes.column} item xs={12} md={size}>
            <Grid container>
                {minSize && (
                    <Grid item xs={6}>
                        <Typography align={!minSize ? align : 'justify'}>{headerName}</Typography>
                    </Grid>
                )}
                <Grid item xs={minSize ? 6 : 12}>
                    <ColumnType row={row} minSize={minSize} type={type} field={field} align={align}/>
                </Grid>

            </Grid>

        </Grid>
    );
};

export default ColumnTable;
