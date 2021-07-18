import React, {FunctionComponent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@material-ui/core";
import SlideUp from "./transitions/SlideUp";
import {useTranslation} from "react-i18next";

interface OwnProps {
    title: string
    hasButtons?: boolean
    open: boolean
    loading?: boolean
    // setOpen: Function
    handleClose?: (event: object, reason?: string) => void
    handleDone?: (event: object) => void
}

type Props = OwnProps;

const Modal: FunctionComponent<Props> = ({
                                             loading = false,
                                             open,
                                             hasButtons = true,
                                             handleDone,
                                             title,
                                             handleClose,
                                             children
                                         }) => {
    const theme = useTheme()
    const {t} = useTranslation()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Dialog
            open={open}
            keepMounted
            fullWidth={true}
            TransitionComponent={SlideUp}
            maxWidth="sm"
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby={`alert-dialog-slide-title-${title}`}
        >
            <DialogTitle id={`alert-dialog-slide-title-${title}`}>{t(title)}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            {
                hasButtons && (
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose} color="secondary">{t('modals.cancel')}</Button>
                        <Button disabled={loading} onClick={handleDone} color="primary">{t('modals.done')}</Button>
                    </DialogActions>
                )
            }
        </Dialog>
    );
};

export default Modal;
