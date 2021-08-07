const Forecast = require('../models/Forecast.model');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();



const getWeatherBitData = async (lat, lon) => {
  lat = lat;
  lon = lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`
  const weatherResponse = await axios.get(url);
  const data = weatherResponse.data.data.map(item => new Forecast(item));

  cacheObject.forecast.push({
    "lat": lat,
    "lon": lon,
    "data": data,
  });

  return data;
}
const getWeather = async (request, response) => {
  const { lat, lon } = request.query;

  // If the timestamp exceeds 1 day. we are going to reset the cache Object
  if (((Date.now() - cacheObject.timeStamp) > 86400000)) {
    // console.log('Reset Cache');
    cacheObject = new Cache();
  }
  // Check if the cache forecast property is empty
  // If the cache is not empty we are going to check if the forecast lon and lat matches our searchQuery
  if (cacheObject.forecast.length) {

    const filteredData = cacheObject.forecast.find((location) => {
      return location.lat === lat && location.lon === lon
    }); // if it doesn't find any matching data, it will return undefined

    if (filteredData) {
      // console.log("getting the data from the cache");
      response.json(filteredData.data);
    } else {
      // if no lat or lon match get the data from weather-bit
      response.json(await getWeatherBitData(lat, lon));
    }
  } else {

    response.json(await getWeatherBitData(lat, lon));
  }

}


module.exports = getWeather;
