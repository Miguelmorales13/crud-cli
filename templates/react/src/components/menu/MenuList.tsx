import React, {FunctionComponent} from 'react';
import {List, ListSubheader} from "@material-ui/core";
import {IModuleMenu} from "../../models/IModelMenu";
import MenuItem from "./MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

interface OwnProps {
    items: IModuleMenu[]
}

type Props = OwnProps;

const useStyles = makeStyles((theme) => ({
    listSections: {
        backgroundColor: "#f2f2f2",
        height: "100%"
    },
    ul: {
        padding: 0
    }
}))

const MenuList: FunctionComponent<Props> = ({items}) => {
    const classes = useStyles()
    const {t} = useTranslation()
    return (
        <List component="nav" className={classes.listSections}>
            {
                items.map(({name, access}, i) => (
                    <li key={`section-${i}`}>
                        <ul className={classes.ul}>
                            <ListSubheader color="inherit">{t(name ?? '')}</ListSubheader>
                            {access && access.map((item, j) => (<MenuItem key={`access-${i}-${j}`} item={item}/>))}
                        </ul>

                    </li>
                ))
            }

        </List>
    );
};

export default MenuList;
