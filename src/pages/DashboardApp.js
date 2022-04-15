import React from "react";

// material
import { Grid, Container } from '@mui/material';
import { useTweets } from '../context';
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
  AppWordcloud
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------


export default function DashboardApp() {
  const { totals, topUsers, topHashtags, dataWordcloud, dataHeatmap, dataTimeline, tweetView, getTweetView, setTweetView } = useTweets();

  return (
    <Page title="Injustweet">
      <Container maxWidth="xl" >
        <Grid item xs={12} md={12} lg={12}>
          <AppFilters />
        </Grid>

        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={12} lg={12}>
            <AppHeader />
          </Grid> */}
          <Grid item xs={6} sm={6} md={3}>
            <AppTotalTweets totalTweets={totals.totalTweets} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AppTotalUsers totalUsers={totals.totalUsers} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AppTotalRT totalRT={totals.totalRT} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AppTotalFAV totalFAV={totals.totalFAV} />
          </Grid>

          <Grid item xs={12} md={6} lg={6} container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AppWordcloud dataWordcloud={dataWordcloud} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopHashtags topHashtags={topHashtags} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppTopUsers topUsers={topUsers} />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTweets tweetView={tweetView} getTweetView={getTweetView} setTweetView={setTweetView} />
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
