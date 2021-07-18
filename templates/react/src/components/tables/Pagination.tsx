import {createStyles, IconButton, makeStyles, Theme, useTheme,} from "@material-ui/core";
import React, {MouseEvent} from "react";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage,} from "@material-ui/icons";
import {useTranslation} from "react-i18next";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    })
);

function Pagination(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const {t} = useTranslation();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label={t('tables.firstPage')}
            >
                {theme.direction === "rtl" ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label={t('tables.previous')}
            >
                {theme.direction === "rtl" ? (<KeyboardArrowRight/>) : (<KeyboardArrowLeft/>)}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={t('tables.next')}
            >
                {theme.direction === "rtl" ? (<KeyboardArrowLeft/>) : (<KeyboardArrowRight/>)}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={t('tables.lastPage')}
            >
                {theme.direction === "rtl" ? <FirstPage/> : <LastPage/>}
            </IconButton>
        </div>
    );
}

export default Pagination;
