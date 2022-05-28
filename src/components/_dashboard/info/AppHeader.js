import { Card, Typography, CardContent } from '@mui/material';
import React from 'react';
// ----------------------------------------------------------------------

function AppHeader() {

    return (
        <Card>
            <CardContent>

                <Typography
                    variant="h3"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Iniciativa

                </Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >


                    Siempre se han dado situaciones de injusticia en el entorno laboral de origen muy diverso, e independientemente del ámbito profesional.
                    Algunas de ellas están relacionadas con las condiciones salariales y horarias en las que se trabaja, otras son de carácter físico o mental.
                </Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >

                    Sin embargo, hoy en día, con el auge de las tecnologías y las redes sociales, muchas de estas situaciones están saliendo a la luz y dándose a conocer.
                    Dichas plataformas están siendo utilizadas como un medio de denuncia, comunicación y apoyo.
                    Especialmente, por aquellos trabajadores que no tienen un claro método de denuncia y buscan una comunidad que pueda ayudarles.
                </Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Todo esto nos lleva a preguntarnos por la cantidad y el tipo de denuncias que se llevaban a cabo,
                    la posible relación que puede haber entre ellas o con el contexto en el que se producen,
                    si algunas pueden estar pasando desapercibidas frente a otras con mayor atractivo mediático,
                    si se están publicando casos falsos
                    o si las denuncias realizadas pueden estar siendo silenciadas.
                </Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                    margin={3}
                >
                    Proponemos, por lo tanto, crear una aplicación que permita dar visibilidad y
                    unificar en un único lugar todas las denuncias. De forma que esté diseñada para que todo el
                    que quiera pueda acudir a consultar, compartir o visibilizar dichas situaciones.
                </Typography>
            </CardContent>

        </Card >
    );
}

export default AppHeader;