
import React, { useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppTimeline({ dataTimeline }) {
  const [data, setTotal] = useState(dataTimeline);
  const dates = data.map(value => value.date);
  const tweets = data.map(value => value.tweet);
  const favs = data.map(value => value.fav);
  const rts = data.map(value => value.rt);

  const series = [{
    name: 'tweets',
    data: tweets
  }, {
    name: 'favs',
    data: favs
  }, {
    name: 'rts',
    data: rts
  }]

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: dates
    },
    stroke: {
      curve: 'smooth'
    },
  });

  return (

    <Card>
      <CardHeader title="Progreso" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="area" series={series} options={chartOptions} height={364} />
      </Box>

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