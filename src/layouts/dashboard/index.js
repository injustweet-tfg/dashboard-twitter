import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import Footer from './Footer';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 90;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  flexDirection: 'column',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <RootStyle>
      <DashboardNavbar />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <Footer />
    </RootStyle>
  );
}
