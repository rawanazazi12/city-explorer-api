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


app.listen(PORT, () => console.log(`Server started on ${PORT} `));

