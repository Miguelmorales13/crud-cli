import React, {FunctionComponent} from 'react';
import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {IModuleMenu} from "../../models/IModelMenu";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
    item: IModuleMenu
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
    active: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: theme.spacing(0, 1, 1, 0),
        animation: theme.transitions.create('fade', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    icon: {
        color: theme.palette.secondary.light,
    }
}))
const MenuItem: FunctionComponent<Props> = ({item}) => {
    const {t} = useTranslation()
    const classes = useStyles()
    return (
        <ListItem component={NavLink} activeClassName={classes.active} to={`${item.keyName}`}>
            <ListItemIcon>
                <Icon className={classes.icon}>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={t(item.name ?? '')}/>
        </ListItem>
    )

};

export default MenuItem;

