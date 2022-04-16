// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../Iconify';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  // boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 4),
  color: theme.palette.text.primary,
  // backgroundColor: theme.palette.primary.light,
  backgroundImage: `linear-gradient(150deg, #FFF 70%, ${theme.palette.primary.lighter} 30%);`,
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
  // backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.darker, 0)} 0%, ${alpha(
  //   theme.palette.primary.dark,
  //   0.24
  // )} 100%)`
  backgroundColor: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

// const TOTAL = 714000;

export default function AppTotalTweets({ totalTweets }) {
  console.log("AppTotalTweets:update");

  return (
    <RootStyle>
      <Stack direction='row' justifyContent="space-between" alignItems="center" >
        <Stack direction='column' justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle1" align='left' sx={{ color: 'text.secondary' }}>
            Total de tweets
          </Typography>
          <Typography variant="h3">{fShortenNumber(totalTweets)}</Typography>
        </Stack>
        <IconWrapperStyle>
          <Iconify icon="ant-design:twitter-outlined" width={24} height={24} />
        </IconWrapperStyle>
      </Stack>
    </RootStyle >
  );

}
