import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';
import { BaseOptionChart } from '../../charts';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------
const CHART_HEIGHT = 300;
const LEGEND_HEIGHT = 0;


const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
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
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),

}));

export default function AppTopUsers() {
    const { getTopUsers, loading } = useTweets();
    const topUsers = getTopUsers();
    const theme = useTheme()
    const users = topUsers.map(value => `@${value.user}`);
    const num = [{ name: "Denuncias", data: topUsers.map(value => value.tweets) }];
    console.log(num)
    const chartOptions = merge(BaseOptionChart(), {
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    window.open(`https://twitter.com/intent/user?screen_name=${topUsers[config.dataPointIndex].user}`);
                }
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: (val, opt) => `${users[opt.dataPointIndex]}`,
            offsetX: 0,
            dropShadow: {
                enabled: true
            }
        },
        tooltip: {
            enabled: true,
            intersect: true,
            shared: false,
        },
        plotOptions: {
            bar: {
                barHeight: '50%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                }
            },
        },
        xaxis: {
            categories: users,
            tickAmount: num[0].data[0],
            labels: {
                show: true,
                decimalsInFloat: 0,
                style: {
                    fontSize: '16px',
                    fontWeight: 500,
                },
                formatter: (val) => `${val.toFixed(0)}`,
            },
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        title: {
            text: 'Tweets por usuario',
            align: 'center',
            floating: true
        },
        theme: {
            mode: 'light',
            palette: 'palette7',
            monochrome: {
                enabled: true,
                color: theme.palette.grey[600],
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        },
    }
    );

    return (
        <Card>
            <CardHeader title="Top @users" />
            {loading ? <Skeleton variant="rect" width="100%" height={CHART_HEIGHT} />
                :
                <ChartWrapperStyle dir="ltr">
                    <ReactApexChart type="bar" series={num} options={chartOptions} height={300} />
                </ChartWrapperStyle>}
        </Card>
    );
}
