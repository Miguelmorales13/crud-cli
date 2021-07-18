import React, {FunctionComponent} from 'react';
import {Box, CardContent} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import CircleSpinner from "../spinners/CircleSpinner";

interface OwnProps {
    loading: boolean
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        minHeight: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
}))
const NoDataTable: FunctionComponent<Props> = ({loading}) => {
        const classes = useStyles()
        const {t} = useTranslation()
        return (
            <Box className={classes.content}>
                <CardContent>
                    {loading && <CircleSpinner/>}
                    {t(loading ? 'tables.loading' : 'tables.noData')}
                </CardContent>
            </Box>
        );
    }
;

export default NoDataTable;
