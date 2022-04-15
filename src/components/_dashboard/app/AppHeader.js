import { Card, Box, Grid } from '@mui/material';
import React from 'react'


function AppHeader() {
    return (
        <Card>
            <Grid container spacing={2} p={4} alignItems="center">
                <Grid item xs={12} sm={6} md={6} justifyContent="center">
                    <Box
                        component="img"
                        src="/static/tfgtitlecolor.png"

                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    Dashboard para la visualización de la cantidad de denuncias relacionadas con la precariedad laboral en España (o países hispanohablantes) recogidas a través de twitter
                </Grid>

            </Grid>
        </Card >
    );
}

export default AppHeader;
