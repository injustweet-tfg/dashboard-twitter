import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material'; 
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
  backgroundColor: alpha(theme.palette.primary.dark, 0.8)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('sm')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------



export default function DashboardNavbar() {
  const navigate = useNavigate();
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box
          component="img"
          src="/static/tfgtitle.png"
          sx={{ width: 200, top: 5 }}
          onClick={() => { navigate('/dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <NavSection navConfig={navbarConfig} />
      </ToolbarStyle>
    </RootStyle >
  );
}
