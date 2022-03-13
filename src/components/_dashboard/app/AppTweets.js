import { useState, useContext } from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import commentOutlined from '@iconify/icons-ant-design/comment-outlined';
import retweetOutlined from '@iconify/icons-ant-design/retweet-outlined';
import starOutlined from '@iconify/icons-ant-design/star-outlined';
import filterFilled from '@iconify/icons-ant-design/filter-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, Grid, Menu, MenuItem } from '@mui/material';
// utils
import { mockImgAvatar } from '../../../utils/mockImages';
import { newFormat, fToNow } from '../../../utils/formatTime';
//
import Scrollbar from '../../Scrollbar';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------
const TweetStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: theme.spacing(1, 2, 1),
  backgroundColor: theme.palette.grey[200],
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,

}));

const useStyles = makeStyles((theme) => ({
  twlink: {
    width: 'auto',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    }
  },
}));

TweetItem.propTypes = {
  tweet: PropTypes.object.isRequired
};


const SORT_BY_OPTIONS = [
  'Más recientes',
  'Más antiguos',
  'Más RTs',
  'Más FAVs'
];

function TweetItem({ tweet }) {
  const { link, id, text, user, date, likes, retweets, replies } = tweet;
  // console.log(faker.date.soon(), formatDistance(faker.date.soon(), new Date()));
  // console.log(date, newFormat(date));
  // console.log(fecha, new Date(fecha).getDay(), formatDistance(new Date(fecha), new Date()));

  return (
    // <Stack direction="row" alignItems="top" spacing={2}>
    <TweetStyle>
      <Box
        component="img"
        alt={id}
        src={mockImgAvatar((id % 20) + 1)}
        sx={{ width: 55, height: 55, borderRadius: '50%' }}
      />
      <Stack direction="column" alignItems="left" sx={{ px: 3 }}>
        {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
        <a className={useStyles().twlink} href={link} target="_blank" rel="noreferrer" >
          <Typography variant="subtitle2" noWrap>
            {`@${user}`} &nbsp;
            <Typography variant="caption" sx={{ pr: 0, flexShrink: 0, color: 'text.secondary' }} noWrap >
              {/* {formatDistance(newFormat(date), new Date())} */}
              {fToNow(new Date(date))}
              {/* {console.log(newFormat(date))} */}
            </Typography>
          </Typography>
        </a>
        {/* </Link> */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} paragraph >
          {text}
        </Typography>
        <Box mt={-1} sx={{ minWidth: 240 }} alignItems="center" spacing={3}>
          <Typography variant="caption" sx={{ pr: 2, flexShrink: 0, color: 'text.secondary' }}  >
            <Icon icon={commentOutlined} width={20} height={20} /> {replies} <span>&nbsp;</span>
          </Typography>
          <Typography variant="caption" sx={{ pr: 2, flexShrink: 0, color: 'text.secondary' }}  >
            <Icon icon={retweetOutlined} width={20} height={20} /> {retweets} <span>&nbsp;</span> </Typography>
          <Typography variant="caption" sx={{ pr: 2, flexShrink: 0, color: 'text.secondary' }}  >
            <Icon icon={starOutlined} width={20} height={20} /> {likes}
          </Typography>
        </Box>
      </Stack>
    </TweetStyle>
  );
}
export default function AppTweets({ tweetView, getTweetView, setTweetView }) {
  const [open, setOpen] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (event, index) => {
    setSelected(index);
    setTweetView(getTweetView(index));
    handleClose();
  };

  return (
    <Card>
      <CardHeader
        title="Tweets"
        action={<>
          <Button onClick={handleOpen} aria-label="filter" endIcon={<Icon icon={filterFilled} />}>
            Ordenar por:&nbsp;
            <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {SORT_BY_OPTIONS[selected]}
            </Typography>
          </Button>
          <Menu
            keepMounted
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {SORT_BY_OPTIONS.map((option, index) => (
              <MenuItem
                key={index}
                selected={option === SORT_BY_OPTIONS[selected]}
                onClick={(event) => handleChange(event, index)}
                sx={{ typography: 'body2' }}
              >
                {option}
              </MenuItem>

            ))}
          </Menu>
        </>
        }
      />

      <Scrollbar style={{ maxHeight: 820 }}>
        <Stack spacing={2} sx={{ m: 3 }}>
          {tweetView.map((tweet, index) => (
            <TweetItem key={index} tweet={tweet} />
          ))}
        </Stack>
      </Scrollbar>

    </Card >
  );
}