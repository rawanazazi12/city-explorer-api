const Movies = require('../models/Movies.model');

const getMovies= async (request, response) => {
    try{ 
        // const query=request.query.location;
        const moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
        const moviesResponse = await axios.get(moviesUrl);    
        const movies = moviesResponse.data.results;
        let moviesArr = movies.data.map((item) => {
            return new Movies(item)
        });
        response.json(moviesArr)
        
    }
    catch(e){
        response.status(404).send('ERROR: INVALID INPUT');
        
    }
    
};

module.exports = getMovies;
