const Forecast = require('../models/Forecast.model');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
// const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const axios = require('axios');


const getWeather = async (request, response) => {
    try {

        const lat=request.query.lat;
        const lon=request.query.lon;

        const url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`
        const weatherResponse = await axios.get(url);
        const data = weatherResponse.data.data.map(item => new Forecast(item));
        // console.log(data);
        response.status(200).send(data);
        // response.send('HELLO FROM WEATHER');
        
    }
    
    catch (e) {
        response.status(404).send('ERROR: INVALID INPUT');       
    }
    
}
module.exports = getWeather;
