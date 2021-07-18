import React, {FunctionComponent} from 'react';
import {Box, Chip, Typography} from "@material-ui/core";
import {IButtonTable} from "../../models/IButtonTable";
import {EnumColumnTable} from "../../data-modeler";
import {useTranslation} from "react-i18next";

interface OwnProps {
    type: EnumColumnTable
    field: any
    row: any
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    minSize: boolean
}

type Props = OwnProps;

const ColumnType: FunctionComponent<Props> = ({type, field, minSize, align, row}) => {
    const {t} = useTranslation()
    switch (type) {
        case EnumColumnTable.Normal:
            return (<Typography noWrap align={!minSize ? align : 'justify'}>{row[field]}</Typography>);
        case EnumColumnTable.Boolean:
            return (
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Chip variant="outlined" size="small" color={row[field] ? "primary" : "secondary"}
                          label={t(`tables.${row[field] ? 'active' : 'inactive'}`)}/>
                </Box>
            );
        case EnumColumnTable.Handler:
            return (<Typography align={!minSize ? align : 'justify'}>{field(row)}</Typography>);
        case EnumColumnTable.Buttons:
            return (
                <Box display="flex" justifyContent={!minSize ? align : 'flex-end'}>
                    {field.map((props: IButtonTable, key: number) => (
                        <props.component key={key} {...props.props} onClick={() => props.handler(row)}/>)
                    )}
                </Box>
            )
        default:
            return (<Typography align={!minSize ? align : 'justify'}>{row[field]}</Typography>);
    }
};

export default ColumnType;
