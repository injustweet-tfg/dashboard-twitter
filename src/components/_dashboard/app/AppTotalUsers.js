// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../Iconify';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  // boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 4),
  color: theme.palette.text.primary,
  // backgroundColor: theme.palette.warning.light
  backgroundImage: `linear-gradient(150deg, #FFF 70%, ${theme.palette.warning.lighter} 20%);`,
  // backgroundImage: `linear-gradient(150deg, #FFF 70%, ${theme.palette.warning.lighter} 70% 75%, #FFF 75% 80%, ${theme.palette.warning.lighter} 20%);`,
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
  // backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
  //   theme.palette.primary.dark,
  //   0.44
  // )} 100%)`
  backgroundColor: theme.palette.warning.main
}));

// ----------------------------------------------------------------------

// const TOTAL = 1352831;

export default function AppTotalUsers() {
  const { totals} = useTweets();
  return (
    <RootStyle>
      <Stack direction='row' justifyContent="space-between" alignItems="center">
        <Stack direction='column' justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle1" align='left' sx={{ color: 'text.secondary' }}>
            Total de usuarios
          </Typography>
          <Typography variant="h3">{fShortenNumber(totals.totalUsers)}</Typography>
        </Stack>
        <IconWrapperStyle>
          <Iconify icon="ant-design:eye-filled" width={24} height={24} />
        </IconWrapperStyle>
      </Stack>
    </RootStyle >
  );
}
