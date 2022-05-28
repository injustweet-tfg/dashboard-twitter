import PropTypes from 'prop-types';
import React, { useState, createContext, useContext } from "react";
import useFetch from './useFetch';
import { timetoline } from "./utils/formatTime";

// ----------------------------------------------------------------------

export const context = createContext();
export const useTweets = () => useContext(context);

export const TweetsProvider = (props) => {
  const [dateStart, setDateStart] = useState('0');
  const [dateEnd, setDateEnd] = useState((new Date().setHours(0, 0, 0, 0) / 1000).toString());
  const { loading, data, } = useFetch(`https://cache-twitter.herokuapp.com/?dateStart=${dateStart}&dateEnd=${dateEnd}`);
  // ----------------------------------------------------------------------
  // Functions used by the dashboard components (they use/change the states of the context)


  const filterTime = (start = '0', end = new Date().setHours(0, 0, 0, 0).toString()) => {
    setDateStart(start / 1000);
    setDateEnd(end / 1000);
  };

  // To obtain the data shown in the total components
  // Output: total number of tweets, users, likes and retweets
  const getTotals = () => {
    const totalTweets = data.length;
    const dictUsers = {};
    let totalUsers = 0;
    let totalFAV = 0;
    let totalRT = 0;
    data.forEach(tweet => {
      if (!(tweet.user in dictUsers)) {
        totalUsers += 1;
        dictUsers[tweet.user] = true;
      }
      totalRT += tweet.retweets;
      totalFAV += tweet.likes;
    });
    return {
      totalTweets,
      totalUsers,
      totalFAV,
      totalRT,
    };
  };


  // To obtain the data shown in the wordcloud
  // Output: words processed and number of appearences
  const getDataWordcloud = () => {
    const stopWordsSet = new Set(['vuelva', 'realizar', 'vimos', 'semana', 'pasada', 'luego', 'dices', 'k', 'q', 'poner', 'hablamos', 'favor', 'sale', 'digo', 'miro', 'tarde', 'saludo', 'dejan', 'dado', 'quería', 'necesitaría', 'decir', 'día', 'hacerlo', 'hace', 'muchas', 'pedimos', 'ido', 'genial', 'preguntar', 'quedo', 'pasa', 'días', 'tardes', 'buenas', 'necesito', 'buenos', 'hola', 'gracias', 'quieres', 'quiero', 'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'estuviera', 'estuvieras', 'estuviéramos', 'estuvierais', 'estuvieran', 'estuviese', 'estuvieses', 'estuviésemos', 'estuvieseis', 'estuviesen', 'estando', 'estado', 'estada', 'estados', 'estadas', 'estad', 'he', 'has', 'ha', 'hemos', 'habéis', 'han', 'haya', 'hayas', 'hayamos', 'hayáis', 'hayan', 'habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán', 'habría', 'habrías', 'habríamos', 'habríais', 'habrían', 'había', 'habías', 'habíamos', 'habíais', 'habían', 'hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron', 'hubiera', 'hubieras', 'hubiéramos', 'hubierais', 'hubieran', 'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen', 'habiendo', 'habido', 'habida', 'habidos', 'habidas', 'soy', 'eres', 'es', 'somos', 'sois', 'son', 'sea', 'seas', 'seamos', 'seáis', 'sean', 'seré', 'serás', 'será', 'seremos', 'seréis', 'serán', 'sería', 'serías', 'seríamos', 'seríais', 'serían', 'era', 'eras', 'éramos', 'erais', 'eran', 'fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron', 'fuera', 'fueras', 'fuéramos', 'fuerais', 'fueran', 'fuese', 'fueses', 'fuésemos', 'fueseis', 'fuesen', 'siendo', 'sido', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen', 'tenga', 'tengas', 'tengamos', 'tengáis', 'tengan', 'tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán', 'tendría', 'tendrías', 'tendríamos', 'tendríais', 'tendrían', 'tenía', 'tenías', 'teníamos', 'teníais', 'tenían', 'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron', 'tuviera', 'tuvieras', 'tuviéramos', 'tuvierais', 'tuvieran', 'tuviese', 'tuvieses', 'tuviésemos', 'tuvieseis', 'tuviesen', 'teniendo', 'tenido', 'tenida', 'tenidos', 'tenidas', 'tened', 'ahí', 'ajena', 'ajeno', 'ajenas', 'ajenos', 'algúna', 'allá', 'ambos', 'aquello', 'aquellas', 'aquellos', 'así', 'atrás', 'aun', 'aunque', 'bajo', 'bastante', 'bien', 'cabe', 'cada', 'casi', 'cierto', 'cierta', 'ciertos', 'ciertas', 'conmigo', 'conseguimos', 'conseguir', 'consigo', 'consigue', 'consiguen', 'consigues', 'cualquier', 'cualquiera', 'cualquieras', 'cuan', 'cuanto', 'cuanta', 'cuantas', 'cuantos', 'de', 'dejar', 'demás', 'demasiadas', 'demasiados', 'dentro', 'dos', 'ello', 'emplean', 'emplear', 'empleas', 'encima', 'entonces', 'era', 'eras', 'eramos', 'eses', 'estes', 'gueno', 'hacer', 'hacemos', 'hacia', 'hago', 'incluso', 'intenta', 'intentas', 'intentamos', 'intentan', 'intento', 'ir', 'mismo', 'ningúno', 'nunca', 'parecer', 'podemos', 'podría', 'podrías', 'podríais', 'podríamos', 'podrían', 'primero', 'puedes', 'pueden', 'pues', 'querer', 'quiénes', 'quienesquiera', 'quienquiera', 'quizás', 'sabe', 'sabes', 'saben', 'sabéis', 'sabemos', 'saber', 'sino', 'solo', 'esta', 'tampoco', 'tan', 'tanta', 'tantas', 'tantos', 'tener', 'tiempo', 'toda', 'todas', 'tomar', 'trabaja', 'trabajas', 'tras', 'último', 'ultimo', 'última', 'ultima', 'unas', 'ustedes', 'variasos', 'verdadera', 'pocas', 'pocos', 'podéis', 'podemos', 'poder', 'podría', 'podrías', 'podríais', 'podríamos', 'podrían', 'primero', 'puede', 'puedo', 'pueda', 'pues', 'querer', 'quiénes', 'quienesquiera', 'quienquiera', 'quizás', 'mas', 'sabe', 'sabes', 'saben', 'sabéis', 'sabemos', 'saber', 'según', 'ser', 'si', 'siempre', 'sino', 'so', 'solamente', 'solo', 'sólo', 'sr', 'sra', 'sres', 'sta', 'tal', 'tales', 'tampoco', 'tan', 'tanta', 'tantas', 'tantos', 'tener', 'tiempo', 'toda', 'den', 'queria', 'todas', 'tomar', 'trabaja', 'trabajo', 'trabajáis', 'trabajamos', 'trabajan', 'trabajar', 'trabajas', 'tras', 'último', 'ultimo', 'unas', 'usa', 'usas', 'usáis', 'usamos', 'usan', 'usar', 'uso', 'usted', 'ustedes', 'va', 'van', 'vais', 'valor', 'vamos', 'varias', 'varias', 'varios', 'vaya', 'verdadera', 'voy', 'vez', 'más', 'ok']);
    const dict = {};
    data.forEach(tweet => {
      const words = tweet.text
        .split(' ')
        .map((word) => word.toLowerCase().replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1]/g, ' ').trim())
        .filter((word) => !word.startsWith("#"));

      words.forEach(word => {
        if (!stopWordsSet.has(word) && Number.isNaN(Number(word))) {
          if (!(word in dict)) {
            const elem = {
              text: word,
              value: 1
            };
            dict[word] = elem;
          }
          else {
            dict[word].value += 1;
          }
        }
      });

    });
    const tw = Object.values(dict);
    return tw;
  };

  // To obtain the data shown in the timeline of most used words
  // Output: three most used words sorted by date, and the number of appearences from each day
  const getDataWordsTime = () => {
    const tw = getDataWordcloud();

    const maxs = [{ text: '', value: 0 }, { text: '', value: 0 }, { text: '', value: 0 }]
    tw.forEach(elem => {
      if (elem.value > maxs[2].value) {
        maxs[2].text = elem.text;
        maxs[2].value = elem.value;
        maxs.sort((a, b) => b.value - a.value); // from biggest to smallest
      }
    });

    const dict = [{}, {}, {}];

    data.forEach(tweet => {
      const fullDate = new Date(tweet.date * 1000);
      const daux = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());

      const index = [0, 1, 2];
      index.forEach(i => {
        const regex = new RegExp(maxs[i].text, 'g');
        const num = (tweet.text.match(regex) || []).length;

        if (num !== 0) {
          if (!(daux in dict[i])) {
            const elem = {
              date: daux,
              count: num
            };
            dict[i][daux] = elem;
          }
          else {
            dict[i][daux].count += num;
          }
        }
        else if (!(daux in dict[i])) {
          const elem = {
            date: daux,
            count: 0
          };
          dict[i][daux] = elem;
        }
      })
    });

    const maxs0 = Object.values(dict[0]);
    maxs0.sort((a, b) => a.date.getTime() - b.date.getTime());
    maxs0.map(elem => elem.date = timetoline(elem.date));
    const maxs1 = Object.values(dict[1]);
    maxs1.sort((a, b) => a.date.getTime() - b.date.getTime());
    maxs1.map(elem => elem.date = timetoline(elem.date));
    const maxs2 = Object.values(dict[2]);
    maxs2.sort((a, b) => a.date.getTime() - b.date.getTime());
    maxs2.map(elem => elem.date = timetoline(elem.date));

    const sol0 = maxs[0].text;
    const sol1 = maxs[1].text;
    const sol2 = maxs[2].text;

    // date-count for each word, and the three words
    return { maxs0, maxs1, maxs2, sol0, sol1, sol2 };
  };


  // To obtain the data shown in the timeline of likes, tweets and retweets
  // Output: tweets, likes and retweets sorted by date
  const getDataTimeline = () => {
    const dict = {};
    data.forEach(tweet => {
      const fullDate = new Date(tweet.date * 1000);
      const daux = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());

      if (!(daux in dict)) {
        const elem = {
          date: daux,
          tweet: 1,
          fav: tweet.likes,
          rt: tweet.retweets
        };
        dict[daux] = elem;
      }
      else {
        dict[daux].tweet += 1;
        dict[daux].fav += tweet.likes;
        dict[daux].rt += tweet.retweets;
      }
    });
    const timeline = Object.values(dict);
    timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
    timeline.map(elem => elem.date = timetoline(elem.date));
    return timeline;
  };

  // To obtain the data shown in the heatmap
  // Output: Quantity of tweets given a day and month
  const getDataHeatmap = () => {
    const week = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dict = {};
    data.forEach(tweet => {
      const day = new Date(tweet.date * 1000).getDay();
      const month = new Date(tweet.date * 1000).getMonth();
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

  // To obtain the data shown in the rankings
  // Output: top 5 users and top 5 hashtags
  const getTopUsers = () => {
    const dict = {}
    data.forEach(tweet => {
      if (!(tweet.user in dict)) {
        const elem = {
          user: tweet.user,
          tweets: 1
        };
        dict[tweet.user] = elem;
      }
      else {
        dict[tweet.user].tweets += 1;
      }
    });
    const array = Object.values(dict);
    array.sort((a, b) => b.tweets - a.tweets);
    const arraytop = array.slice(0, Math.min(array.length, 5));
    console.log("top users:", arraytop);
    return arraytop;
  };

  const getTopHashtags = () => {
    const NUMBER_OF_HASHTAGS = 5;
    const dict = {};
    data.forEach(tweet => {
      tweet.hashtags.forEach(hashtag => {
        if (!(hashtag in dict)) {
          const elem = {
            hashtag,
            tweets: 1
          };
          dict[hashtag] = elem;
        }
        else {
          dict[hashtag].tweets += 1;
        }
      });
    });
    const array = Object.values(dict);
    array.sort((a, b) => b.tweets - a.tweets);
    const arraytop = array.slice(0, Math.min(array.length, NUMBER_OF_HASHTAGS));
    console.log("top hashtags:", arraytop);
    return arraytop;
  };


  return (
    <context.Provider value={{ loading, filterTime, getTotals, getTopUsers, getTopHashtags, getDataWordcloud, getDataTimeline, getDataHeatmap, getDataWordsTime, dateStart, dateEnd }}>
      {props.children}
    </context.Provider>
  );
}

TweetsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

