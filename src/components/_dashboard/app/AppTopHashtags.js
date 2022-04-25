import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Skeleton, Stack, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
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

// ----------------------------------------------------------------------
function AppTopHashtags() {
    const { getTopHashtags, loading } = useTweets();
    const topHashtags = getTopHashtags();
    const theme = useTheme()
    const hashtags = topHashtags.map(value => `#${value.hashtag}`);
    const num = [{ name: "Denuncias", data: topHashtags.map(value => value.tweets) }];
    console.log(num)
    const chartOptions = merge(BaseOptionChart(), {
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    window.open(`https://twitter.com/intent/user?screen_name=${topHashtags[config.dataPointIndex].user}`);
                }
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: (val, opt) => `${hashtags[opt.dataPointIndex]}`,
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
            // bar: { horizontal: true, barHeight: '58%', borderRadius: 2 }
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
            categories: hashtags,
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
            text: 'Tweets por hashtag',
            align: 'center',
            floating: true
        },
        // Theme
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
            <CardHeader title="Top #hashtags" />
            {loading ? <Skeleton variant="rect" width="100%" height={CHART_HEIGHT} />
                :
                <ChartWrapperStyle dir="ltr">
                    <ReactApexChart type="bar" series={num} options={chartOptions} height={300} />
                </ChartWrapperStyle>}
        </Card>
    );
}

export default AppTopHashtags;
