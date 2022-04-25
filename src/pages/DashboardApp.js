import React from "react";

// material
import { Grid, Container, Typography, Card, CardContent } from '@mui/material';

// components
import Page from '../components/Page';
import {
  AppTotalUsers,
  AppTotalFAV,
  AppTotalRT,
  AppTweets,
  AppTotalTweets,
  AppTopHashtags,
  AppTopUsers,
  AppTimeline,
  AppHeatmap,
  AppFilters,
  AppWordcloud,
  AppWordsTime
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------


export default function DashboardApp() {

  return (
    <Page title="Injustweet">
      <Container maxWidth="xxl" >
        <Grid item xs={12} md={12} lg={12}>
          <AppFilters />
        </Grid>
     

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6} container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card>
              <CardContent>
            <Typography variant="body2" gutterBottom>
              ¿Alguna vez te has encontrado en una situación de injusticia? ¿Quieres conocer qué problemas laborales se enfrentan en la actualidad?
              Recogemos y mostramos denuncias laborales realizadas en Twitter, quiénes las han llevado a cabo y qué reacciones han generado.
              Filtra y busca los temas que te interesen y estate al tanto de las tendencias del momento.
            </Typography>
          </CardContent>
            </Card>
          </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <AppTotalTweets />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <AppTotalUsers />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <AppTotalRT />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <AppTotalFAV />
            </Grid>
            <Grid item xs={12} md={12} container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <AppTopHashtags />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <AppTopUsers />
              </Grid>
              <Grid item xs={12} md={12} >
                <AppWordcloud />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTweets />
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            < AppWordsTime />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppHeatmap />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            < AppTimeline />
          </Grid>


        </Grid>
      </Container>
    </Page >
  );
}
