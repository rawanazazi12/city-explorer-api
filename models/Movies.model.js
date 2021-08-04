class Movie{
    constructor(data){
        this.title=data.results.title;
        this.overview=data.results.overview;
        this.average_votes=data.results.vote_average;
        this.total_votes=data.vote_count
        this.image_url='http://image.tmdb.org/t/p/w342'+results.poster_path;
        this.poularity=data.results.popularity
        this.released_on=data.results.release_date;
        
    }
}

module.exports = Movie;
