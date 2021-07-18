import React, {FunctionComponent} from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {IHeaderTable} from "../../models/IHeaderTable";

interface OwnProps extends IHeaderTable {

    // order: "asc" | "desc",
    // onClick: (event: React.MouseEvent<unknown>) => void,

}

type Props = OwnProps;


const HeaderTable: FunctionComponent<Props> = ({size, align, headerName}) => {
    const {t} = useTranslation()
    return (
        <Grid item xs={size}>
            <Box alignItems={align} padding={1}>
                <Typography align={"center"}>
                    {t(headerName)}
                </Typography>

            </Box>
        </Grid>
    );
};

export default HeaderTable;
