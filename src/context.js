import React, { useState, createContext, useContext, useEffect } from "react";
import examples from "./tweets.json";
import { fDate, timetoline } from "./utils/formatTime";

export const context = createContext();
export const useTweets = () => useContext(context);

export const TweetsProvider = (props) => {
  const [tweets, setTweets] = useState([]);
  const [totals, setTotals] = useState({ totalTweets: 0, totalUsers: 0, totalFAV: 0, totalRT: 0 });
  const [topUsers, setTopUsers] = useState([]);
  const [topHashtags, setTopHashtags] = useState([]);
  const [dataWordcloud, setDataWordcloud] = useState([]);
  const [dataTimeline, setDataTimeline] = useState([]);
  const [dataHeatmap, setDataHeatmap] = useState([]);
  const [tweetView, setTweetView] = useState([]);
  const [dateStart,setDateStart] = useState('0')
  const [dateEnd,setDateEnd] = useState(Date.now().toString())

  useEffect(() => {
    // fetch all data when the number of tweets changes
    console.log("context:useEffect")

    async function getCache() {
      // const user = 'JobsMierda'
      // const dEnd = '1644420650000'
      // const dStart = '1633587778000'

      // const response = await fetch(`http://localhost:5000/api/tweets/?user=${user}`);
      const response = await fetch(`http://localhost:5000/api/tweets/?dateStart=${dateStart}&dateEnd=${dateEnd}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const twDb = await response.json();
      setTweets(twDb);
    }

    
    getCache();

    setTotals(getTotals());
    setTopUsers(getTopUsers());
    setTopHashtags(getTopHashtags());
    setDataWordcloud(getDataWordcloud());
    setDataTimeline(getDataTimeline());
    setDataHeatmap(getDataHeatmap());
    setTweetView(getTweetView(0));
  }, [tweets.length,dateStart,dateEnd]);


  const filterTime = (start = '0', end = Date.now().toString()) => {
    setDateStart(start)
    setDateEnd(end)
    // setTweets(tweets.slice(0, -55));
    // console.log("Array tras prueba")
    // console.log(tweets.length)
  }

  const getTotals = () => {
    const totalTweets = tweets.length;
    const dictUsers = {};
    let totalUsers = 0;
    let totalFAV = 0;
    let totalRT = 0;
    tweets.forEach(tweet => {
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
  }

  const getDataWordcloud = () => {
    const stopWordsSet = new Set(['vuelva', 'realizar', 'vimos', 'semana', 'pasada', 'luego', 'dices', 'k', 'poner', 'hablamos', 'favor', 'sale', 'digo', 'miro', 'tarde', 'saludo', 'dejan', 'dado', 'quería', 'necesitaría', 'decir', 'día', 'hacerlo', 'hace', 'muchas', 'pedimos', 'ido', 'genial', 'preguntar', 'quedo', 'pasa', 'días', 'tardes', 'buenas', 'necesito', 'buenos', 'hola', 'gracias', 'quieres', 'quiero', 'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'estuviera', 'estuvieras', 'estuviéramos', 'estuvierais', 'estuvieran', 'estuviese', 'estuvieses', 'estuviésemos', 'estuvieseis', 'estuviesen', 'estando', 'estado', 'estada', 'estados', 'estadas', 'estad', 'he', 'has', 'ha', 'hemos', 'habéis', 'han', 'haya', 'hayas', 'hayamos', 'hayáis', 'hayan', 'habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán', 'habría', 'habrías', 'habríamos', 'habríais', 'habrían', 'había', 'habías', 'habíamos', 'habíais', 'habían', 'hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron', 'hubiera', 'hubieras', 'hubiéramos', 'hubierais', 'hubieran', 'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen', 'habiendo', 'habido', 'habida', 'habidos', 'habidas', 'soy', 'eres', 'es', 'somos', 'sois', 'son', 'sea', 'seas', 'seamos', 'seáis', 'sean', 'seré', 'serás', 'será', 'seremos', 'seréis', 'serán', 'sería', 'serías', 'seríamos', 'seríais', 'serían', 'era', 'eras', 'éramos', 'erais', 'eran', 'fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron', 'fuera', 'fueras', 'fuéramos', 'fuerais', 'fueran', 'fuese', 'fueses', 'fuésemos', 'fueseis', 'fuesen', 'siendo', 'sido', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen', 'tenga', 'tengas', 'tengamos', 'tengáis', 'tengan', 'tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán', 'tendría', 'tendrías', 'tendríamos', 'tendríais', 'tendrían', 'tenía', 'tenías', 'teníamos', 'teníais', 'tenían', 'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron', 'tuviera', 'tuvieras', 'tuviéramos', 'tuvierais', 'tuvieran', 'tuviese', 'tuvieses', 'tuviésemos', 'tuvieseis', 'tuviesen', 'teniendo', 'tenido', 'tenida', 'tenidos', 'tenidas', 'tened', 'ahí', 'ajena', 'ajeno', 'ajenas', 'ajenos', 'algúna', 'allá', 'ambos', 'aquello', 'aquellas', 'aquellos', 'así', 'atrás', 'aun', 'aunque', 'bajo', 'bastante', 'bien', 'cabe', 'cada', 'casi', 'cierto', 'cierta', 'ciertos', 'ciertas', 'conmigo', 'conseguimos', 'conseguir', 'consigo', 'consigue', 'consiguen', 'consigues', 'cualquier', 'cualquiera', 'cualquieras', 'cuan', 'cuanto', 'cuanta', 'cuantas', 'cuantos', 'de', 'dejar', 'demás', 'demasiadas', 'demasiados', 'dentro', 'dos', 'ello', 'emplean', 'emplear', 'empleas', 'encima', 'entonces', 'era', 'eras', 'eramos', 'eses', 'estes', 'gueno', 'hacer', 'hacemos', 'hacia', 'hago', 'incluso', 'intenta', 'intentas', 'intentamos', 'intentan', 'intento', 'ir', 'mismo', 'ningúno', 'nunca', 'parecer', 'podemos', 'podría', 'podrías', 'podríais', 'podríamos', 'podrían', 'primero', 'puedes', 'pueden', 'pues', 'querer', 'quiénes', 'quienesquiera', 'quienquiera', 'quizás', 'sabe', 'sabes', 'saben', 'sabéis', 'sabemos', 'saber', 'sino', 'solo', 'esta', 'tampoco', 'tan', 'tanta', 'tantas', 'tantos', 'tener', 'tiempo', 'toda', 'todas', 'tomar', 'trabaja', 'trabajas', 'tras', 'último', 'ultimo', 'última', 'ultima', 'unas', 'ustedes', 'variasos', 'verdadera', 'pocas', 'pocos', 'podéis', 'podemos', 'poder', 'podría', 'podrías', 'podríais', 'podríamos', 'podrían', 'primero', 'puede', 'puedo', 'pueda', 'pues', 'querer', 'quiénes', 'quienesquiera', 'quienquiera', 'quizás', 'mas', 'sabe', 'sabes', 'saben', 'sabéis', 'sabemos', 'saber', 'según', 'ser', 'si', 'siempre', 'sino', 'so', 'solamente', 'solo', 'sólo', 'sr', 'sra', 'sres', 'sta', 'tal', 'tales', 'tampoco', 'tan', 'tanta', 'tantas', 'tantos', 'tener', 'tiempo', 'toda', 'den', 'queria', 'todas', 'tomar', 'trabaja', 'trabajo', 'trabajáis', 'trabajamos', 'trabajan', 'trabajar', 'trabajas', 'tras', 'último', 'ultimo', 'unas', 'usa', 'usas', 'usáis', 'usamos', 'usan', 'usar', 'uso', 'usted', 'ustedes', 'va', 'van', 'vais', 'valor', 'vamos', 'varias', 'varias', 'varios', 'vaya', 'verdadera', 'voy', 'vez', 'más', 'ok']);
    const dict = {}

    tweets.forEach(tweet => {
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
            }
            dict[word] = elem;
          }
          else {
            dict[word].value += 1;
          }
        }
      });

    });

    const data = Object.values(dict);
    return data
  }

  const getDataTimeline = () => {
    const dict = {}
    tweets.forEach(tweet => {
      // const d = (tweet.date).substring(0, (tweet.date).indexOf('-'));
      const fullDate = new Date(tweet.date);
      const daux = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, fullDate.getDate());
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

  const getTweetView = (option) => {
    const NUMBER_OF_TWEETS = 10;
    switch (option) {
      // Newest
      case 0:
        return [...tweets].sort((a, b) => b.date - a.date).slice(0, NUMBER_OF_TWEETS);
      // Oldest
      case 1:
        return [...tweets].sort((a, b) => a.date - b.date).slice(0, NUMBER_OF_TWEETS);
      // Most Retweeted
      case 2:
        return [...tweets].sort((a, b) => b.retweets - a.retweets).slice(0, NUMBER_OF_TWEETS);
      // Most Favorited
      case 3:
        return [...tweets].sort((a, b) => b.likes - a.likes).slice(0, NUMBER_OF_TWEETS);
      default:
        return [...tweets].slice(0, NUMBER_OF_TWEETS);
    }
  };


  const getDataHeatmap = () => {
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

  const getTopHashtags = () => {
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
    return items.slice(0, Math.min(items.length, NUMBER_OF_HASHTAGS));
  };


  return (
    <context.Provider value={{ filterTime, totals, topUsers, topHashtags, dataWordcloud, dataTimeline, dataHeatmap, tweetView, getTweetView, setTweetView }}>
      {/* <context.Provider value={[getTotals, getTimeline, getTopUsers, getTweets, getTweetsByDay, getHashtags, prueba, getDataWordcloud]}> */}
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