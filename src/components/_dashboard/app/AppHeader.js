import { Card, CardHeader, CardContent, Avatar } from '@mui/material';
import React from 'react'


function AppHeader() {
    // const [tweets] = useContext(context);

    return (
        <Card>
            <CardHeader avatar={<Avatar sx={{ bgcolor: "blue" }} aria-label="logo">:)</Avatar>}
                title="Título" titleTypographyProps={{ variant: 'h2' }} />
            {/* {console.log(tweets)} */}
            <CardContent> Dashboard para la visualización de la cantidad de denuncias relacionadas con la precariedad laboral en España (o países hispanohablantes) recogidas a través de twitter</CardContent>
        </Card >
    );
}

export default AppHeader;
