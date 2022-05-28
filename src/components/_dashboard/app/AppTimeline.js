
import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
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

export default function AppTimeline() {
  const theme = useTheme();

  const { getDataTimeline, loading } = useTweets();
  const dataTimeline = getDataTimeline();
  const dates = dataTimeline.map(value => value.date);
  const tweets = dataTimeline.map(value => value.tweet);
  const favs = dataTimeline.map(value => value.fav);
  const rts = dataTimeline.map(value => value.rt);

  const series = [{
    name: 'tweets',
    data: tweets
  }, {
    name: 'likes',
    data: favs
  }, {
    name: 'retweets',
    data: rts
  }]

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main],

    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
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
        seriesName: 'tweets',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: "Tweets"
        }
      },
      {
        seriesName: 'likes',
        show: false
      }, {
        opposite: true,
        seriesName: 'likes',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: "rts y likes"
        }
      }
    ],
  });


  return (

    <Card>
      <CardHeader title="Progreso de denuncias en el tiempo" />
      {loading ? <Skeleton variant="rect" width="100%" height={415} /> :
        <ChartWrapperStyle dir="ltr" style={{ maxHeight: 400, minHeight: 400 }}>
          {/* <Box sx={{ mx: 3 }} dir="ltr"> */}
          <ReactApexChart type="area" series={series} options={chartOptions} height={375} />
          {/* </Box> */}
        </ChartWrapperStyle >}

    </Card>

  );
}