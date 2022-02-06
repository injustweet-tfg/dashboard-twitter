// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppTotalUsers,
  AppTotalFAV,
  AppTotalRT,
  AppTweets,
  AppTotalTweets,
  AppTopHashtags,
  AppTopUsers,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  AppHeader,
  AppFilters,
  AppWordcloud
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppHeader />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppFilters />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalTweets />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalRT />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalFAV />
          </Grid>

          <Grid item xs={12} md={6} lg={6} container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AppWordcloud />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopHashtags />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopUsers />
            </Grid>
          </Grid>


          <Grid item xs={12} md={6} lg={6}>
            <AppTweets />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {/* <AppNewsUpdate /> */}
            < AppWebsiteVisits />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}
