import { Card, Typography, CardContent } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------


function AppTech() {
    return (
        <Card>
            <CardContent>
                <Typography
                    variant="h3"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Proyecto

                </Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Frente a la gran cantidad de datos que se encuentran en las redes sociales,
                    hacemos uso de técnicas de análisis de lenguaje natural para obtener
                    denuncias laborales en Twitter.

                </Typography>

                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Además, con el fin evitar la censura por medio de la eliminación o manipulación del contenido,
                    gestionamos los datos utilizando tecnologías distribuidas (Blockchain).

                </Typography>

                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Finalmente, buscamos ser una iniciativa que apoye el software libre, por lo que si
                    el proyecto te parece interesante, te animamos a que lo veas, modifiques y distribuyas
                    libremente.

                </Typography>


            </CardContent>

        </Card >
    );
}

export default AppTech;