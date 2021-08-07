const Movie = require('../models/Movies.model');
require('dotenv').config();
const axios = require('axios');
const MOVIES_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();


const getMoviesData = async (query) => {
  query = query;
  const moviesUrl = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIES_KEY}&query=${query}`;
  const moviesResponse = await axios.get(moviesUrl);
  const moviesData = moviesResponse.data.results.map(element => new Movie(element));
  cacheObject.forecast.push({
    "query": query,
    "data": moviesData
  });

  return moviesData;

};

const getMovies = async (request, response) => {
  query = request.query.query;

  // If the timestamp exceeds 1 day. we are going to reset the cache Object
  if (((Date.now() - cacheObject.timeStamp) > 86400000)) {
    // console.log('Reset Cache');
    cacheObject = new Cache();
  }
  // Check if the cache forecast property is empty
  // If the cache is not empty we are going to check if the forecast lon and lat matches our searchQuery
  if (cacheObject.movies.length) {

    const filteredMoviesData = cacheObject.movies.find((location) => {
      return location.query === query
    }); // if it doesn't find any matching data, it will return undefined

    if (filteredMoviesData) {
      // console.log("getting the data from the cache");
      response.json(filteredMoviesData.data);
    } else {
      // if no lat or lon match get the data from weather-bit
      response.json(await getMoviesData(query));
    }
  } else {

    response.json(await getMoviesData(query));
  }

}
module.exports = getMovies;
