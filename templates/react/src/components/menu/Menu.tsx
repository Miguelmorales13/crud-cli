import React, {FunctionComponent} from 'react';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import MenuList from "./MenuList";
import {Avatar, Box, IconButton, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface OwnProps {
    open: boolean
    onClick: () => void
}

type Props = OwnProps;
export const DRAWER_WIDTH = 300;

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        border: 'none',
        width: DRAWER_WIDTH,
        background: '#f2f2f2',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        border: 'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    icon: {
        color: theme.palette.primary.contrastText,

    },
    cardRoot: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderBottomRightRadius: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    avatar: {
        marginBottom: theme.spacing(1)
    }
}))
const Menu: FunctionComponent<Props> = ({onClick, open}) => {
    const theme = useTheme()
    const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const menu = []
    const classes = useStyles()
    const isOpen = (open && isDevice)

    return (
        <Drawer variant="permanent"
                classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}
                open={open}>
            <div className={classes.toolbarIcon}>
                {isOpen && <IconButton onClick={onClick}>
                    <MenuIcon className={classes.icon}/>
                </IconButton>}
            </div>
            <Box className={classes.cardRoot}>
                <Avatar className={classes.avatar} src="profile.png"/>
                <div>
                    <Typography variant="overline" align="center" noWrap display="block" gutterBottom>
                        {'email@email.com'}
                    </Typography>
                    <Typography variant="body2" align="center" display="block" gutterBottom>
                        {'user'}
                    </Typography>
                </div>
            </Box>
            <MenuList items={menu}/>

        </Drawer>
    );
};

export default Menu;

