import { useState } from 'react';

import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
import twitterOutlined from '@iconify/icons-ant-design/twitter-outlined';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.darker}`,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

// const TOTAL = 714000;

export default function AppTotalTweets({totalTweets}) {
  const [total, setTotal] = useState(totalTweets);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={twitterOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total de tweets
      </Typography>
    </RootStyle>
  );
}
