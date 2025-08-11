import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {columns} from '../internals/data/gridData';
import {useEffect, useState} from 'react';
import StatisticsModel from "@/models/statistics";

export default function TrackerStats({items, isLoading}: any) {
    return (
        <div style={{height: '80vh', width: '100%'}}>
            <DataGrid
                loading={isLoading}
                checkboxSelection
                rows={items}
                columns={columns}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                initialState={{
                    pagination: {paginationModel: {pageSize: 20}},
                }}
                pageSizeOptions={[10, 20, 50]}
                disableColumnResize
                slotProps={{
                    filterPanel: {
                        filterFormProps: {
                            logicOperatorInputProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                            columnInputProps: {
                                variant: 'outlined',
                                size: 'small',
                                sx: {mt: 'auto'},
                            },
                            operatorInputProps: {
                                variant: 'outlined',
                                size: 'small',
                                sx: {mt: 'auto'},
                            },
                            valueInputProps: {
                                InputComponentProps: {
                                    variant: 'outlined',
                                    size: 'small',
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
