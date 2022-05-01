import React from "react";

// material
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppHeader,
  AppTech,
  AppAbout
} from '../components/_dashboard/info';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Injustweet">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppHeader />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppAbout />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppTech />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}
