// import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material'; // Box, Stack, IconButton 

import { useNavigate } from 'react-router-dom';
import navbarConfig from './NavbarConfig'
import NavSection from '../../components/NavSection';



// ----------------------------------------------------------------------

const APPBAR_MOBILE = 60;
const APPBAR_DESKTOP = 60;

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

// DashboardNavbar.propTypes = {
//   onOpenSidebar: PropTypes.func
// };

export default function DashboardNavbar() {
  const navigate = useNavigate();
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box
          component="img"
          src="/static/tfgtitle.png"
          sx={{ width: 200, top: 5 }}
          onClick={() => navigate('/dashboard')}
        />
        <Box sx={{ flexGrow: 1 }} />
        <NavSection navConfig={navbarConfig} />
      </ToolbarStyle>
    </RootStyle >
  );
}
