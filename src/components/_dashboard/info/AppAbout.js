import PropTypes from 'prop-types';
import { Card, Grid, Avatar, CardContent, Typography, IconButton } from '@mui/material';
import Iconify from '../../Iconify';

const US = [
    {
        name: "Roberto Asunción López",
        role: "Back-end developer",
        github: "https://github.com/roberl234",
        linkedin: "https://es.linkedin.com/in/rasun"
    },
    {
        name: "Pablo Imbert Fernández",
        role: "Data Scientist",
        github: "https://github.com/pabloimbert",
        linkedin: undefined
    },
    {
        name: "Julián Moreno Bellaneda",
        role: "Back-end developer",
        github: "https://github.com/JM012",
        linkedin: "https://www.linkedin.com/in/juli%C3%A1n-moreno-bellaneda-111607232",
    },
    {
        name: "Javier Mulero Martín",
        role: "Front-end developer",
        github: "https://github.com/jjavimu",
        linkedin: "https://www.linkedin.com/in/javier-mulero-martin/"
    },
    {
        name: "Raquel Pérez González de Ossuna",
        role: "Data Scientist",
        github: undefined,
        linkedin: "https://www.linkedin.com/in/raquel-p%C3%A9rez-gonz%C3%A1lez-de-ossuna-184b9a214"
    },
    {
        name: "Ángela Ruiz Ribera",
        role: "Front-end developer",
        github: undefined,
        linkedin: "https://www.linkedin.com/in/angelaruizribera/"
    }
]

ContactCard.propTypes = {
    item: PropTypes.object
};

function ContactCard({ item }) {
    return <Card sx={{ height: 120 }}>
        <CardContent>
            <Grid container spacing={2} alignItems="top">
                <Grid item md={2} xs={2}>
                    <Avatar
                        src='/favicon/tfg512.png'
                        sx={{ borderRadius: '50%', bgcolor: "#000", marginTop: 0.5 }}
                    />
                </Grid>
                <Grid item md={7} xs={10}>
                    <Typography variant="subtitle1" >
                        {item.name}
                    </Typography>

                    <Typography variant="overline" >
                        {item.role}
                    </Typography>
                </Grid>
                <Grid item md={3} xs={12}>

                    {item.github === undefined ? <> </> : <IconButton color="primary" onClick={() => window.open(item.github)}>
                        <Iconify icon="ant-design:github-filled" />
                    </IconButton >}

                    {item.linkedin === undefined ? <> </> : <IconButton color="primary" onClick={() => window.open(item.linkedin)}>
                        <Iconify icon="ant-design:linkedin-filled" />
                    </IconButton >}
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

function AppAbout() {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={12} lg={12}>
                <Card mt={3}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            style={{ wordWrap: "break-word" }}
                            margin={3}
                        >
                            Sobre nosotros/as

                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ wordWrap: "break-word" }}
                            margin={3}
                        >
                            Somos un grupo de estudiantes de las facultades de matemáticas e
                            ingeniería informática de la Universidad Complutense de Madrid. Buscábamos crear
                            con nuestro trabajo de fin de carrera una iniciativa que sirviese de punto de encuentro
                            entre la tecnología y la sociedad.


                        </Typography>


                    </CardContent>

                </Card >
            </Grid>

            {US.map((item, index) =>
                <Grid key={index} item xs={12} md={4} lg={4}>
                    <ContactCard key={index} item={item} />
                </Grid>)}
        </Grid>
    );
}

export default AppAbout;