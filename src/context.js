import React, { useState, createContext } from "react";

export const context = createContext();

export const TweetsProvider = (props) => {
  const [tweets, setTweets] = useState([
    {
      "link": "https://twitter.com/JobsMierda/status/1491430495455952901",
      "id": 1491430495455952901,
      "text": "Están buscando a una persona que curre de lunes a domingo para cuidar a tres niños por 2,90 euros la hora... Por debajo del SMI y sin descanso semanal.",
      "user": "JobsMierda",
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

  return (
    <context.Provider value={[getTotals]}>
      {props.children}
    </context.Provider>
  );
}



