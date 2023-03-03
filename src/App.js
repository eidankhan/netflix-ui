import { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from "./components/Movies";
import Hero from './components/Hero';
import Header from './components/Header';

const URL = "https://api.themoviedb.org/3";
const API_KEY = "bfdc3a369af34870eca754f8c55d8b5e";

const endpoints = {
  originals: "/discover/tv",
  trending: "/trending/all/week",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

function App() {

  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [movie, setMovie] = useState(originals[Math.floor(Math.random() * originals.length)]);

  

  useEffect(() => {
    // Load Originals
    axios
      .get(`${URL}${endpoints.originals}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setOriginals(res.data.results));

    // Load Trending
    axios
      .get(`${URL}${endpoints.trending}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setTrending(res.data.results));

    // Load Now Playing
    axios
      .get(`${URL}${endpoints.now_playing}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setNowPlaying(res.data.results));

    // Load Popular
    axios
      .get(`${URL}${endpoints.popular}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setPopular(res.data.results));

    // Load Top Rated
    axios
      .get(`${URL}${endpoints.top_rated}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setTopRated(res.data.results));

    // Load Upcoming
    axios
      .get(`${URL}${endpoints.upcoming}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then((res) => setUpcoming(res.data.results));


  }, []);

  // Displaying random movie after each 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMovie(originals[Math.floor(Math.random() * originals.length)]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [originals]);

  return (
    <>
      <Header />
      <Hero movie={originals && movie} />
      <Movies title='Netflix originals' movies={originals} />
      <Movies title='Netflix Trending' movies={trending} />
      <Movies title='Netflix Now Playing' movies={nowPlaying} />
      <Movies title='Netflix Popular' movies={popular} />
      <Movies title='Netflix Top Rated' movies={topRated} />
      <Movies title='Netflix Upcoming' movies={upcoming} />
    </>
  );
}

export default App;