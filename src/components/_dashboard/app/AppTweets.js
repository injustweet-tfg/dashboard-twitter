import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import { Box, Stack, Card, Button, Divider, Typography, CardHeader, Menu, MenuItem, Avatar, Skeleton, Input, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import useFetch from '../../../useFetch';
import Iconify from '../../Iconify';
import { fShortenNumber } from '../../../utils/formatNumber';
import { fToNow } from '../../../utils/formatTime';
import Scrollbar from '../../Scrollbar';
import { useTweets } from '../../../context';

// ----------------------------------------------------------------------
// styles
const TweetStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: theme.spacing(0, 2, 1),
  backgroundColor: theme.palette.grey[100],
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,

}));

const SearchbarStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 3),
  display: 'flex',
  alignItems: 'center',
  height: 40,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 1),
  backgroundColor: `${alpha(theme.palette.background.neutral, 0.72)}`,
  borderRadius: theme.shape.borderRadius,

}));

// ----------------------------------------------------------------------
// Searchbar
Searchbar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  dataLength: PropTypes.number,
};

const N_TWEETS = 100;

function Searchbar({ search, setSearch, dataLength }) {
  const [value, setValue] = useState();

  return (
    <Stack direction="column">
      <SearchbarStyle>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          fullWidth
          disableUnderline
          placeholder="Busca un @username o una palabra"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
          sx={{ mx: 1, fontWeight: 'fontWeightBold' }}
        />
        <Button onClick={() => setSearch(value)}>
          Buscar
        </Button>

      </SearchbarStyle>
      <Stack direction={search === "" ? "row-reverse" : "row"} px={4} alignItems="center" justifyContent="space-between" spacing={1} my={1}>
        {search === "" ? <></> : <div>
          <IconButton onClick={() => { setSearch(""); setValue(""); }}>
            <Icon icon="akar-icons:cross" width={10} height={10} />
          </IconButton>
          <Typography variant="overline" sx={{ color: 'primary.main' }}>Buscando por: </Typography>
          <Typography variant="caption" sx={{ color: 'text.primary' }}>{search}</Typography>
        </div>}
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>Mostrando {Math.min(dataLength, N_TWEETS)} de {fShortenNumber(dataLength)} tweets</Typography>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------
// TweetItem
TweetItem.propTypes = {
  tweet: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};


const SORT_BY_OPTIONS = [
  'Más recientes',
  'Más antiguos',
  'Más RTs',
  'Más likes'
];

function TweetItem({ tweet, loading }) {
  const theme = useTheme();

  if (loading) {
    return (
      <TweetStyle width="100%">
        <Skeleton variant="circular" width={55} height={55} sx={{ mt: 1.5 }} />
        <Skeleton sx={{ ml: 3 }} width="85%" height={55} />
      </TweetStyle>
    );
  }
  const { link, _id, text, user, date, likes, retweets, replies } = tweet;
  return (
    <TweetStyle>
      <Avatar
        alt={_id}
        src='/favicon/tfg512.png'
        sx={{ width: 55, height: 55, borderRadius: '50%', bgcolor: theme.palette.primary.main, mt: 1.5 }}
      />
      <Stack direction="column" alignItems="left" sx={{ px: 3 }}>
        <a href={link} target="_blank" rel="noreferrer" >
          <Typography variant="subtitle2" noWrap>
            {`@${user}`} &nbsp;
            <Typography variant="caption" sx={{ pr: 0, flexShrink: 0, color: 'text.secondary' }} noWrap >
              {fToNow(new Date(date * 1000))}
            </Typography>
          </Typography>
        </a>

        <Typography variant="body2" sx={{ color: 'text.primary' }} paragraph >
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

  const { loading, data, } = useFetch(`https://cache-twitter.herokuapp.com/words/?dateStart=${dateStart}&dateEnd=${dateEnd}&word=${search}&order=${selected}`);

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
        sx={{ mb: -1 }}
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
      <Searchbar search={search} setSearch={setSearch} dataLength={data.length} />

      <Scrollbar style={{ maxHeight: 935 }}>
        <Stack spacing={2} sx={{ m: 3 }} direction={loading ? "row" : "column"}>
          {loading ? <TweetItem loading={loading} />
            : data.slice(0, N_TWEETS).map((tweet, index) => (
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