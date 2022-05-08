import { Typography } from '@mui/material';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navbarConfig = [
  {
    title: <Typography variant="overline" > Dashboard </Typography>,
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: <Typography variant="overline" > Información </Typography>,
    path: '/info',
    icon: getIcon('eva:people-fill')
  }
];

export default navbarConfig;