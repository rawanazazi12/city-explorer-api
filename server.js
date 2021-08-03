const { request, response } = require('express');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const PORT = process.env.PORT;
// const axios = require('axios');
app.use(cors());


const weatherData = require('./data/weather.json');

class Forecast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description
    }

}

app.get('/', (request, response) => {
    response.send('Hello World, My name is Rawan')
});



// app.get('/weather', (request, response) => {

//     try {
//         const searchQuery = request.query;
//         const lat = request.query;
//         const lon = request.query;
//         locationData = weatherData.find(element => {
//             element.city_name.toLocaleUpperCase === searchQuery.toLocaleUpperCase ||
//                 parseInt(element.lat) === lat || parseInt(element.lon) === parseInt(lon)

//         });

//         let forecastArray = locationData.data.map((item) => {
//             return new Forecast(item)
//         });
//         response.send(forecastArray);

//     }

// catch (error) {
//     response.send('ERORR: INVALID INPUT');

// }

// });


app.get('/weather', async (request, response) => {
try{

    const lat = request.query.lat
    const lon = request.query.lon
    const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/history/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`);

    const weather = weatherResponse.data;
    let forecastArray = weather.data.map((item) => {
        return new Forecast(item)
    });
        response.json(forecastArray)

}
    catch(e){
     response.status(404).send('ERROR: INVALID INPUT');

    }

});

class Movie{
    constructor(moviesData){
        this.title=moviesData.original_title;
        this.votes=moviesData.vote_count
        this.img='http://image.tmdb.org/t/p/w342'+moviesData.poster_path;
        this.overview=overview;
        this.released_on=released_on
        
    }
}

app.get('/movies', async (request, response) => {
    try{ 
        const moviesResponse = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
    
        const movies = moviesResponse.data;
        let moviesArr = movies.data.map((item) => {
            return new Movie(item)
        });
            response.json(moviesArr)
    
    }
        catch(e){
         response.status(404).send('ERROR: INVALID INPUT');
    
        }
    
    });

app.listen(PORT, () => console.log(`Server started on ${PORT} `));

