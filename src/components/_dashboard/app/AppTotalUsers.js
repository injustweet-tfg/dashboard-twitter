import { useState } from 'react';

import { Icon } from '@iconify/react';

import eyeFilled from '@iconify/icons-ant-design/eye-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  // boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 4),
  color: theme.palette.text.primary,
  // backgroundColor: theme.palette.warning.light
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  // margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
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

export default function AppTotalUsers({ totalUsers }) {
  const [total, setTotal] = useState(totalUsers);
  return (
    <RootStyle>
      <Stack direction='row' justifyContent="space-between" alignItems="center">
        <Stack direction='column' justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle1" align='center' sx={{ color: 'text.secondary' }}>
            Total de usuarios
          </Typography>
          <Typography variant="h3">{fShortenNumber(total)}</Typography>
        </Stack>
        <IconWrapperStyle>
          <Icon icon={eyeFilled} width={24} height={24} />
        </IconWrapperStyle>
      </Stack>
    </RootStyle >
  );
}
