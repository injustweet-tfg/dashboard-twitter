
import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    name: 'rts',
    data: rts
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
          text: "Rts y likes"
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

/*
export default function AppTimeline({dataTimeline}) {
  const [data, setTotal] = useState(dataTimeline);

  return (

    <Card>
      <CardHeader title="Progreso" />
      <Box>
        <ResponsiveContainer width="95%" height={400}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="tweet" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="fav" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="rt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

    </Card>

  );
}

*/