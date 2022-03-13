import { useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------
const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 0;


const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(3),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    },
    marginRight: theme.spacing(2),
}));

export default function AppTopUsers({ topUsers }) {
    const users = topUsers.map(value => `@${value.user}`);
    const num = [{ data: topUsers.map(value => value.tweets) }];

    const chartOptions = merge(BaseOptionChart(), {
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
        },
        xaxis: {
            categories: users
        },
        colors: ['#2E93fA']
    });

    return (
        <Card>
            <CardHeader title="Top @users" />
            <ChartWrapperStyle dir="ltr" style={{ maxHeight: 400, minHeight: 400 }}>
                <ReactApexChart type="bar" series={num} options={chartOptions} height={375} />
            </ChartWrapperStyle>
        </Card>
    );
}
