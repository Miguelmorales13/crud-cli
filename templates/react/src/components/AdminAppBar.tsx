import React, {FunctionComponent, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "./menu/Menu";
import {Fade, Menu, MenuItem, useMediaQuery, useTheme} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {EnumAuthReducers} from "../redux/auth";
import {NavLink, useHistory} from 'react-router-dom'

interface OwnProps {
    open: boolean
    name?: string
    onClick: () => void
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: theme.spacing(1), // keep right padding when drawer closed
        paddingLeft: theme.spacing(1), // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 0,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    },
}))


const AdminAppBar: FunctionComponent<Props> = ({open, onClick, name = 'home'}) => {
    const theme = useTheme()
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: any) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = () => {
        dispatch({type: EnumAuthReducers.SetToken, payload: ""})
        dispatch({type: EnumAuthReducers.SetUser, payload: {}})
        handleClose()
    }
    const handleProfile = () => {
        history.push("/admin/profile")
        handleClose()
    }
    const menu = [
        {title: "logout", onclick: handleLogout},
        {title: "profile", onclick: handleProfile},
    ]
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()
    const isOpen = (isDevice && !open) || (!isDevice)
    return (
        <AppBar position="absolute" color="primary" elevation={0}
                className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar disableGutters className={classes.toolbar}>
                {isOpen && <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onClick}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>}
                <Typography component={NavLink} to="/admin" variant="h6" color="inherit" noWrap
                            className={classes.title}>
                    {'app'}
                </Typography>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                >
                    <MoreVert/>
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openMenu}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    {menu.map(({onclick, title}, i) => <MenuItem key={i} onClick={onclick}>{title}</MenuItem>)}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AdminAppBar;
