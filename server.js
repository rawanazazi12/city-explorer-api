const { request, response } = require('express');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const PORT = process.env.PORT;
const axios = require('axios');
app.use(cors())

const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
    response.send('Hello World, My name is Rawan')
});


app.get('/weather', async (request, response) => {

    const lat = request.query.lat
    const lon = request.query.lon
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`);

    const weather = weatherResponse.data;
    let forecastArray = weather.data.map((item) => {
        return new ForeCast(item)
    });
        response.json(forecastArray)
    }).catch = () => response.send('ERROR: INVALID INPUT');

// app.get('',(request,response)=>{

//     response.send('PAGE NOT FOUND')
// });

class ForeCast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description
    }

}
app.listen(PORT, () => {
    console.log(`Server started on ${PORT} `);
});
