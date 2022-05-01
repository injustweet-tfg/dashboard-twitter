import { Card, Box, Grid, Container, Typography, CardContent, CardHeader } from '@mui/material';
import React from 'react'

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


/*
Siempre se han dado situaciones de injusticia en el entorno laboral de origen muy diverso, e independientemente del ámbito profesional. Algunas de ellas están relacionadas con las condiciones salariales y horarias en las que se trabaja, otras son de carácter físico o mental. Por ejemplo, observamos algunos datos obtenidos por el \textit{Instituto Nacional de Estadística (INE)} en donde se aprecian dichas prácticas. \\

Sin embargo, hoy en día, con el auge de las tecnologías y las redes sociales, muchas de estas situaciones están saliendo a la luz y dándose a conocer. Dichas plataformas están siendo utilizadas como un medio de denuncia, comunicación y apoyo. Especialmente, por aquellos trabajadores que no tienen un claro método de denuncia y buscan una comunidad que pueda ayudarles. \\

Destacamos algunas iniciativas como el movimiento \textit{\#FightFor15} en Twitter. Fue llevado a cabo por millones de trabajadores estadounidenses que buscaban, y consiguieron en muchos estados, que se aumentase el salario mínimo a 15\$ la hora. Otro ejemplo, que tuvo lugar en España, fue el caso \textit{\#MalpasoPagaYa}, contra una editorial que no pagó a los autores de los libros que publicaba.  \\

Todo esto nos lleva a preguntarnos por la cantidad y el tipo de denuncias que se llevaban a cabo, la posible relación que puede haber entre ellas o con el contexto en el que se producen, si algunas pueden estar pasando desapercibidas frente a otras con mayor atractivo mediático, si se están publicando casos falsos (\textit{fake news}) o si las denuncias realizadas pueden estar siendo silenciadas. \\

Proponemos, por lo tanto, crear una aplicación que permita dar visibilidad y unificar en un único lugar todas las denuncias. De forma que esté diseñada para que todo el que quiera pueda acudir a consultar, compartir o visibilizar dichas situaciones.  \\

Frente a la gran cantidad de datos que se encuentran en las redes sociales, planteamos hacer uso de técnicas de análisis de lenguaje natural para obtener aquellos casos que se correspondan a denuncias laborales. Además, con el fin evitar la censura por medio de la eliminación o manipulación del contenido, proponemos gestionar los datos utilizando tecnologías distribuidas. 

*/