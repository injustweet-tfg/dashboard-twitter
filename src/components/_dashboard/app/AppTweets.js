import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled, alpha } from '@mui/material/styles';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, Stack, Card, Button, Divider, Typography, CardHeader, Menu, MenuItem, Avatar, Skeleton, Input, InputAdornment } from '@mui/material';
import useFetch from '../../../useFetch';
import Iconify from '../../Iconify';
// utils
import { mockImgAvatar } from '../../../utils/mockImages';
import { fToNow } from '../../../utils/formatTime';
//
import Scrollbar from '../../Scrollbar';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------
// styles
const TweetStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: theme.spacing(1, 2, 1),
  backgroundColor: theme.palette.grey[100],
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

const SearchbarStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: 90,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
}));

// ----------------------------------------------------------------------
// Searchbar
function Searchbar({setSearch}) {
  const [value, setValue] = useState();
  const handleClickSearch = (event) => {
    console.log(event.currentTarget);
  }

  return (
    <SearchbarStyle>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        fullWidth
        disableUnderline
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
        sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
      />
      <Button onClick={() => setSearch(value)}>
        Search
      </Button>
    </SearchbarStyle>

  );
}

// ----------------------------------------------------------------------
// TweetItem
// TweetItem.propTypes = {
//   tweet: PropTypes.object.isRequired
// };


const SORT_BY_OPTIONS = [
  'Más recientes',
  'Más antiguos',
  'Más RTs',
  'Más FAVs'
];

function TweetItem({ tweet, loading }) {
  const theme = useTheme();
  const linkStyle = useStyles();

  const color = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.warning.main];
  if (loading) {
    return (
      <TweetStyle width="100%">
        <Skeleton variant="circular" width={55} height={55} />
        <Skeleton sx={{ ml: 3 }} width="85%" height={55} />
      </TweetStyle>
    );
  }
  const { link, _id, id, text, user, date, likes, retweets, replies } = tweet;
  return (
    <TweetStyle>
      <Avatar
        alt={_id}
        src='/favicon/tfg512.png'
        sx={{ width: 55, height: 55, borderRadius: '50%', bgcolor: color[Math.trunc(id / 1000) % 4] }}
      />
      <Stack direction="column" alignItems="left" sx={{ px: 3 }}>
        <a className={linkStyle.twlink} href={link} target="_blank" rel="noreferrer" >
          <Typography variant="subtitle2" noWrap>
            {`@${user}`} &nbsp;
            <Typography variant="caption" sx={{ pr: 0, flexShrink: 0, color: 'text.secondary' }} noWrap >
              {fToNow(new Date(date * 1000))}
            </Typography>
          </Typography>
        </a>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} paragraph >
          {text}
        </Typography>

        <Box mt={-1} sx={{ minWidth: 240 }} alignItems="center" spacing={3}>
          <Typography variant="caption" sx={{ pr: 2, flexShrink: 0, color: 'text.secondary' }}  >
            <Iconify icon="bi:reply" width={20} height={20} /> {replies} &nbsp;
            <Iconify icon="ant-design:retweet-outlined" width={20} height={20} /> {retweets} &nbsp;
            <Iconify icon="ant-design:heart-outlined" width={20} height={20} /> {likes}
          </Typography>
        </Box>
      </Stack>
    </TweetStyle>
  );
}

export default function AppTweets() {
  const { dateStart, dateEnd } = useTweets();
  const [open, setOpen] = useState(null);
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");

  const {loading, data ,error} = useFetch(`https://cache-twitter.herokuapp.com/words/?dateStart=${dateStart}&dateEnd=${dateEnd}&word=${search}&order=${selected}`);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (event, index) => {
    setSelected(index);
    handleClose();
  };

  return (
    <Card>
      <CardHeader
        title="Denuncias en tweets"
        action={<>
          <Button onClick={handleOpen} aria-label="filter" endIcon={<Iconify icon="bx:sort" />}>
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
      <Searchbar setSearch={setSearch} />

       <Scrollbar style={{ maxHeight: 790 }}>
         <Stack spacing={2} sx={{ m: 3 }} direction={loading ? "row" : "column"}>
          {loading ? <TweetItem loading={loading} />
            : data.map((tweet, index) => (
              <TweetItem key={index} tweet={tweet} />
            ))}
        </Stack> 
      </Scrollbar> 

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="big"
          href='https://twitter.com/intent/tweet?text=%23InjusTweet'
          target="_blank" rel="noreferrer"
          endIcon={<Iconify icon="logos:twitter" />}
        >
          Tweetea tu denuncia
        </Button>



      </Box>

    </Card >
  );
}