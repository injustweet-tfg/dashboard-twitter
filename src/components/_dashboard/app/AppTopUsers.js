import { useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


export default function AppTopUsers({topusers}) {
    const [top, settop] = useState(topusers);
    const users = top.map(value => value.user);
    const num = [{ data: top.map(value => value.tweets) }];

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
            <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart type="bar" series={num} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
