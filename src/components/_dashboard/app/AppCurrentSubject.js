import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    // borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: "Lunes",
    data: [{
      x: 'W1',
      y: 22
    }, {
      x: 'W2',
      y: 29
    }, {
      x: 'W3',
      y: 13
    }, {
      x: 'W4',
      y: 32
    }]
  },
  {
    name: "Jueves",
    data: [{
      x: 'W1',
      y: 43
    }, {
      x: 'W2',
      y: 43
    }, {
      x: 'W3',
      y: 43
    }, {
      x: 'W4',
      y: 43
    }]
  }
];

export default function AppCurrentSubject() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: Array(10).fill("#008FFB"),
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: ['Mayo', 'Junio', 'Julio', 'Agosto'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ]
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Tweets por día" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="heatmap" series={CHART_DATA} options={chartOptions} height={340} />
      </ChartWrapperStyle>
    </Card>
  );
}
