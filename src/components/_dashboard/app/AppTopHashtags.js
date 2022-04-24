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

function TopList({ top, height }) {
    const theme = useTheme()
    const colors = [theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.chart.violet[0]]

    return (
        <Stack px={5} pb={2} height={height} justifyContent="space-between" >
            {top().map((pair, index) => (
                <Stack direction="column" justifyContent="space-between" alignItems="flex-start" >
                    <Typography
                        key={index} variant={`h${index + 3}`} component="div" color={colors[index]} onClick={() => window.open(`https://twitter.com/intent/tweet?text=%23${pair[0]}`)} >
                        #{pair[0]}
                    </Typography>
                    <Typography variant="overline" display="block">
                        {`${pair[1]} ${pair[1] === 1 ? "tweet" : "tweets"}`}
                    </Typography>
                </Stack>
            ))
            }
        </Stack >
    )
}


function AppTopHashtags() {
    const { getTopHashtags, loading } = useTweets();
    // const topHashtags = getTopHashtags();
    // const theme = useTheme();
    // const labels = topHashtags.map(pair => `#${pair[0]}`);
    // const data = topHashtags.map(pair => pair[1]);

    // const chartOptions = merge(BaseOptionChart(), {
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
    //     chart: {
    //         events: {
    //             dataPointSelection: (event, chartContext, config) => {
    //                 window.open(`https://twitter.com/intent/tweet?text=%23${topHashtags[config.dataPointIndex][0]}`);
    //             }
    //         },
    //     },
    //     labels,
    //     stroke: { colors: [theme.palette.background.paper] },
    //     legend: { floating: true, horizontalAlign: 'center' },
    //     dataLabels: { enabled: true, dropShadow: { enabled: false } },
    //     tooltip: {
    //         fillSeriesColor: false,
    //         y: {
    //             formatter: (seriesName) => fNumber(seriesName),
    //             title: {
    //                 formatter: (seriesName) => `${seriesName}`
    //             }
    //         }
    //     },
    //     plotOptions: {
    //         pie: { donut: { labels: { show: false } } }
    //     }
    // });

    return (
        <Card>
            <CardHeader title="Top #hashtags" />
            {loading ?
                <Skeleton variant="rect" width="100%" height={CHART_HEIGHT} />
                :
                // <ChartWrapperStyle dir="ltr">
                //     <ReactApexChart type="pie" series={data} options={chartOptions} height={280} />
                // </ChartWrapperStyle>}
                <TopList top={getTopHashtags} height={CHART_HEIGHT} />}
        </Card>
    );
}

export default AppTopHashtags;
