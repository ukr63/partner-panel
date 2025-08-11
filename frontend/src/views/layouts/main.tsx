'use client';

import TopHeader from "@/views/html/topHeader";
import Head from 'next/head';

import Header from './components/Header';

import '@/app/globals.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "@/views/layouts/components/SideMenu";
import AppNavbar from "@/views/layouts/components/AppNavbar";
import {alpha} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MainGrid from "@/views/layouts/components/MainGrid";
import AppTheme from "@/views/shared-theme/AppTheme";
import * as React from "react";
import {ToastContainer} from "react-toastify";

import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

const Layout = (props: any) => {
    const {
        children,
        pageName,
        ...rest
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage?.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            dispatch({type: 'user/setProps', payload: user});
        } else {
            window.location.href = '/account/signin';
        }

        if (pageName) {
            dispatch(
                {
                    type: 'settings/setProps',
                    payload: {
                        currentPageName: pageName
                    }
                }
            );
        }

    }, []);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
            <AppTheme {...props} themeComponents={xThemeComponents}>
                <CssBaseline enableColorScheme/>
                <Box sx={{display: 'flex'}}>
                    <SideMenu/>
                    <AppNavbar/>
                    {/* Main content */}
                    <Box
                        component="main"
                        sx={(theme) => ({
                            flexGrow: 1,
                            backgroundColor: theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : alpha(theme.palette.background.default, 1),
                            overflow: 'auto',
                        })}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                alignItems: 'center',
                                mx: 3,
                                pb: 5,
                                mt: {xs: 8, md: 0},
                            }}
                        >
                            <Header/>
                            {children}
                        </Stack>
                    </Box>
                </Box>
            </AppTheme>
        </div>
    )
}

export default Layout;