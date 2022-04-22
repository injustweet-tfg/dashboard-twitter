import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { useTweets } from '../../../context';

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

export default function AppTopUsers() {
    const { getTopUsers } = useTweets();
    const topUsers = getTopUsers();

    const users = topUsers.map(value => `@${value.user}`);
    const num = [{ name: "Denuncias", data: topUsers.map(value => value.tweets) }];

    const chartOptions = merge(BaseOptionChart(), {
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    window.open(`https://twitter.com/intent/user?screen_name=${topUsers[config.dataPointIndex].user}`);
                }
            },
        },
        tooltip: {
            enabled: true,
            intersect: true,
            shared: false,
        },
        plotOptions: {
            bar: { horizontal: true, barHeight: '58%', borderRadius: 2 }
        },
        xaxis: {
            categories: users
        },
        // Theme
        theme: {
            mode: 'light',
            palette: 'palette7',
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        },
    }
    );

    return (
        <Card>
            <CardHeader title="Top @users" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="bar" series={num} options={chartOptions} height={375} />
            </ChartWrapperStyle>
        </Card>
    );
}
