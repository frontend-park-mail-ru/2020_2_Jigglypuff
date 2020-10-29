import MovieModel from '../models/MovieModel';
import Extractor from '../utils/Extractor';

/** Class that contains Movie ViewModel*/
export default class MovieViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        this.state = {
            ageLimit: '',
            country: '',
            cover: '',
            description: '',
            director: '',
            duration: '',
            genre: '',
            name: '',
            ratingGlobal: '',
            ratingUser: '',
            reviews: '',
            starring: '',
            year: '',
        };
        this.getMovieCommand = {exec: () => this.getMovie()};
        this.rateMovieCommand = {exec: () => this.rateMovie()};
    }

    /**
     * Get movie info.
     * @return {Promise<void>}
     */
    async getMovie() {
        const movieModel = new MovieModel();
        await movieModel.getMovie();

        const extractedMovieDataMap = Extractor.extractMovieData(movieModel);
        for (const field of extractedMovieDataMap) {
            this.state[field.keys()] = field.values();
        }
    }

    /**
     * Rate movie.
     * @return {Promise<number>}
     */
    async rateMovie() {
        const movieModel = new MovieModel();
        const response = await movieModel.rate();

        return response.json().statusCode;
    }
}
