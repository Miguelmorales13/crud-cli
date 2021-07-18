import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {useSelector} from "react-redux";
import createSpacing from "@material-ui/core/styles/createSpacing";
import {IGeneralStore} from "../redux";

function ThemeProviderGeneral({children}: any) {
    // @ts-ignore
    const transform = createSpacing((factor => `${factor}rem`));
    const typeTheme = useSelector((store: IGeneralStore) => store.global.isDark) ? 'dark' : 'light'
    const theme = createMuiTheme({
        palette: {
            type: typeTheme,
            //     primary: {
            //         light: '#f05545',
            //         main: '#b71c1c',
            //         dark: '#7f0000',
            //         contrastText: '#fff',
            //     },
            //     secondary: {
            //         light: '#ff9e40',
            //         main: '#ff6d00',
            //         dark: '#c43c00',
            //         contrastText: '#fff',
            //     }
        },
        spacing: transform,
    })
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderGeneral
