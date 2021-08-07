class Movie{
    constructor(data){
        this.title=data.title;
        this.overview=data.overview;
        this.average_votes=data.vote_average;
        this.total_votes=data.vote_count
        this.image_url='http://image.tmdb.org/t/p/w342'+data.poster_path;
        this.poularity=data.popularity
        this.released_on=data.release_date;
        
    }
}

module.exports = Movie;
