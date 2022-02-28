import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navbarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'info',
    path: '/info',
    icon: getIcon('eva:people-fill')
  }
];

export default navbarConfig;