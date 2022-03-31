import { Icon } from '@iconify/react';
// import bugFilled from '@iconify/icons-ant-design/bug-filled';
import heartFilled from '@iconify/icons-ant-design/heart-filled';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  // boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 4),
  color: theme.palette.text.primary,
  // backgroundColor: theme.palette.secondary.light
  backgroundImage: `linear-gradient(150deg, #FFF 70%, ${theme.palette.secondary.lighter} 30%);`,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  // margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  minWidth: theme.spacing(8),
  minHeight: theme.spacing(8),
  justifyContent: 'center',
  // marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  // backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
  //   theme.palette.secondary.dark,
  //   0.24
  // )} 100%)`
  backgroundColor: theme.palette.secondary.main
}));

// ----------------------------------------------------------------------

export default function AppTotalFAV({ totalFAV }) {

  return (
    <RootStyle>
      <Stack direction='row' justifyContent="space-between" alignItems="center">
        <Stack direction='column' justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle1" align='left' sx={{ color: 'text.secondary' }}>
            Total de favoritos
          </Typography>
          <Typography variant="h3">{fShortenNumber(totalFAV)}</Typography>
        </Stack>
        <IconWrapperStyle>
          <Icon icon={heartFilled} width={24} height={24} />
        </IconWrapperStyle>
      </Stack>
    </RootStyle >

  );
}
