import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, {StatCardProps} from './StatCard';
import {useEffect, useState} from "react";
import StatisticsModel from "@/models/statistics";

const preData: any[] = [
    {
        title: 'Income Today',
        value: '0$',
        interval: 'Last 30 days',
        trend: 'up',
        dates: [],
        total: [],
    },
    {
        title: 'Registrations',
        value: '0',
        interval: 'Last 30 days',
        trend: 'neutral',
        dates: [],
        total: [],
    },
    {
        title: 'FD',
        value: '0',
        interval: 'Last 30 days',
        trend: 'up',
        dates: [],
        total: [],
    },
    {
        id: 'clicks',
        title: 'Clicks',
        value: '0',
        interval: 'Last 30 days',
        trend: 'neutral',
        dates: [],
        total: []
    },
];

export default function MainGrid() {
    const [gridData, setGridData] = useState(preData);

    const fetchData = async () => {
        let response: any = await StatisticsModel.getStatisticsDashboard();
        response = response?.data;

        setGridData((prevGridData) => {
            const newArray = [...preData];

            const item = newArray.find((entry: any) => entry?.id === 'clicks');
            if (item) {
                item.dates = response?.clicks.dates;
                item.total = response?.clicks.total;
                item.value = response?.clicks.total.reduce((a: any, b: any) => a + b, 0);
            }

            return newArray;
        });
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Overview
            </Typography>
            <Grid
                container
                spacing={1}
                columns={12}
                sx={{mb: (theme) => theme.spacing(1)}}
            >
                {gridData.map((card, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                {/*<Grid size={{xs: 12, sm: 6, lg: 3}}>*/}
                {/*    <HighlightedCard/>*/}
                {/*</Grid>*/}
                {/*<Grid size={{xs: 24, md: 6}}>*/}
                {/*    <SessionsChart/>*/}
                {/*</Grid>*/}
                {/*<Grid size={{xs: 12, md: 6}}>*/}
                {/*    <PageViewsBarChart/>*/}
                {/*</Grid>*/}
            </Grid>
            {/*<SessionsChart/>*/}
            {/*<Typography component="h2" variant="h6" sx={{mb: 2}}>*/}
            {/*    Details*/}
            {/*</Typography>*/}
            {/*<Grid container spacing={2} columns={12}>*/}
            {/*    <Grid size={{xs: 12, lg: 9}}>*/}
            {/*        <CustomizedDataGrid/>*/}
            {/*    </Grid>*/}
            {/*    <Grid size={{xs: 12, lg: 3}}>*/}
            {/*        <Stack gap={2} direction={{xs: 'column', sm: 'row', lg: 'column'}}>*/}
            {/*            <CustomizedTreeView/>*/}
            {/*            <ChartUserByCountry/>*/}
            {/*        </Stack>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            {/*<Copyright sx={{my: 4}}/>*/}
        </Box>
    );
}
