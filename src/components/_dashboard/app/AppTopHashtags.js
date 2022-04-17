import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 384;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
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
    }
}));

// ----------------------------------------------------------------------


function AppTopHashtags() {
    const { topHashtags} = useTweets();
    const theme = useTheme();
    const labels = topHashtags.map(pair => `#${pair[0]}`);
    const data = topHashtags.map(pair => pair[1]);

    const chartOptions = merge(BaseOptionChart(), {
        // colors: [
        //     theme.palette.primary.main,
        //     theme.palette.secondary.main,
        //     theme.palette.success.main,
        //     theme.palette.warning.main,
        //     theme.palette.chart.violet[0],
        //     theme.palette.chart.red[0],
        //     theme.palette.chart.green[0],
        //     ...theme.palette.chart.other,
        //     theme.palette.chart.pink[0],

        // ],
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    window.open(`https://twitter.com/intent/tweet?text=%23${topHashtags[config.dataPointIndex][0]}`);
                }
            },
        },
        labels,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`
                }
            }
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } }
        }
    });

    return (
        <Card>
            <CardHeader title="Top #hashtags" />
            <ChartWrapperStyle dir="ltr" >
                <ReactApexChart type="pie" series={data} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card>
    );
}

export default AppTopHashtags;
