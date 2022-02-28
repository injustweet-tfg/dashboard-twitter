import React, { useContext } from "react";

// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { TweetsProvider, context } from '../context';
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
  AppHeader,
  AppFilters,
  AppWordcloud
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [getTotals, getTimeline, getTopUsers, , getTweetsByDay, getHashtags] = useContext(context);
  const [totalTweets, totalUsers, totalRT, totalFAV] = getTotals();
  const dataTimeline = getTimeline();
  const topUsers = getTopUsers();
  const dataHeatmap = getTweetsByDay();
  const topHashtags = getHashtags();



  return (
    <Page title="Precariedapp">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppHeader />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppFilters />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalTweets totalTweets={totalTweets} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalUsers totalUsers={totalUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalRT totalRT={totalRT} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalFAV totalFAV={totalFAV} />
          </Grid>

          <Grid item xs={12} md={6} lg={6} container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AppWordcloud />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopHashtags topHashtags={topHashtags} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopUsers topUsers={topUsers} />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTweets />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppHeatmap dataHeatmap={dataHeatmap} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            < AppTimeline dataTimeline={dataTimeline} />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}
