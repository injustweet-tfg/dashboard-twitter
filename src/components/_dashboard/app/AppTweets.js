import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, Grid } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [...Array(7)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraph(2),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon(),
    rt: index,
    fav: index,
    replays: index,
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt, rt, fav, replays } = news;

  return (
    <Grid container>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <Box
          component="img"
          alt={title}
          src={image}
          sx={{ width: 80, height: 80, borderRadius: '50%' }}
        />
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Box sx={{ minWidth: 240 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} >
            {description}
          </Typography>
          <Box sx={{ minWidth: 240 }}>
            <Typography variant="caption" sx={{ pr: 10, flexShrink: 0, color: 'text.secondary' }}>
              {formatDistance(postedAt, new Date(), { addSuffix: true })} | {rt} RT | {fav} FAV | {replays} Replays
            </Typography>
          </Box>
        </Box>
      </Grid>


    </Grid>
  );
}

export default function AppTweets() {
  return (
    <Card>
      <CardHeader title="Tweets" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {NEWS.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
