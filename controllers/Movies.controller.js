const Movies = require('../models/Movies.model');
require('dotenv').config();
const axios = require('axios');
const MOVIES_KEY=process.env.MOVIE_API_KEY;

const getMovies = async (request, response) => {
    try {
        const query = request.query.query;
        console.log(query);
        const moviesUrl =`http://api.themoviedb.org/3/search/movie?api_key=${MOVIES_KEY}&query=${query}`;
        const moviesResponse = await axios.get(moviesUrl);
        const moviesData = moviesResponse.data;
        let moviesArr = moviesData.data.results.map(item =>new Movies(item));
            response.json(moviesArr);
            // console.log(moviesData+'HOIIIIIIIIIIIIII');
            console.log(moviesResponse,'+++++++++');
            
    }
    catch (e) {
        response.status(404).send('ERROR: INVALID INPUT');

    }

};
// const getMovies= async (request, response) => {
//     let moviesUrl = `https://api.themoviedb.org/3/search/movies?api_key=${process.env.MOVIES_API_KEY}&query=${query}`
// console.log(moviesUrl);
//        await axios.get(moviesUrl).then(response => {

//           moviesData = response.data.results;

//           callMoviesArr = moviesData.map(ele => new Movies(ele));

//         //   cache1['data']=moviesData;

//           console.log('==================== come from API ITSELF====================')

//           res.json(callMoviesArr);

//         }).catch(error=>res.send({message:error.message}));

// }
module.exports = getMovies;
