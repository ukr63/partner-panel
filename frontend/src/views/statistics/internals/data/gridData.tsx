import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {GridCellParams, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 0);
    const monthName = date.toLocaleDateString('en-US', {
        month: 'short',
    });
    const daysInMonth = date.getDate();
    const days = [];
    let i = 1;
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`);
        i += 1;
    }
    return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
    const data = getDaysInMonth(4, 2024);
    const {value, colDef} = params;

    if (!value || value.length === 0) {
        return null;
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <SparkLineChart
                data={value}
                width={colDef.computedWidth || 100}
                height={32}
                plotType="bar"
                showHighlight
                showTooltip
                color="hsl(210, 98%, 42%)"
                xAxis={{
                    scaleType: 'band',
                    data,
                }}
            />
        </div>
    );
}

function renderStatus(status: 'Online' | 'Offline') {
    const colors: { [index: string]: 'success' | 'default' } = {
        Online: 'success',
        Offline: 'default',
    };

    return <Chip label={status} color={colors[status]} size="small"/>;
}

export function renderAvatar(
    params: GridCellParams<{ name: string; color: string }, any, any>,
) {
    if (params.value == null) {
        return '';
    }

    return (
        <Avatar
            sx={{
                backgroundColor: params.value.color,
                width: '24px',
                height: '24px',
                fontSize: '0.85rem',
            }}
        >
            {params.value.name.toUpperCase().substring(0, 1)}
        </Avatar>
    );
}

export const columns: GridColDef[] = [
    {field: 'date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center', minWidth: 100},
    {
        field: 'clicks',
        headerName: 'Clicks',
        headerAlign: 'center',
       align: 'center',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'country',
        headerName: 'Country',
        headerAlign: 'center',
       align: 'center',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'registrations',
        headerName: 'Registrations',
        headerAlign: 'center',
       align: 'center',
        flex: 1,
    },
    {
        field: 'firstDeposit',
        headerName: 'First Deposit',
        headerAlign: 'center',
       align: 'center',
        flex: 1,
        renderCell: (params) => ShowDollar(params, 'firstDeposit')
    },
    {
        field: 'redeposit',
        headerName: 'Redeposit',
        headerAlign: 'center',
       align: 'center',
        flex: 1,
        renderCell: (params) => ShowDollar(params, 'redeposit')
    },
    {
        field: 'depositSum',
        headerName: 'Deposit Sum',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => ShowDollar(params, 'depositSum')
    },
    {
        field: 'revShare',
        headerName: 'Revenue Share',
        flex: 1,
        minWidth: 150,
        align: 'center',
        renderCell: (params) => ShowDollar(params, 'revShare')
    },
    {
        field: 'revenue',
        headerName: 'Revenue',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => ShowDollar(params, 'revenue')
    },

    {
        field: 'stream_id',
        headerName: 'Stream ID',
        flex: 1,
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'promo_name',
        headerName: 'Promo Name',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        minWidth: 150
    },
    {
        field: 'sub1',
        headerName: 'Sub1',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        minWidth: 150
    },
];

const ShowDollar = (params: any, field: string) => {
    const row: any = params.row;

    return (
        <div className={'flex items-center justify-center gap-2'}>
            <span>{row[field]}</span> <span className={'dollar-span'}>$</span>

            <style jsx>{`
                .dollar-span {
                    color: #12ff00;
                }
            `}</style>
        </div>
    );
}
