import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {GridCellParams, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {notifySuccess} from "@/lib/notifications";

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
    {
        field: 'name',
        headerName: 'Promo Name',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'offerName',
        headerName: 'Offer Name',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'promoType',
        headerName: 'Promo Type',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100
    },
    {
        field: 'url',
        headerName: 'Url',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100
    },
    {field: 'createdAt', headerName: 'Created At', flex: 1, align: 'center', headerAlign: 'center', minWidth: 100},
    {
        field: 'copy',
        headerName: '',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => {
            const row = params?.row;
            console.log('row', row);

            function copyToClipboard(text: string) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        console.log('Text copied to clipboard:', text);
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                notifySuccess('Promo Url copied to clipboard');
            }

            return (
                <div onClick={() => copyToClipboard(row.url)} style={{
                    cursor: 'pointer'
                }}>
                    <ContentCopyIcon />
                </div>
            )
        }
    },
];

export const rows: GridRowsProp = [
    {
        id: 1,
        createdAt: '2024-04-01'
    }
];
