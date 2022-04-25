import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';
import { BaseOptionChart } from '../../charts';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------
const CHART_HEIGHT = 392;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas svg': {
        height: CHART_HEIGHT
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },

}));

function AppWordsTime() {
    const { getDataWordsTime, loading } = useTweets();

    const data = getDataWordsTime();

    const word0 = data.sol0;
    const word1 = data.sol1;
    const word2 = data.sol2;

    const data0 = data.maxs0;
    const data1 = data.maxs1;
    const data2 = data.maxs2;

    const dates = data0.map(value => value.date);

    const values0 = data0.map(value => value.count);
    const values1 = data1.map(value => value.count);
    const values2 = data2.map(value => value.count);

    const series = [{
        name: word0,
        data: values0
    }, {
        name: word1,
        data: values1
    }, {
        name: word2,
        data: values2
    }]


    const chartOptions = merge(BaseOptionChart(), {
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
            enabled: true,
        },
        xaxis: {
            categories: dates,
            tickAmount: 6,
            labels: {
                rotate: 0,
                hideOverlappingLabels: true,
            },
            axisBorder: { show: true },
            axisTicks: { show: true },
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: [
            {
                seriesName: 'Cantidad',
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                },
                title: {
                    text: "Nº apariciones "
                }
            }
        ],
    });

    return (
        <Card>
            <CardHeader title="Palabras más usadas en el tiempo" />
            {loading ? <Skeleton variant="rect" width="100%" height={415} /> :
                <ChartWrapperStyle dir="ltr" style={{ maxHeight: 400, minHeight: 400 }}>
                    <ReactApexChart type="area" series={series} options={chartOptions} height={375} />
                </ChartWrapperStyle >}

        </Card>
    );
}

export default AppWordsTime;
