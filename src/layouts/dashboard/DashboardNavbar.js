import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material'; // Box, Stack, IconButton 

import navbarConfig from './NavbarConfig'
import NavSection from '../../components/NavSection';


// ----------------------------------------------------------------------

const APPBAR_MOBILE = 40;
const APPBAR_DESKTOP = 40;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.primary.main, 0.8)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('sm')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box
          component="img"
          src="/static/illustrations/illustration_login.png"
          sx={{ width: APPBAR_DESKTOP, top: 5 }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <NavSection navConfig={navbarConfig} />
      </ToolbarStyle>
    </RootStyle >
  );
}
