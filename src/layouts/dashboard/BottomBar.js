// material
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material'; // Box, Stack, IconButton 
import Iconify from '../../components/Iconify';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    margin: 0,
    padding: 20,
    height: 60,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    textAlign: 'center',
    'a': {
        color: theme.palette.common.white
    }
}));




// ----------------------------------------------------------------------


export default function BottomBar() {

    return (
        <RootStyle>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Box sx={{ display: 'flex' }}>
                    <Iconify icon="ant-design:github-filled" height="120%" />
                    <Typography variant="body2" ml={1}>
                        Síguenos en <a href="https://github.com/jjavimu" target="_blank" rel="noreferrer">Github</a>
                    </Typography>
                </Box >
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" mr={1} display={{ xs: 'none', sm: 'block' }} >
                        Esta obra está bajo una Licencia Creative Commons Atribución 4.0 Internacional
                    </Typography>
                    <img src="/static/by-sa.svg" alt="Licencia Creative Commons BY SA" height='120%' />
                </Box >


            </Container>
        </RootStyle >

    );
}
