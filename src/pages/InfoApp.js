import React from "react";

// material
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppHeader,
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Precariedapp">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppHeader />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}
