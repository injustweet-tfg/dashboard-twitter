// import faker from 'faker';
// import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import { formatDistance } from 'date-fns';
// import { Link as RouterLink } from 'react-router-dom';
// import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// import commentOutlined from '@iconify/icons-ant-design/comment-outlined';
// import retweetOutlined from '@iconify/icons-ant-design/retweet-outlined';
// import starOutlined from '@iconify/icons-ant-design/star-outlined';
// import filterFilled from '@iconify/icons-ant-design/filter-filled';
// // material
// import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, Grid, Menu, MenuItem } from '@mui/material';
// // utils
// import { useState } from 'react';
// import { mockImgCover } from '../../../utils/mockImages';
// //
// import Scrollbar from '../../Scrollbar';

// // ----------------------------------------------------------------------

// const NEWS = [...Array(7)].map((_, index) => {
//   const setIndex = index + 1;
//   return {
//     name: faker.name.title(),
//     username: "@".concat(faker.internet.userName()),
//     description: faker.lorem.paragraph(2),
//     image: mockImgCover(setIndex),
//     postedAt: faker.date.soon(),
//     rt: index,
//     fav: index,
//     replays: index,
//   };
// });

// // ----------------------------------------------------------------------

// NewsItem.propTypes = {
//   news: PropTypes.object.isRequired
// };

// function NewsItem({ news }) {
//   const { image, name, username, description, postedAt, rt, fav, replays } = news;

//   return (
//     <Grid container pr={4}>
//       <Grid item xs={2} sm={2} md={2} lg={2}>
//         <Box
//           component="img"
//           alt={name}
//           src={image}
//           sx={{ width: 80, height: 80, borderRadius: '50%' }}
//         />
//       </Grid>
//       <Grid item xs={10} sm={10} md={10} lg={10}>
//         <Box sx={{ minWidth: 240 }}>
//           <Link to="#" color="inherit" underline="hover" component={RouterLink}>
//             <Typography variant="subtitle2" noWrap>
//               {name} <span>&nbsp;</span>
//               <Typography variant="caption" sx={{ pr: 10, flexShrink: 0, color: 'text.secondary' }}>
//                 {username} · {formatDistance(postedAt, new Date())}
//               </Typography>
//             </Typography>

//           </Link>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} >
//             {description}
//           </Typography>
//           <Box mt={0.5} sx={{ minWidth: 240 }} alignItems="center">
//             <Typography variant="caption" sx={{ pr: 10, flexShrink: 0, color: 'text.secondary' }}  >
//               <Icon icon={commentOutlined} width={20} height={20} /> {replays} <span>&nbsp;</span>
//               <Icon icon={retweetOutlined} width={20} height={20} /> {rt} <span>&nbsp;</span>
//               <Icon icon={starOutlined} width={20} height={20} /> {fav}
//             </Typography>
//           </Box>
//         </Box>
//       </Grid>


//     </Grid>
//   );
// }

// // ----------------------------------------------------------------------


// const SORT_BY_OPTIONS = [
//   'Más recientes',
//   'Más antiguos',
//   'Más RTs',
//   'Más FAVs'
// ];

// // ----------------------------------------------------------------------

// export default function AppTweets() {

//   const [open, setOpen] = useState(null);
//   const [selected, setSelected] = useState(0);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const handleChange = (event, index) => {
//     setSelected(index);
//     handleClose();
//   };


//   return (
//     <Card>
//       <CardHeader
//         title="Tweets"
//         action={<>
//           <Button onClick={handleOpen} aria-label="filter" endIcon={<Icon icon={filterFilled} />}>
//             Ordenar por:&nbsp;
//             <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
//               {SORT_BY_OPTIONS[selected]}
//             </Typography>
//           </Button>
//           <Menu
//             keepMounted
//             anchorEl={open}
//             open={Boolean(open)}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             {SORT_BY_OPTIONS.map((option, index) => (
//               <MenuItem
//                 key={index}
//                 selected={option === SORT_BY_OPTIONS[selected]}
//                 onClick={(event) => handleChange(event, index)}
//                 sx={{ typography: 'body2' }}
//               >
//                 {option}
//               </MenuItem>

//             ))}
//           </Menu>
//         </>
//         } />

//       <Scrollbar>
//         <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
//           {NEWS.map((news, index) => (
//             <NewsItem key={index} news={news} />
//           ))}
//         </Stack>
//       </Scrollbar>

//       <Divider />

//       <Box sx={{ p: 2, textAlign: 'right' }}>
//         <Button
//           to="#"
//           size="small"
//           color="inherit"
//           component={RouterLink}
//           endIcon={<Icon icon={arrowIosForwardFill} />}
//         >
//           View all
//         </Button>
//       </Box>
//     </Card>
//   );
// }

import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon()
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  return (
    <Card>
      <CardHeader title="News Update" />

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