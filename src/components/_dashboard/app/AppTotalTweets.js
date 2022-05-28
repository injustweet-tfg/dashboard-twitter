import { styled } from '@mui/material/styles';
import { Card, Stack, Typography, Skeleton } from '@mui/material';
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../Iconify';
import { useTweets } from '../../../context';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2, 4),
  color: theme.palette.text.primary,
  backgroundImage: `linear-gradient(150deg, #FFF 70%, ${theme.palette.primary.lighter} 30%);`,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  minWidth: theme.spacing(8),
  minHeight: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function AppTotalTweets() {
  const { getTotals, loading } = useTweets();
  return (
    <RootStyle>

      <Stack direction='row' justifyContent="space-between" alignItems="center" >
        <Stack direction='column' justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle1" align='left' sx={{ color: 'text.secondary' }}>
            Total de tweets
          </Typography>

          <Typography variant="h3">{loading ? <Skeleton width={50} /> : fShortenNumber(getTotals().totalTweets)}</Typography>

        </Stack>
        <IconWrapperStyle>
          <Iconify icon="ant-design:twitter-outlined" width={24} height={24} />
        </IconWrapperStyle>
      </Stack>
    </RootStyle >
  );

}
