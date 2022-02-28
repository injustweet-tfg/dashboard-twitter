import React, { useState, createContext } from "react";
import examples from "./tweets.json";
import {fDate, timetoline} from "./utils/formatTime";

export const context = createContext();

export const TweetsProvider = (props) => {
  const [tweets, setTweets] = useState(examples.examples);

  const prueba = () => {
    setTweets(examples.examples.splice(0,15));
    console.log(tweets);
  }

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
      // const d = (tweet.date).substring(0, (tweet.date).indexOf('-'));

      const fullDate = new Date(tweet.date);
      const daux = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1,fullDate.getDate());
      const d = timetoline(daux)
      
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
    timeline.sort((a, b) => a - b);
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
  };

  const getTweets = (option) => {
    const NUMBER_OF_TWEETS = 10;
    switch (option) {
      // Newest
      case 0:
        return tweets.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, NUMBER_OF_TWEETS);
      // Oldest
      case 1:
        return tweets.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, NUMBER_OF_TWEETS);
      // Most Retweeted
      case 2:
        return tweets.sort((a, b) => b.retweets - a.retweets).slice(0, NUMBER_OF_TWEETS);
      // Most Favorited
      case 3:
        return tweets.sort((a, b) => b.likes - a.likes).slice(0, NUMBER_OF_TWEETS);
      default:
        return tweets.slice(0, NUMBER_OF_TWEETS);
    }
  };

  const getTweetsByDay = () => {
    const week = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dict = {};
    tweets.forEach(tweet => {
      const day = new Date(tweet.date).getDay();
      const month = new Date(tweet.date).getMonth();
      if (!(day in dict)) {
        dict[day] = {};
        dict[day][month] = 1;
      }
      else if (!(month in dict[day])) {
        dict[day][month] = 1;
      }
      else {
        dict[day][month] += 1;
      }
    });
    const chartData = [];
    week.forEach((day, index1) => {
      const data = [];
      monthsOfYear.forEach((month, index2) => {
        data.push({
          x: month,
          y: (dict[index1] && dict[index1][index2]) ? dict[index1][index2] : 0
        });
      });
      chartData.push({
        name: day,
        data
      });
    });
    return chartData;
  };

  const getHashtags = () => {
    const NUMBER_OF_HASHTAGS = 10;
    const dict = {};
    tweets.forEach(tweet => {
      tweet.hashtags.forEach(hashtag => {
        if (!(hashtag in dict)) {
          dict[hashtag] = 1;
        }
        else {
          dict[hashtag] += 1;
        }
      });
    });
    const items = Object.keys(dict).map(key => ([key, dict[key]]));
    items.sort((first, second) => second[1] - first[1]);
    return items.slice(0,  Math.min(items.length, NUMBER_OF_HASHTAGS));
  };


  return (
    <context.Provider value={[getTotals, getTimeline, getTopUsers, getTweets, getTweetsByDay, getHashtags, prueba]}>
      {props.children}
    </context.Provider>
  );
}



/*

- wordcloud: limpiar tweets, palabras más frecuentes
- users: personalizar/poner un poco más bonito 
- progreso: fechas
- apptweets: link to tweet + icono twitter 

- estilos
- filtro general
*/