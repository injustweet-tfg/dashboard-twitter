import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';
import { BaseOptionChart } from '../../charts';
import { useTweets } from '../../../context';

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
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function AppHeatmap() {
  const { getDataHeatmap, loading } = useTweets();
  const dataHeatmap = getDataHeatmap();
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main],
    stroke: { width: 2 },
    fill: { opacity: 0.8 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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
      <CardHeader title="Denuncias por día" />
      {loading ?
        <Skeleton variant="rect" width="100%" height={415} />
        :
        <ChartWrapperStyle dir="ltr" style={{ maxHeight: 400, minHeight: 400 }}>
          <ReactApexChart type="heatmap" series={dataHeatmap} options={chartOptions} height={350} />
        </ChartWrapperStyle>}
    </Card >
  );
}
