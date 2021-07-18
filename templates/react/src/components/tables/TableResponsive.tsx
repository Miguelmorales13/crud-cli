import React, {ChangeEvent, FunctionComponent, MouseEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {IHeaderTable} from "../../models/IHeaderTable";
import {Box, Card, Collapse, Grid, IconButton, MenuItem, Select, Slide, TextField, useMediaQuery, useTheme,} from "@material-ui/core";
import HeaderTable from "./HeaderTable";
import ColumnTable from "./ColumnTable";
import {Pagination} from "@material-ui/lab";
import {filterByObject, Order, stableSort} from "../../utils";
import {makeStyles} from "@material-ui/core/styles";
import {EnumColumnTable} from "../../data-modeler";
import {Sort} from "@material-ui/icons";
import NoDataTable from "./NoDataTable";


interface OwnProps {
    rows: any[],
    headers: IHeaderTable[]
    loading: boolean
    filters: string[]
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
    tableFooter: {
        display: "flex",
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
    pagination: {
        justifyContent: 'flex-end',
    },
    row: {
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(0.5),
    },
    tableResponsive: {
        margin: 'auto',
        padding: theme.spacing(0, 1, 0, 1)
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const TableResponsive: FunctionComponent<Props> = ({rows, headers, loading, filters}) => {
        const classes = useStyles()
        const {t} = useTranslation()
        const [page, setPage] = useState(0);
        const [filter, setFilter] = useState("");
        const [order, setOrder] = useState<Order>('asc');
        const [orderBy, setOrderBy] = useState('id');
        const rowsPerPage = 10
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const handleChangePagination = (e: any, value: number) => setPage(value - 1)
        const handleChangeOrderBy = (e: ChangeEvent<any>) => setOrderBy(e.target.value)
        const handleChangeFilter = (e: ChangeEvent<any>) => setFilter(e.target.value)
        const handleChangeOrder = (e: MouseEvent) => setOrder(state => state === "asc" ? "desc" : 'asc')
        const rowsFilters = rows.filter((value) => filterByObject<any>(value, filter, filters))

        const theme = useTheme()
        const minSize = useMediaQuery(theme.breakpoints.down("sm"))

        const sizePages = Math.ceil(rowsFilters.length / rowsPerPage)

        return (
            <Box overflow={"hidden"}>
                <Grid container className={classes.tableResponsive}>
                    <Grid item xs={12}>
                        <TextField disabled={loading} margin="dense" label={t('tables.find')} value={filter}
                                   onChange={handleChangeFilter}
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Slide direction={"down"} in={!minSize}>
                            <Card>

                                <Grid container>
                                    {!minSize && headers && headers.map((header, i) => (

                                        <HeaderTable key={`header-${i}`} {...header}/>
                                    ))}

                                </Grid>

                            </Card>
                        </Slide>

                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={rowsFilters.length <= 0}>
                            <NoDataTable loading={loading}/>
                        </Collapse>
                    </Grid>

                    <Slide direction="up" mountOnEnter unmountOnExit in={rowsFilters.length > 0}>
                        <Grid item xs={12}>

                            {
                                stableSort(rowsFilters, orderBy, order)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <Card className={classes.row} key={i}>
                                            <Grid container>
                                                {
                                                    headers && headers
                                                        .map(({align, type, size, field, headerName}, j) => (
                                                            <ColumnTable key={`column-${i}-${j}`} size={size} minSize={minSize}
                                                                         type={type} align={align} row={row} field={field}
                                                                         headerName={t(headerName)}/>
                                                        ))
                                                }

                                            </Grid>

                                        </Card>

                                    ))
                            }


                        </Grid>
                    </Slide>
                    <Grid item xs={12}>
                        <Box flexWrap="wrap" className={classes.tableFooter}>
                            <div>
                                <Select margin="dense" value={orderBy} variant="outlined" onChange={handleChangeOrderBy}>
                                    {headers.filter(head => head.type === EnumColumnTable.Normal).map((head, i) => (
                                        <MenuItem key={`select-order-${i}`} value={head.field}>{t(head.headerName)}</MenuItem>
                                    ))}
                                </Select>
                                <IconButton onClick={handleChangeOrder} color={order === "asc" ? "primary" : 'secondary'}>
                                    <Sort/>
                                </IconButton>
                            </div>
                            <Pagination size="small" siblingCount={0} boundaryCount={1} count={sizePages} className={classes.flexEnd} page={page + 1} variant="outlined" disabled={sizePages === 1}
                                        onChange={handleChangePagination}/>

                        </Box>
                    </Grid>

                </Grid>
            </Box>

        )
    }
;


export default TableResponsive
