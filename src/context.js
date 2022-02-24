import { alertClasses } from "@mui/material";
import React, { useState, createContext } from "react";

export const context = createContext();

export const TweetsProvider = (props) => {
  const [tweets, setTweets] = useState([
    {
      "link": "https://twitter.com/JobsMierda/status/1491430495455952901",
      "id": 1491430495455952901,
      "text": "Están buscando a una persona que curre de lunes a domingo para cuidar a tres niños por 2,90 euros la hora... Por debajo del SMI y sin descanso semanal.",
      "user": "javi",
      "date": "09/02/22 - 15:15",
      "likes": 427,
      "retweets": 142,
      "replies": 13
    },
    {
      "link": "https://twitter.com/JobsMierda/status/1491430495455952901",
      "id": 1491430495455952901,
      "text": "Están buscando a una persona que curre de lunes a domingo para cuidar a tres niños por 2,90 euros la hora... Por debajo del SMI y sin descanso semanal.",
      "user": "angela",
      "date": "09/02/22 - 15:15",
      "likes": 427,
      "retweets": 142,
      "replies": 13
    },
    {
      "link": "https://twitter.com/JobsMierda/status/1491430495455952901",
      "id": 1491430495455952901,
      "text": "Están buscando a una persona que curre de lunes a domingo para cuidar a tres niños por 2,90 euros la hora... Por debajo del SMI y sin descanso semanal.",
      "user": "JobsMierda",
      "date": "06/02/22 - 15:15",
      "likes": 427,
      "retweets": 142,
      "replies": 13
    },
    {
      "link": "https://twitter.com/JobsMierda/status/1491430495455952901",
      "id": 1491430495455952901,
      "text": "Están buscando a una persona que curre de lunes a domingo para cuidar a tres niños por 2,90 euros la hora... Por debajo del SMI y sin descanso semanal.",
      "user": "angela",
      "date": "09/02/22 - 15:15",
      "likes": 427,
      "retweets": 142,
      "replies": 13
    },
    {
      "link": "https://twitter.com/JobsMierda/status/1489925658801328130",
      "id": 1489925658801328130,
      "text": "Actitud, motivación y creatividad cobrando 1.000 euros....",
      "user": "JobsMierda",
      "date": "05/02/22 - 11:35",
      "likes": 457,
      "retweets": 110,
      "replies": 0
    }
  ]);

  const getTotals = () => {
    const totalTweets = tweets.length;
    const dictUsers = {};
    let totalUsers = 0;
    let totalRT = 0;
    let totalFAV = 0;

    tweets.forEach(tweet => {
      if (!(tweet.user in dictUsers)) {
        totalUsers += 1;
        dictUsers[tweet.user] = true;
      }
      totalRT += tweet.retweets;
      totalFAV += tweet.likes;
    });
    return [totalTweets, totalUsers, totalRT, totalFAV];
  }

  const getTimeline = () => {
    const dict = {}
    tweets.forEach(tweet => {
      const d = (tweet.date).substring(0, (tweet.date).indexOf('-'));

      if (!(d in dict)) {
        const elem = {
          date: d,
          tweet: 1,
          fav: tweet.likes,
          rt: tweet.retweets
        }
        dict[d] = elem;
      }
      else {
        dict[d].tweet += 1;
        dict[d].fav += tweet.likes;
        dict[d].rt += tweet.retweets;
      }
    });
    const timeline = Object.values(dict);
    timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    return timeline;
  }

  const getTopUsers = () => {
    const dict = {}
    tweets.forEach(tweet => {
      if (!(tweet.user in dict)) {
        const elem = {
          user: tweet.user,
          tweets: 1
        }
        dict[tweet.user] = elem;
      }
      else {
        dict[tweet.user].tweets += 1;
      }
    });
    const array = Object.values(dict);
    array.sort((a, b) => b.tweets - a.tweets);
    const arraytop = array.slice(0, Math.min(array.length, 10));
    return arraytop;
  }

  const getTweets = () => tweets;


  return (
    <context.Provider value={[getTotals, getTimeline, getTopUsers, getTweets]}>
      {props.children}
    </context.Provider>
  );
}



/*

Observaciones
- progreso: el tema del date 
- wordcloud: datos/font
- users: personalizar/poner un poco más bonito
*/