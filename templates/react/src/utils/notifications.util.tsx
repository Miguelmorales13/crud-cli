import {createRef} from "react";
import {SnackbarProvider} from "notistack";

export const notyStackRef = createRef<SnackbarProvider>()

export enum EnumNotification {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}

export function genNoty(msg: string, typo: EnumNotification = EnumNotification.Success) {
    notyStackRef?.current?.enqueueSnackbar(msg, {variant: typo})

}
