import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
//


// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 60,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white,
    },

  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon } = item;


  const activeRootStyle = {
    color: 'common.white',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.common.white, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };


  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };

  return (
    <Box {...other}>
      <List style={flexContainer} disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}