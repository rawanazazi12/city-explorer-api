const { request, response } = require('express');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const PORT = process.env.PORT;
// const axios = require('axios');
app.use(cors());

app.get('/', (request, response) => {response.send('Hello World, My name is Rawan')})
const getWeather = require('./controllers/Forecast.controller');
app.get('/weather',getWeather);

const getMovies =require('./controllers/Movies.controller')
app.get('/movies',getMovies);


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

// app.get('/weather', async (request, response) => {
// try{

//     const lat = request.query.lat
//     const lon = request.query.lon
//     console.log(lat,lon)
//     let url= `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
//     const weatherResponse = await axios.get(url);

//     // const weather = weatherResponse.data;
//     const forecastArray = weatherResponse.data.data.map((item) => {
//         return new Forecast(item)
//     });
//         response.json(forecastArray)
// }
//     catch(e){
//      response.status(404).send('ERROR: INVALID INPUT');

//     }

// });


// app.get('/movies', async (request, response) => {
//     try{ 
//         // const query=request.query.location;
//         console.log(query)
//         const moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
//         const moviesResponse = await axios.get(moviesUrl);    
//         const movies = moviesResponse.data.results;

//         console.log(moviesResponse);

//         let moviesArr = movies.data.map((item) => {
//             return new Movie(item)
//         });
//         response.json(moviesArr)
        
//     }
//     catch(e){
//         response.status(404).send('ERROR: INVALID INPUT');
        
//     }
    

    
// });

app.listen(PORT, () => console.log(`Server started on ${PORT} `));

